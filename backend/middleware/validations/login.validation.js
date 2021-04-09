import { checkSchema } from "express-validator";

const loginValidation = checkSchema({
  email: {
    notEmpty: {
      errorMessage: "Enter youe email address",
    },
    isEmail: {
      errorMessage: "Invalid email",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "enter your password",
    },
  },
});

export default loginValidation;
