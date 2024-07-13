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
      type: Date,
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
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Dive = mongoose.models?.Dive || model("Dive", DiveSchema);

export default Dive;
