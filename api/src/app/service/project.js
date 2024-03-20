import { logger } from '../../configs/logger';
import { pool } from '../db/db';

export async function getProjects(req) {
  let fields = '*'
  let filter = req.query.filter
  if (filter && filter.toLowerCase() == 'overview') {
    fields = 'id, company, name, year'
  }

  try {
    const response = await pool.query(`SELECT ${fields} FROM website.project`);
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

export async function getProjectById(projectId, req) {
  if (isNaN(projectId) && isNaN(parseFloat(projectId))) {
    logger.log({
      level: 'info',
      message: `${req.method} request to ${req.url} is a 400. Bad project ID: ${projectId}`
    });
    return {
      status: 400,
      message: 'Project ID must be a number.'
    };
  }

  try {
    const result = await pool.query(`SELECT * FROM website.project WHERE id=${projectId}`);
    logger.log({
      level: 'info',
      message: `${req.method} request to ${req.url} successful.`
    });
    if (result.rows[0]) {
      return {
        status: 200,
        data: result.rows[0]
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