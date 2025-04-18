import { Schema, model } from "mongoose";

export const bidSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Bid = model("Bid", bidSchema);

export default Bid;
