import { configDotenv } from "dotenv";
configDotenv();
const {
  PORT,
  DB_CONNECTION_STRING,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIS_CONNECTION_STRING,
  JWT_SECRET
} = process.env;
export const secrets = {
  PORT,
  DB_CONNECTION_STRING,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIS_CONNECTION_STRING,
  JWT_SECRET
};
