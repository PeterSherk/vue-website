import { sign, verify } from 'jsonwebtoken';
import { compare, hash as _hash } from 'bcryptjs';
import { logger } from '../../configs/logger';
import { jwtSecret, saltRounds } from '../../configs/config';
import { pool } from '../db/db';

export async function register(req) {
  const un = req.header('username')?.trim();
  const plainPW = req.header('password')?.trim();
  if(!un || !plainPW) {
    return {
      status: 400,
      message: 'Username and password required.'
    };
  }

  try {
    const hash = await _hash(plainPW, saltRounds);
    try {
      await pool.query('INSERT INTO website.login VALUES($1, $2)', [un, hash]);
      logger.log({
        level: 'info',
        message: `${req.method} request to ${req.url} successful.`
      });
      return {
        status: 200,
        message: `User ${un} registered.`
      };
    } catch (pgError) {
      logger.log({
        level: 'error',
        message: `${req.method} request to ${req.url} failed.
        Error: ${pgError}`
      });
      if (pgError.code == 23505) {
        return {
          status: 409,
          message: 'Username already exists.'
        };
      } else {
        return {
          status: 500,
          message: 'Error occurred.'
        };
      }
    }
  } catch (error) {
    logger.log({
      level: 'error',
      message: `${req.method} request to ${req.url} failed.
      Error: ${error}`
    });
    return {
      status: 500,
      message: 'Error occurred.'
    };
  }

}

export async function login(req) {
  try {
    const unpw = Buffer.from(req.header('Authorization').replace('Basic', '').trim(), 'base64').toString('binary').split(':')
    const un = unpw[0]
    const plainPW = unpw[1]
    const response = await pool.query('SELECT * FROM website.login WHERE username=$1', [un]);
    if (response.rowCount == 0) {
      logger.log({
        level: 'info',
        message: `${req.method} request to ${req.url} failed. Username or password incorrect`
      });
      return {
        status: 401,
        message: 'Username or password is incorrect'
      };
    } else {
      const hashPass = response.rows[0].password;
      try {
        const passIsCorrect = await compare(plainPW, hashPass);
        if (passIsCorrect) {
          logger.log({
            level: 'info',
            message: `${req.method} request to ${req.url} successful.`
          });
          const token = sign({ user: un }, jwtSecret, { expiresIn: '1h' });
          return {
            status: 200,
            token: token
          };
        } else {
          logger.log({
            level: 'info',
            message: `${req.method} request to ${req.url} failed. Username or password incorrect`
          });
          return {
            status: 401,
            message: 'Username or password is incorrect'
          };
        }
      } catch (error) {
        logger.log({
          level: 'info',
          message: `${req.method} request to ${req.url} failed. Username or password incorrect
          Error: ${error}`
        });
        return {
          status: 401,
          message: 'Username or password is incorrect'
        };
      }

    }
  } catch (error) {
    logger.log({
      level: 'error',
      message: `${req.method} request to ${req.url} failed.\n
      Error: ${error}`
    });
    return {
      status: 500,
      message: 'Error occurred.'
    };
  }
}

export function tokenInvalid(req) {
  if (!authPresent(req, 'Bearer')) {
    logger.log({
      level: 'info',
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

export function userValidForToken(req, username) {
  const token = req.header('Authorization').replace('Bearer', '').trim();
  const decoded = verify(token, jwtSecret);
  return decoded.user == username;
}

export function authPresent(req, type) {
  return req.header('Authorization') && req.header('Authorization').includes(type)
    && req.header('Authorization').replace(type, '').trim() != ''
}