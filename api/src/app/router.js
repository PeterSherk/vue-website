import express, { json } from 'express';
// const cors = require('cors');
import { sign, verify } from 'jsonwebtoken';
import { compare, hash as _hash } from 'bcrypt';
import { Pool } from 'pg';
import { logger } from '../../configs/logger';
import { user, host, database, password, dbPort, jwtSecret, saltRounds } from '../../configs/config';
const app = express();
app.use(json());

// Create DB connection pool
const pool = new Pool({
  user: user,
  host: host,
  database: database,
  password: password,
  port: dbPort,
});

// API Endpoints

app.get('/api/v1/projects', (req ,getRes)=> {

  pool.query('SELECT * FROM website.project', (err, qRes) => {
    if (err) {
      logger.log({
        level: 'error',
        message: `${req.method} request to ${req.url} failed. Error: ${err}`
      });
      return getRes.status(500).send({
        message: 'Error occurred.'
      });
    } else {
      logger.log({
        level: 'info',
        message: `${req.method} request to ${req.url} successful.`
      });
      return getRes.send(qRes.rows);
    }
  });
});

app.get('/api/v1/projects/overview', (req ,getRes)=> {

  pool.query('SELECT id, company, name, year FROM website.project', (err, qRes) => {
    if (err) {
      logger.log({
        level: 'error',
        message: `${req.method} request to ${req.url} failed. Error: ${err}`
      });
      return getRes.status(500).send({
        message: 'Error occurred.'
      });
    } else {
      logger.log({
        level: 'info',
        message: `${req.method} request to ${req.url} successful.`
      });
      return getRes.send(qRes.rows);
    }
  });
});

app.delete('/api/v1/users/:username', (req, res) => {
  if (tokenInvalid(req) || !userValidForToken(req, req.params.username)){
    return res.status(401).send({
      message: 'Authorization failed.'
    });
  }

  const un = req.params.username;
  pool.query('DELETE FROM website.login WHERE username=$1', [un], (err, qRes) => {
    if (err) {
      logger.log({
        level: 'error',
        message: `${req.method} request to ${req.url} failed.\n
        Error: ${err}`
      });
      return res.status(500).send({
        message: 'Error occurred.'
      });
    } else {
      logger.log({
        level: 'info',
        message: `${req.method} request to ${req.url} successful.`
      });
      return res.send({
        message: `User ${un} deleted.`
      });
    }
  });
});

app.post('/api/v1/login', (req, res) => {
  if (!authPresent(req, 'Basic')) {
    return res.status(401).send({
      message: 'Authorization failed.'
    });
  }

  const unpw = Buffer.from(req.header('Authorization').replace('Basic', '').trim(), 'base64').toString('binary').split(':')
  const un = unpw[0]
  const plainPW = unpw[1]
  pool.query('SELECT * FROM website.login WHERE username=$1', [un], (err, qRes) => {
    if (err) {
      logger.log({
        level: 'error',
        message: `${req.method} request to ${req.url} failed.\n
        Error: ${err}`
      });
      return res.status(500).send({
        message: 'Error occurred.'
      });
    } else if (qRes.rowCount == 0) {
      logger.log({
        level: 'info',
        message: `${req.method} request to ${req.url} failed. Username or password incorrect`
      });
      return res.status(401).send({
        message: 'Username or password is incorrect'
      });
    } else {
      const hashPass = qRes.rows[0].password
      compare(plainPW, hashPass, function(hashErr, hashRes) {
        if (hashErr || !hashRes) {
          logger.log({
            level: 'info',
            message: `${req.method} request to ${req.url} failed. Username or password incorrect
            Error: ${hashErr}`
          });
          return res.status(401).send({
            message: 'Username or password is incorrect'
          });
        } else {
          logger.log({
            level: 'info',
            message: `${req.method} request to ${req.url} successful.`
          });
          const token = sign({ user: un }, jwtSecret, { expiresIn: '1h' });
          return res.send({
            token: token
          });
        }
      });
    }
  });
});

app.post('/api/v1/register', (req, res) => {
  if (tokenInvalid(req)){
    return getRes.status(401).send({
      message: 'Authorization failed.'
    });
  }

  const un = req.header('username').trim();
  const plainPW = req.header('password').trim();
  if(!un || !plainPW) {
    return res.status(400).send({
      message: 'Username and password required.'
    });
  }

  _hash(plainPW, saltRounds, function(err, hash) {
    if (err) {
      logger.log({
        level: 'error',
        message: `${req.method} request to ${req.url} failed.
        Error: ${err}`
      });
      return res.status(500).send({
        message: 'Error occurred.'
      });
    } else {
      pool.query('INSERT INTO website.login VALUES($1, $2)', [un, hash], (qErr, qRes) => {
        if (qErr) {
          logger.log({
            level: 'error',
            message: `${req.method} request to ${req.url} failed.
            Error: ${qErr}`
          });
          if (qErr.code == 23505) {
            return res.status(500).send({
              message: 'Username already exists.'
            });
          } else {
            return res.status(500).send({
              message: 'Error occurred.'
            });
          }
        } else {
          logger.log({
            level: 'info',
            message: `${req.method} request to ${req.url} successful.`
          });
          return res.send({
            message: `User ${un} registered.`
          });
        }
      });
    }
  });
});

function tokenInvalid(req) {
  if (!authPresent(req, 'Bearer')) {
    logger.log({
      level: 'error',
      message: `${req.method} request to ${req.url} failed. Error: No Bearer token present`
    });
    return true;
  } else {
    const token = req.header('Authorization').replace('Bearer', '').trim()
    try {
      verify(token, jwtSecret);
    } catch (err) {
      logger.log({
        level: 'error',
        message: `${req.method} request to ${req.url} failed. Error: ${err}`
      });
      return true;
    }
  }
  return false;
}

function userValidForToken(req, username) {
  const token = req.header('Authorization').replace('Bearer', '').trim();
  const decoded = verify(token, jwtSecret);
  return decoded.user == username;
}

function authPresent(req, type) {
  return req.header('Authorization') && req.header('Authorization').includes(type)
    && req.header('Authorization').replace(type, '').trim() != ''
}

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

export default app;
