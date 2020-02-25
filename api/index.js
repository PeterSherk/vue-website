const express = require('express');
const { Pool } = require('pg');
const { logger } = require('./logger');
const { user, host, database, password, dbPort } = require('./config');
const app = express();
app.use(express.json());

// Create DB connection pool
const pool = new Pool({
  user: user,
  host: host,
  database: database,
  password: password,
  port: dbPort,
});

// API Endpoints

app.get('/api/v1/books', (req ,getRes)=> {
  pool.query('SELECT * FROM website.project', (err, qRes) => {
    if (err) {
      logger.log({
        level: 'error',
        message: `${req.method} request to ${req.url} failed.\n
        Error: ${err}`
      });
      throw err;
    } else {
      logger.log({
        level: 'info',
        message: `${req.method} request to ${req.url} successful.`
      });
      getRes.send(qRes.rows);
    }
  });
});

// Start Node server
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}..`));

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

// Close DB connection pools before shutting down
async function shutDown() {
  logger.log({
    level: 'info',
    message: '\nShutting down database connection...'
  });
  await pool.end();
  console.log("Done.");
  process.exit(0);
}
