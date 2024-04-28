import { Pool } from 'pg';
import { user, host, database, password, dbPort } from '../../configs/config';

// Create DB connection pool
const pool = new Pool({
  user: user,
  host: host,
  database: database,
  password: password,
  port: dbPort,
});

export {
  pool
};