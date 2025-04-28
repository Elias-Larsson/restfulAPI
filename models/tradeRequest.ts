import mongoose, { Schema } from "mongoose";

const tradeRequestSchema = new mongoose.Schema(
  {
    id: Number,
    requester_id: { type: Schema.Types.ObjectId, required: true },
    recipient_id: { type: Schema.Types.ObjectId, required: true },
    request_item: { type: Schema.Types.ObjectId, required: true },
    offer_item: { type: Schema.Types.ObjectId, required: true },  
  },
  {
    collection: "tradeRequest",
    timestamps: true,
  }
);

const tradeRequest = mongoose.model("tradeRequest", tradeRequestSchema);

export default tradeRequest;
