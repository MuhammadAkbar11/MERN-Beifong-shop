import mongoose from "mongoose";

const orderModel = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "UserModel",
    },
    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        price: {
          num: {
            type: Number,
            required: true,
          },
          rupiah: String,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "ProductModel",
        },
      },
    ],
    shippingAddress: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    itemsPrice: {
      num: {
        type: Number,
        required: true,
      },
      rupiah: String,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    taxPrice: {
      num: {
        type: Number,
        required: true,
        default: 0,
      },
      rupiah: String,
    },
    shippingPrice: {
      num: {
        type: Number,
        required: true,
        default: 7000,
      },
      rupiah: String,
    },
    totalPrice: {
      num: {
        type: Number,
        required: true,
      },
      rupiah: String,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("OrderModel", orderModel, "orders");

export default OrderModel;
