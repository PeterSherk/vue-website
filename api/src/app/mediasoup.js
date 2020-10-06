const mediasoup = require("mediasoup");
import { logger } from '../../configs/logger';

const mediaCodecs =
[
  {
    kind        : "audio",
    mimeType    : "audio/opus",
    clockRate   : 48000,
    channels    : 2
  }
];

let router = undefined;
let worker = undefined;
let transport = undefined;

async function createMediaSoupWorker() {
  worker = await mediasoup.createWorker(
    {
      logLevel   : 'warn',
      logTags    : ['rtcp', 'ice', 'dtls'],
      rtcMinPort : 10000,
      rtcMaxPort : 59999
    });

  worker.on('died', () =>
  {
    logger.log({
      level: 'error',
      message: `mediasoup Worker died, exiting  in 2 seconds... [pid:${worker.pid}]`
    });
    setTimeout(() => process.exit(1), 2000);
  });

  // Log worker resource usage every X seconds.
  setInterval(async () =>
  {
    const usage = await worker.getResourceUsage();

    logger.log({
      level: 'info',
      message: `mediasoup Worker resource usage [pid:${worker.pid}]: ${JSON.stringify(usage)}`
    });
  }, 30000);
}

async function createMediaSoupRouter() {
	router = await worker.createRouter({ mediaCodecs });
}

// async function createMediaSoupTransport() {
// 	router = await worker.createRouter({ mediaCodecs });
// }

function getMediaSoupWorker() {
  return worker;
}

function getMediaSoupRouter() {
  return router;
}

module.exports = {
  createMediaSoupWorker: createMediaSoupWorker,
  createMediaSoupRouter: createMediaSoupRouter,
  getMediaSoupWorker: getMediaSoupWorker,
  getMediaSoupRouter: getMediaSoupRouter
};
