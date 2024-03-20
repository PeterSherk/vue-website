import { createClient } from 'redis';
import { logger } from '../../configs/logger';

const redis = createClient()
  .on('error', err => logger.log({
    level: 'error',
    message: `Redis Client Error
    Error: ${err}`
  }));

export default redis;