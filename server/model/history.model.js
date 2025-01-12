import { Schema, model } from "mongoose";

const historySchema = new Schema(
  {
    pickupLocation: {
      type: String,
      required: true,
    },
    dropLocation: {
      type: String,
      required: true,
    },
    bookedBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    bookingTime: {
      type: Date,
      default: Date.now,
    },
    bookingRent: {
      type: String,
    },
  },
  { timestamps: true }
);

export const History = model("history", historySchema);
