import { logger } from '../../configs/logger';
import { pool } from '../db/db';

export async function getRecipes(req) {
  try {
    const response = await pool.query(`SELECT * FROM website.recipes`);
    logger.log({
      level: 'info',
      message: `${req.method} request to ${req.url} successful.`
    });
    return {
      status: 200,
      data: response.rows
    };
  } catch (error) {
    logger.log({
      level: 'error',
      message: `${req.method} request to ${req.url} failed. Error: ${error}`
    });
    return {
      status: 500,
      message: 'Error occurred.'
    };
  }
}

export async function getRecipeById(req) {
  const recipeId = req.params.recipeId
  if (isNaN(recipeId) && isNaN(parseFloat(recipeId))) {
    logger.log({
      level: 'info',
      message: `${req.method} request to ${req.url} is a 400. Bad recipe ID: ${recipeId}`
    });
    return {
      status: 400,
      message: 'Recipe ID must be a number.'
    };
  }

  try {
    const response = await pool.query(`SELECT * FROM website.recipes WHERE id=${recipeId}`);
    logger.log({
      level: 'info',
      message: `${req.method} request to ${req.url} successful.`
    });
    if (response.rows[0]) {
      return {
        status: 200,
        data: response.rows[0]
      };
    } else {
      return {
        status: 204,
        data: {}
      };
    }
  } catch (error) {
    logger.log({
      level: 'error',
      message: `${req.method} request to ${req.url} failed. Error: ${error}`
    });
    return {
      status: 500,
      message: 'Error occurred.'
    };
  }
}

export async function createRecipe(req) {
  const body = req.body;
  try {
    await pool.query(`INSERT INTO website.recipes(display_name, website_url, description, picture_url, steps, ingredients, date_ate)
    VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [body.displayName, body.websiteUrl, body.description, body.pictureUrl, body.steps,
      body.ingredients, body.dateAte])
    logger.log({
      level: 'info',
      message: `${req.method} request to ${req.url} successful.`
    });
    return {
      status: 201,
      message: 'Recipe created.'
    };
  } catch (error) {
    logger.log({
      level: 'error',
      message: `${req.method} request to ${req.url} failed. Error: ${error}`
    });
    return {
      status: 500,
      message: 'Error occurred.'
    };
  }
}