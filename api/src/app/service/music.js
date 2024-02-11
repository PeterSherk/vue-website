import axios from 'axios';
import url from 'url';

export async function currentlyPlaying() {
  const options = {
    headers: {
      'Authorization': `Bearer ${process.env.SPOTIFY_REFRESH_TOKEN}`
    }
  }
  let currentlyPlaying = {};
  try {
    let resp = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', options);
    currentlyPlaying.data = resp.data;
    currentlyPlaying.status = resp.status;
  } catch(error) {
    if (error.response.status === 401) {
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
        const options2 = {
          headers: {
            'Authorization': `Bearer ${response.data.access_token}`
          }
        }
        let resp = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', options2);
        currentlyPlaying.data = resp.data;
        currentlyPlaying.status = resp.status;
      } catch (error) {
        console.log(error)
        console.log(error.request._header)
        console.log(error.response.status)
        console.log(error.response.data)
      }
    }
  }
  return currentlyPlaying;
}
