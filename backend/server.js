import dotenv from "dotenv";
import colors from "colors";
import express from "express";
import connectDB from "./configs/db.js";
import productRoutes from "./routes/product.routes.js";

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 8080;
const MODE = process.env.NODE_ENV;

app.get("/", (req, res) => {
  res.send("API is Running dude!! ");
});

app.use("/api", productRoutes);

app.listen(PORT, () => {
  console.log(
    `\nServer running in ${MODE} mode on port ${PORT.underline} `.yellow.bold
  );
});
