import mongoose, { Schema, model } from "mongoose";

const DiveSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    location: {
      type: String,
    },
    description: {
      type: String,
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    time: {
      type: Number,
    },
    depth: {
      type: Number,
    },
    image: {
      type: String,
    },
    notes: {
      type: String,
    },
    seen_nudibranch: {
      type: Boolean,
      default: false,
    },
    location_coords: {
      type: String,
    },
    userEmail: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Dive = mongoose.models?.Dive || model("Dive", DiveSchema);

export default Dive;
