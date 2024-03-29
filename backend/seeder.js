import dotenv from "dotenv";
import mongoose from "mongoose";
import colors from "colors";
import connectDB from "./configs/db.js";

import products from "./data/products.js";
import users from "./data/users.js";
// models
import OrderModel from "./models/orderModel.js";
import ProductModel from "./models/productModel.js";
import UserModel from "./models/userModel.js";
import convertRupiah from "./utils/convertRupiah.js";
import SessionModel from "./models/sessionModel.js";

dotenv.config({ path: ".env.dev" });

connectDB();

const importData = async () => {
  try {
    await OrderModel.deleteMany();
    await ProductModel.deleteMany();
    await UserModel.deleteMany();

    const createdUsers = await UserModel.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map(product => {
      return {
        ...product,
        user: adminUser,
        image: `/uploads${product.image}`,
        category: mongoose.Types.ObjectId("61a0ced2f2ee1f9e7bae2db4"),
        price: {
          num: product.price,
          rupiah: convertRupiah(product.price),
        },
        createdAt: new Date().toISOString(),
        updatedAt: null,
      };
    });

    await ProductModel.insertMany(sampleProducts);

    console.log(`Data Imported`.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await OrderModel.deleteMany();
    await ProductModel.deleteMany();
    await UserModel.deleteMany();
    await SessionModel.deleteMany();

    console.log(`Data Destroyed`.red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
