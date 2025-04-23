import mongoose, { Schema } from "mongoose";

const tradeRequestSchema = new mongoose.Schema(
  {
    id: Number,
    requester_id: { type: Schema.Types.ObjectId, required: true },
    recipient_id: { type: Schema.Types.ObjectId, required: true },
    request_items: { type: [{ type: Schema.Types.ObjectId }], default: [] },
    offer_items: { type: [{ type: Schema.Types.ObjectId }], default: [] }, 
  },
  {
    collection: "tradeRequest",
    timestamps: true,
  }
);

const tradeRequest = mongoose.model("tradeRequest", tradeRequestSchema);

export default tradeRequest;
