import axios from 'axios';
import url from 'url';
import redis from '../db/redis';

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
    let resp = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', options);
    currentlyPlaying.data = resp.data;
    currentlyPlaying.status = resp.status;
  } catch(error) {
    if (error.response.status === 401) {
      access_token = await getAccessToken();
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
