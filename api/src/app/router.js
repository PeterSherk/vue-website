import express, { json } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './openapi/swagger';
import cors from 'cors';
import helmet from 'helmet';
import { logger } from '../configs/logger';
import { apiPort } from '../configs/config';
import { currentlyPlaying } from './service/music';
import { getProjectById, getProjects } from './service/project';
import { createRecipe, getRecipeById, getRecipes } from './service/recipe';
import { deleteUser } from './service/user';
import { authPresent, login, register, tokenInvalid, userValidForToken } from './service/auth';
import { pool } from './db/db';

// Set up Express servers
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

// Define tags for Swagger

/**
 * @openapi
 * tags:
 *   name: Projects
 *   description: Endpoints to interact with personal and professional projects for my personal website.
 */

/**
 * @openapi
 * tags:
 *   name: Cooking
 *   description: Endpoints to interact with cooking and recipes.
 */

/**
 * @openapi
 * tags:
 *   name: Users
 *   description: Endpoints to interact with user's in my website. User's can add custom content and edit their own content.
 */

// Define auth types for Swagger

/**
 * @openapi
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
 * @openapi
 *  /recipes:
 *    post:
 *      summary: Create a recipe
 *      tags: [Cooking]
 *      security:
 *        - BearerAuth: []
 *      requestBody:
 *        description: The Recipe to create, including details on how it tasted
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Recipe'
 *      responses:
 *        "201":
 *          description: Recipe ID of recipe successfully created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: Response message
 *                example:
 *                  message: "Recipe created"
 *        "500":
 *          description: Generic error occurred
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/responses/ErrorMessage'
 */
app.post('/api/v1/recipes', async (req, res) => {
  if (tokenInvalid(req)){
    return res.status(401).send({
      message: 'Authorization failed.'
    });
  }

  const response = await createRecipe(req);
  return res.status(response.status).json({
    message: response.message
  });
});

/**
 * @openapi
 *  /recipes:
 *    get:
 *      summary: Get a list of recipes
 *      tags: [Cooking]
 *      responses:
 *        "200":
 *          description: A list of recipes
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Recipe'
 *        "500":
 *          description: Generic error occurred
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/responses/ErrorMessage'
 */
app.get('/api/v1/recipes', async (req ,res)=> {
  const response = await getRecipes(req);
  if (response.status === 400 || response.status === 500) {
    return res.status(response.status).json({
      message: response.message
    });
  } else {
    return res.status(response.status).send(response.data);
  }
});

/**
 * @openapi
 *  /recipes/{recipeId}:
 *    get:
 *      summary: Get a specific recipe
 *      tags: [Cooking]
 *      parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         description: The recipe ID of a specific recipe.
 *         schema:
 *           type: number
 *           minLength: 1
 *      responses:
 *        "200":
 *          description: A specific recipe
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Recipe'
 *        "204":
 *          description: No projects for specified project ID
 *        "500":
 *          description: Generic error occurred
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/responses/ErrorMessage'
 */
 app.get('/api/v1/recipes/:recipeId', async (req, res)=> {
  const response = await getRecipeById(req);
  if (response.status === 400 || response.status === 500) {
    return res.status(response.status).json({
      message: response.message
    });
  } else {
    return res.status(response.status).send(response.data);
  }
});

/**
 * @openapi
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
app.get('/api/v1/projects', async (req ,res)=> {
  const response = await getProjects(req);
  if (response.status === 400 || response.status === 500) {
    return res.status(response.status).json({
      message: response.message
    });
  } else {
    return res.status(response.status).send(response.data);
  }
});

/**
 * @openapi
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
 *        "400":
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/responses/ErrorMessage'
 *        "500":
 *          description: Generic error occurred
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/responses/ErrorMessage'
 */
app.get('/api/v1/projects/:projectId', async (req ,res)=> {
  const projectId = req.params.projectId
  const response = await getProjectById(projectId, req);
  if (response.status === 400 || response.status === 500) {
    return res.status(response.status).json({
      message: response.message
    });
  } else {
    return res.status(response.status).send(response.data);
  }
});

app.get('/api/v1/music/currently-playing', async (req ,res)=> {
  let response = await currentlyPlaying();
  return res.status(response.status).send(response.data);
});

/**
 * @openapi
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
app.delete('/api/v1/users/:username', async (req, res) => {
  if (tokenInvalid(req) || !userValidForToken(req, req.params.username)){
    return res.status(401).send({
      message: 'Authorization failed.'
    });
  }

  const response = await deleteUser(req);
  return res.status(response.status).send({
    message: response.message
  });
});

/**
 * @openapi
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
app.post('/api/v1/login', async (req, res) => {
  if (!authPresent(req, 'Basic')) {
    return res.status(401).send({
      message: 'Authorization failed.'
    });
  }
  const response = await login(req);
  if (response.status === 200) {
    return res.status(response.status).send({
      token: response.token
    });
  } else {
    return res.status(response.status).send({
      message: response.message
    });
  }
});

/**
 * @openapi
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
app.post('/api/v1/register', async (req, res) => {
  if (tokenInvalid(req)){
    return res.status(401).send({
      message: 'Authorization failed.'
    });
  }
  const response = await register(req);
  return res.status(response.status).send({
    message: response.message
  });
});

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
