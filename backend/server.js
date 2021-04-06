import dotenv from "dotenv";
import express from "express";
import connectDB from "./configs/db.js";
import products from "./data/products.js";

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 8080;
const MODE = process.env.NODE_ENV;

app.get("/", (req, res) => {
  res.send("API is Running dude!! ");
});

app.get("/api", (req, res) => {
  res.json({
    message: "Connected!",
  });
});

app.get("/api/products", (req, res) => {
  return res.json({
    status: true,
    products,
  });
});
app.get("/api/product/:id", (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  return res.json({
    status: true,
    product,
  });
});

app.listen(PORT, () => {
  console.log(`Server running in ${MODE} mode on port ${PORT} `);
});
