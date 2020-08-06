import { config } from 'dotenv';
config();
export const user = process.env.USER;
export const host = process.env.HOST;
export const database = process.env.DATABASE;
export const password = process.env.PASSWORD;
export const apiPort = parseInt(process.env.PORT, 10);
export const dbPort = parseInt(process.env.DATABASE_PORT, 10);
export const jwtSecret = process.env.JWT_SECRET;
export const saltRounds = parseInt(process.env.SALT_ROUNDS);