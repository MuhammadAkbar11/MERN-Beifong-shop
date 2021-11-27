import { checkSchema } from "express-validator";
import CategoryModel from "../../models/categoryModel.js";

const categoryValidation = checkSchema({
  name: {
    notEmpty: {
      errorMessage: "Category name cannot be empty",
    },
  },
  slug: {
    notEmpty: {
      errorMessage: "Slug cannot be empty",
    },
    isLowercase: {
      errorMessage: "Slug must be lowercase",
    },
    trim: true,

    matches: {
      options: /^[A-Za-z0-9 -]+$/,
      errorMessage: 'Slug only support " - " characters',
    },
    customSanitizer: {
      options: value => value.replace(/\s+/g, "-"),
    },
    custom: {
      options: async (value, { req }) => {
        const existSlug = await CategoryModel.find({
          slug: value,
          _id: {
            $ne: req.params.id,
          },
        });

        if (existSlug.length !== 0) {
          throw new Error("Slug already exist!");
        }
        return true;
      },
    },
  },
  icon: {
    notEmpty: {
      errorMessage: "Icon cannot be empty",
    },
  },
});

export default categoryValidation;
