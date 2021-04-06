const express = require("express");
const products = require("./data/products");

const app = express();

const PORT = process.env.PORT || 8080;

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
  console.log("Server running on port " + PORT);
});
