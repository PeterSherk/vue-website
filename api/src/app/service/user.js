import { logger } from '../../configs/logger';
import { pool } from '../db/db';

export async function deleteUser(req) {
  const un = req.params.username;
  try {
    const response = await pool.query('DELETE FROM website.login WHERE username=$1', [un]);
    logger.log({
      level: 'info',
      message: `${req.method} request to ${req.url} successful.`
    });
    const rowsDeleted = response.rowCount;
    logger.log({
      level: 'info',
      message: `${rowsDeleted} records deleted from database.'`
    });
    if (rowsDeleted != 0) {
      return {
        status: 200,
        message: `User ${un} deleted.`
      };
    } else {
      return {
        status: 404,
        message: `User doesn't exist.`
      };
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