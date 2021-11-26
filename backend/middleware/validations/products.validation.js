import { checkSchema } from "express-validator";

const productsValidation = checkSchema({
  name: {
    notEmpty: {
      errorMessage: "Enter product name",
    },
  },
  price: {
    notEmpty: {
      errorMessage: "Enter product price",
    },
  },
  brand: {
    notEmpty: {
      errorMessage: "Enter product brand",
    },
  },
  category: {
    notEmpty: {
      errorMessage: "Enter product category",
    },
  },
  description: {
    notEmpty: {
      errorMessage: "Enter product description",
    },
  },
});

export default productsValidation;
