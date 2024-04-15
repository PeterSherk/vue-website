import axios from 'axios';
import url from 'url';
import { WebSocketServer } from 'ws';
import redis from '../db/redis';
import { logger } from '../../configs/logger';
import { delay } from '../utils';

const musicWebSocket = new WebSocketServer({ noServer: true });
let previousPlayState;

musicWebSocket.on('connection', async function connection(ws) {
  let keepPollingSpotify = true;
  ws.on('error', (error) => {
    logger.log({
      level: 'error',
      message: `Error with websocket: ${error}`
    })
  });

  ws.on('pong', (data) => {
    keepPollingSpotify = true;
  });

  ws.on('close', () => {
    console.log('close')
    keepPollingSpotify = false;
  })

  while(keepPollingSpotify) {
    await sendPlayStatus(ws);
    await delay(5000);
    ws.ping();
  }
});

async function sendPlayStatus(websocket) {
  let response = await currentlyPlaying();
  if (previousPlayState?.data?.is_playing && (response.status === 204 || !response.data?.is_playing)) {
    previousPlayState = response;
    websocket.send(JSON.stringify({isPlaying: false}))
  } else if (response.status === 200 && response.data?.is_playing) {
    previousPlayState = response;
    websocket.send(JSON.stringify(buildCurrentlyPlaying(response.data)));
  }
}

function buildCurrentlyPlaying(currentlyPlaying) {
  let item = {
    description: currentlyPlaying.item.description,
    name: currentlyPlaying.item.name,
    progress: currentlyPlaying.progress_ms,
    duration: currentlyPlaying.item.duration_ms,
    externalUrl: currentlyPlaying.item.external_urls.spotify,
    isPlaying: currentlyPlaying.is_playing,
    images: currentlyPlaying.item.images
  };

  if (currentlyPlaying.currently_playing_type === 'track') {
    item.creator = currentlyPlaying.item.artists.map(artist => artist.name).join();
  } else {
    item.creator = currentlyPlaying.item.show.publisher;
  }

  return item;
}

export async function currentlyPlaying() {
  let currentlyPlaying = {};
  let access_token;
  let options;
  try {
    access_token = await getToken();
    options = {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    };
    let resp = await axios.get('https://api.spotify.com/v1/me/player/currently-playing?additional_types=track,episode', options);
    currentlyPlaying.data = resp.data;
    currentlyPlaying.status = resp.status;
  } catch(error) {
    if (error?.response?.status === 401) {
      access_token = await getNewAccessToken();
      await redis.connect();
      await redis.set('access_token', access_token);
      await redis.disconnect();
      options = {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      };
    }
    let resp = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', options);
    currentlyPlaying.data = resp.data;
    currentlyPlaying.status = resp.status;
  }
  return currentlyPlaying;
}

async function getToken() {
  let token;
  await redis.connect();
  token = await redis.get('access_token');
  if (!token) {
    token = await getNewAccessToken()
    await redis.set('access_token', token);
  }
  await redis.disconnect();
  return token;
}

async function getNewAccessToken() {
  logger.log({
    level: 'info',
    message: 'Refreshing access token'
  });
  const newTokenRequestOptions = {
    url: 'https://accounts.spotify.com/api/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    auth: {
      username: process.env.SPOTIFY_CLIENT_ID,
      password: process.env.SPOTIFY_CLIENT_SECRET
    },
    data: new url.URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN
    })
  }
  try {
    let response = await axios.request(newTokenRequestOptions);
    return response.data.access_token;
  } catch (error) {
    console.log(error.request._header)
    console.log(error.response.status)
    console.log(error.response.data)
  }
}

export {
  musicWebSocket
};