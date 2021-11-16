import dotenv from "dotenv";
import colors from "colors";
import bcrypt from "bcryptjs";
import connectDB from "../configs/db.js";

// models

import UserModel from "../models/userModel.js";

dotenv.config({ path: ".env.dev" });

connectDB();

const generateUsers = async () => {
  const result = process.argv[3] || 10;
  let newUsers = [];

  try {
    const users = await UserModel.find({ email: /void/i }, "email");

    // console.log(index);s

    const startOf = users.length !== 0 ? users.length + 1 : 1;
    const total = users.length !== 0 ? +result : +result;

    for (let i = 0; i < +total; i++) {
      const prefix = i + startOf;
      newUsers.push({
        name: `Void ${prefix}`,
        email: `void${prefix}@gmail.com`,
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
        cart: {
          items: [],
        },
      });
    }
    await UserModel.insertMany(newUsers);
    console.log(`Generated successfull`.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

generateUsers();
