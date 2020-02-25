const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  dbPort: process.env.DATABASE_PORT
};