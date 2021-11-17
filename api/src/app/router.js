import express, { json } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swagger/swagger';
import cors from 'cors';
import helmet from 'helmet';
import { sign, verify } from 'jsonwebtoken';
import { compare, hash as _hash } from 'bcryptjs';
import { Pool } from 'pg';
import { logger } from '../configs/logger';
import { user, host, database, password, dbPort, jwtSecret, saltRounds, apiPort} from '../configs/config';

// Set up Express server
const app = express();
// Enable JSON processing
app.use(json());
// Enable CORS policy as open for all
app.use(cors());
// Enable base HTTP Request security
app.use(helmet());
//Swagger endpoint for documentation
var options = {
  swaggerOptions: {
    validatorUrl: null
  }
};
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, options));

// Create DB connection pool
const pool = new Pool({
  user: user,
  host: host,
  database: database,
  password: password,
  port: dbPort,
});

// Define tags for Swagger

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Endpoints to interact with personal and professional projects for my personal website.
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints to interact with user's in my website. User's can add custom content and edit their own content.
 */

// Define auth types for Swagger

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BasicAuth:
 *       type: http
 *       scheme: basic
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// API Endpoints

/**
 * @swagger
 * path:
 *  /projects:
 *    get:
 *      summary: Get a list of projects
 *      tags: [Projects]
 *      parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *      responses:
 *        "200":
 *          description: A list of projects
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Project'
 *        "500":
 *          description: Generic error occurred
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/responses/ErrorMessage'
 */
app.get('/api/v1/projects', (req ,getRes)=> {
  let fields = '*'
  let filter = req.query.filter
  if (filter && filter.toLowerCase() == 'overview') {
    fields = 'id, company, name, year'
  }

  pool.query(`SELECT ${fields} FROM website.project`, (err, qRes) => {
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

/**
 * @swagger
 * path:
 *  /projects/{projectId}:
 *    get:
 *      summary: Get a list of projects
 *      tags: [Projects]
 *      parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         description: The project ID of a specific project.
 *         schema:
 *           type: number
 *           minLength: 1
 *      responses:
 *        "200":
 *          description: A list of projects
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Project'
 *        "204":
 *          description: No projects for specified project ID
 *        "500":
 *          description: Generic error occurred
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/responses/ErrorMessage'
 */
app.get('/api/v1/projects/:projectId', (req ,getRes)=> {

  pool.query(`SELECT * FROM website.project WHERE id=${req.params.projectId}`, (err, qRes) => {
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
      if (qRes.rows[0]) {
        return getRes.send(qRes.rows[0]);
      } else {
        return getRes.status(204).send({});
      }
    }
  });
});

/**
 * @swagger
 * path:
 *  /users/{username}:
 *    delete:
 *      summary: Delete's a selected user, only if properly authorized.
 *      tags: [Users]
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The User you want to delete identified by username.
 *         schema:
 *           type: string
 *           minLength: 1
 *      responses:
 *        "200":
 *          description: User has been successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/responses/SuccessMessage'
 *        "401":
 *          description: User does not have proper authorization to delete user
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/responses/UnauthorizedMessage'
 *        "500":
 *          description: Server error occurred.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/responses/ErrorMessage'
 */
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
      const rowsDeleted = qRes.rowCount;
      logger.log({
        level: 'info',
        message: `${rowsDeleted} records deleted from database.'`
      });
      if (rowsDeleted != 0) {
        return res.send({
          message: `User ${un} deleted.`
        });
      } else {
        return res.send({
          message: `User doesn't exist.`
        });
      }
    }
  });
});

/**
 * @swagger
 * path:
 *  /login:
 *    post:
 *      summary: Login to REST API and receive auth credentials.
 *      tags: [Users]
 *      security:
 *        - BasicAuth: []
 *      responses:
 *        "200":
 *          description: Successfully authenticated user and received token.
 *          content:
 *            application/json:
 *              schema:
 *                properties:
 *                  token:
 *                    type: string
 *                    description: JWT token for use in interaction with authorized endpoints
 *                example:
 *                  token: "jdkLleks92L"
 *        "401":
 *          description: User does not have proper authorization.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/responses/UnauthorizedMessage'
 *        "500":
 *          description: Server error occurred.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/responses/ErrorMessage'
 */
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
      compare(plainPW, hashPass, (hashErr, hashRes) => {
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

/**
 * @swagger
 * path:
 *  /register:
 *    post:
 *      summary: Endpoint to register a new user with the system.
 *      tags: [Users]
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *       - in: header
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *       - in: header
 *         name: password
 *         schema:
 *           type: string
 *         required: true
 *      responses:
 *        "200":
 *          description: Successfully added user.
 *          content:
 *            application/json:
 *              schema:
 *                properties:
 *                  message:
 *                    type: string
 *                    description: Message with username that was successfully registered.
 *                example:
 *                  message: "User joeexotic registered."
 *        "400":
 *          description: If username or password is not specified in the header.
 *          content:
 *            application/json:
 *              schema:
 *                properties:
 *                  message:
 *                    type: string
 *                    description: Return message.
 *                example:
 *                  message: "Username and password required."
 *        "401":
 *          description: User does not have proper authorization.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/responses/UnauthorizedMessage'
 *        "500":
 *          description: Server error occurred.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/responses/ErrorMessage'
 */
app.post('/api/v1/register', (req, res) => {
  if (tokenInvalid(req)){
    return res.status(401).send({
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

  _hash(plainPW, saltRounds, (err, hash) => {
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
const port = apiPort || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

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
