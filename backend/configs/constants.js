import dotenv from "dotenv";

let envFile = ".env";
if (process.argv[2] === "--dev") {
  envFile = ".env.dev";
}
dotenv.config({
  path: envFile,
});

export const MONGO_URL = process.env.MONGO_URL;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const JWT_SECRET = process.env.JWT_SECRET;

export const PREFIX_VERSION = "/api/v2";
