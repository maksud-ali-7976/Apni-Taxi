import { Schema, model } from "mongoose";

const bookingSchema = new Schema(
  {
    pickUpAdd: {
      type: String,
      required: true,
    },
    dropAdd: {
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
    amount: {
      type: Number,
    },
    pickup: {
      lat: { type: String },
      long: { type: String },
    },
    drop: {
      lat: { type: String },
      long: { type: String },
    },
    rejectedRide: {
      type: Boolean,
      default: false,
    },
    completedRide: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Booking = model("booking", bookingSchema);
