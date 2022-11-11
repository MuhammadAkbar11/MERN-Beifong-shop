import dotenv from "dotenv";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();

let envFile = ".env";
if (process.argv[2] === "--dev") {
  envFile = ".env.dev";
}
dotenv.config({
  path: envFile,
});

let uploadDir = "uploads/";

if (process.env.NODE_ENV === "development") {
  uploadDir = process.env.UPLOAD_DIR;
  if (!fs.existsSync(path.join(__dirname, uploadDir))) {
    console.log("WARN : Development directory not found!");
    fs.mkdirSync(path.join(__dirname, uploadDir), { recursive: true });
    console.log("[CONFIG] Development directory created!");
  } else {
    console.log("[CONFIG] Development directory founded!");
  }
}

export const NODE_ENV = process.env.NODE_ENV;
export const UPLOAD_DIR = uploadDir;
export const MONGO_URL = process.env.MONGO_URL;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const JWT_SECRET = process.env.JWT_SECRET;
export const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;

export const PREFIX_VERSION = "/api/v2";
