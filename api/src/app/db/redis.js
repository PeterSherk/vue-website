import { createClient } from 'redis';
import { logger } from '../../configs/logger';

const redisHost = process.env.REDIS_HOST || 'localhost';

const redis = createClient({
  url: `redis://${redisHost}:6379`
})
  .on('error', err => logger.log({
    level: 'error',
    message: `Redis Client Error
    Error: ${err}`
  }));

export default redis;