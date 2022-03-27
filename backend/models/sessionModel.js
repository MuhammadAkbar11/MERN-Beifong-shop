import mongoose from "mongoose";

const sessionSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "UserModel",
    },
  },
  {
    timestamps: true,
  }
);

const SessionModel = mongoose.model("SessionModel", sessionSchema, "sessions");

export default SessionModel;
