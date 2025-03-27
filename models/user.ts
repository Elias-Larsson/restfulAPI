import mongoose, { Schema, InferSchemaType } from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    id: Number,
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    money: { type: Number, default: 500, required: true },
    ownedItems: { type: [{ type: Schema.Types.ObjectId }], default: [] },
  },
  {
    collection: "users",
    timestamps: true
  }
);

const User = mongoose.model<InferSchemaType<typeof userSchema>>(
  "User", 
  userSchema
);

export default User;
