import mongoose from "mongoose";

import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart: {
      items: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProductModel",
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
          total: {
            type: Number,
            required: true,
          },
        },
      ],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.updateCart = async function (cartItems, products) {
  let newCartItems;
  const updatedCart = [...this.cart.items];
  if (this.cart.items.length === 0) {
    newCartItems = cartItems;
  } else {
    products.map(product => {
      const cartProductIndex = updatedCart.findIndex(x => {
        return x.product.toString() === product._id.toString();
      });

      const cartItemIndex = cartItems.findIndex(
        x => x.product.toString() === product._id.toString()
      );

      if (cartProductIndex >= 0) {
        let newQty = cartItems[cartItemIndex].quantity;
        const totalPrice = product.price.num * newQty;
        updatedCart[cartProductIndex].quantity = newQty;
        updatedCart[cartProductIndex].total = totalPrice;
      } else {
        const setItem = {
          product: cartItems[cartItemIndex].product,
          total: cartItems[cartItemIndex].total,
          quantity: cartItems[cartItemIndex].quantity,
        };

        updatedCart.push(setItem);
      }
    });
    newCartItems = updatedCart;
  }

  this.cart = {
    items: newCartItems,
  };

  return await this.save();
};

userSchema.methods.addToCart = function (product, qty) {
  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.product.toString() === product._id.toString();
  });

  let newQuantity = qty;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = +qty;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
    updatedCartItems[cartProductIndex].total =
      +newQuantity * +product.price.num;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
      total: +newQuantity * +product.price.num,
    });
  }

  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  return this.save();
};

const UserModel = mongoose.model("UserModel", userSchema, "users");

export default UserModel;
