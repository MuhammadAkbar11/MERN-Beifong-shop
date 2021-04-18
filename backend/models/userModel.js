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
          qty: {
            type: Number,
            required: true,
          },
          subtotal: {
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

userSchema.methods.insertUserCart = async function (cartItems) {
  this.cart = {
    items: cartItems,
  };
  return await this.save();
};

userSchema.methods.updateCart = async function (cartItems, products = null) {
  const updatedCart = [...this.cart.items];
  products.map(product => {
    const cartProductIndex = updatedCart.findIndex(x => {
      return x.product.toString() === product._id.toString();
    });
    const cartItemIndex = cartItems.findIndex(
      x => x.product.toString() === product._id.toString()
    );

    if (cartProductIndex >= 0) {
      let newQty = cartItems[cartItemIndex].qty;
      const totalPrice = product.price.num * newQty;
      updatedCart[cartProductIndex].qty = newQty;
      updatedCart[cartProductIndex].subtotal = totalPrice;
    } else {
      const setItem = {
        product: cartItems[cartItemIndex].product,
        subtotal: cartItems[cartItemIndex].subtotal,
        qty: cartItems[cartItemIndex].qty,
      };

      updatedCart.push(setItem);
    }
  });

  this.cart = {
    items: updatedCart,
  };

  return await this.save();
};

userSchema.methods.addToCart = function (product, qty) {
  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.product.toString() === product._id.toString();
  });

  let newQty = qty;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQty = +qty;
    updatedCartItems[cartProductIndex].qty = newQty;
    updatedCartItems[cartProductIndex].subtotal = +newQty * +product.price.num;
  } else {
    updatedCartItems.push({
      product: product._id,
      qty: newQty,
      subtotal: +newQty * +product.price.num,
    });
  }

  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.removeCartItem = async function (productId) {
  const updatedCartItems = this.cart.items.filter(item => {
    return item.product.toString() !== productId.toString();
  });

  this.cart.items = updatedCartItems;

  return await this.save();
};

userSchema.methods.clearCart = async function () {
  this.cart = {
    items: [],
  };

  return await this.save();
};

const UserModel = mongoose.model("UserModel", userSchema, "users");

export default UserModel;
