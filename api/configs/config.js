import { config } from 'dotenv';
config();
export const user = process.env.USER;
export const host = process.env.HOST;
export const database = process.env.DATABASE;
export const password = process.env.PASSWORD;
export const dbPort = process.env.DATABASE_PORT;
export const jwtSecret = process.env.JWT_SECRET;
export const saltRounds = process.env.SALT_ROUNDS;