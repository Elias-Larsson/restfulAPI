import mongoose, { Schema } from "mongoose";

const tradeRequestSchema = new mongoose.Schema(
  {
    id: Number,
    requestedItems: { type: [{ type: Schema.Types.ObjectId }], default: [] },
    giveItems: { type: [{ type: Schema.Types.ObjectId }], default: [] }, 
  },
  {
    collection: "tradeRequest",
    timestamps: true,
  }
);

const tradeRequest = mongoose.model("tradeRequest", tradeRequestSchema);

export default tradeRequest;
