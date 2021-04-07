import path, { dirname } from "path";
import dotenv from "dotenv";
import colors from "colors";
import express from "express";
import connectDB from "./configs/db.js";
import productRoutes from "./routes/product.routes.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";

const __dirname = path.resolve();

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 8080;
const MODE = process.env.NODE_ENV;

const staticFile = express.static(path.join(__dirname, "/backend/uploads"));
console.log(path.join(__dirname, "/backend/uploads"));
app.use("/files/uploads", staticFile);

app.get("/", (req, res) => {
  res.send("API is Running dude!! ");
});

app.use("/api/products", productRoutes);

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `\nServer running in ${MODE} mode on port ${PORT.underline} `.yellow.bold
  );
});
