import path from "path";
import dotenv from "dotenv";
import colors from "colors";
import express from "express";
import morgan from "morgan";
import connectDB from "./configs/db.js";
import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";
import orderRoutes from "./routes/order.routes.js";
import uploadRoutes from "./routes/uploads.routes.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";
import convertCurrency from "./utils/convertCurrency.js";
import { getConvertCurrency } from "./controllers/config.controller.js";

const __dirname = path.resolve();

let envFile = ".env";
if (process.argv[2] === "--dev") {
  envFile = ".env.dev";
}

dotenv.config({
  path: envFile,
});

connectDB();

const app = express();

const PORT = process.env.PORT || 8080;
const MODE = process.env.NODE_ENV;

app.use(express.json());

if (MODE === "development") {
  app.use(morgan("dev"));
}

const staticFile = express.static(path.join(__dirname, "/uploads"));
app.use("/uploads", staticFile);

app.get("/", (req, res) => {
  res.send("API is Running dude!! ");
});

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.json({
    client_id: process.env.PAYPAL_CLIENT_ID,
  })
);
app.get("/api/config/currency", getConvertCurrency);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `\nServer running in ${MODE} mode on port ${PORT.underline} `.yellow.bold
  );
});
