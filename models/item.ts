import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
    {
        id: Number,
        itemName: { type: String, required: true, unique: true },
        value: { type: Number, required: true},
        rarity: { type: String, required: true},
        creatorId: { type: Number, required: true}
     })

     const Item = mongoose.model("Item", itemSchema);

     export default Item; 