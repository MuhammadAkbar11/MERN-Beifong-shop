import { checkSchema } from "express-validator";

const userUpdateValidation = checkSchema({
  name: {
    trim: true,
    notEmpty: {
      errorMessage: "Enter your name",
    },
  },
  email: {
    trim: true,
    notEmpty: {
      errorMessage: "Enter youe email address",
    },
    normalizeEmail: true,
    isEmail: {
      errorMessage: "Invalid email",
    },
  },
});

export default userUpdateValidation;
