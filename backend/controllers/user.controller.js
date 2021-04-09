import asyncHandler from "express-async-handler";
import UserModel from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    const doMatchPw = await user.matchPassword(password);

    if (user && doMatchPw) {
      return res.status(200).json({
        status: true,
        message: "Login success",
        request: {
          email,
          password,
        },
        user: {
          isAdmin: user.isAdmin,
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } else {
      res.status(401);

      const errorObj = new Error();
      errorObj.statusCode = 401;
      errorObj.message = "Invalid email or password";

      throw errorObj;
    }
  } catch (error) {
    console.log(error);

    const errorObj = new Error();
    errorObj.statusCode = 500;
    errorObj.message = error.message;

    throw errorObj;
  }
});

export { authUser };
