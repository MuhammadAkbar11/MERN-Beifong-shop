import path from "path";
import dotenv from "dotenv";
import colors from "colors";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./configs/db.js";
import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";
import orderRoutes from "./routes/order.routes.js";
import uploadRoutes from "./routes/uploads.routes.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";
import { getConvertCurrency } from "./controllers/config.controller.js";
import AppRoutesV2 from "./routes/v2/index.routes.js";
import { deserializeUser } from "./middleware/v2/auth.middleware.js";
import { NODE_ENV } from "./configs/constants.js";

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

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use(deserializeUser);

if (MODE === "development") {
  app.use(morgan("dev"));
}

const staticFile = express.static(path.join(__dirname, "/uploads"));
if (NODE_ENV == "development") {
  console.log("using static folder from .dev");
  app.use(express.static(path.join(__dirname, ".dev")));
}

app.use("/uploads", staticFile);

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

AppRoutesV2(app);

if (MODE === "production") {
  const staticBuild = path.join(__dirname, "/frontend/build");
  app.use(express.static(staticBuild));
  app.use("*", function (req, res) {
    const HTMLFILE = path.resolve(__dirname, "frontend", "build", "index.html");
    res.sendFile(HTMLFILE, err => {
      if (err) res.status(500).send(err);
    });
  });
} else {
  app.get("/", (req, res) => {
    res.send("Beifong Shop API is Running dude!! ");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    colors.green(
      `[server] server running in ${MODE} mode on port ${PORT.underline}`
    )
  );
});
