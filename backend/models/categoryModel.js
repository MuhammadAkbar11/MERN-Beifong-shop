import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.model(
  "CategoryModel",
  categorySchema,
  "categories"
);

export default CategoryModel;
