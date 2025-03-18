import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
    {
        id: Number,
        itemName: String,
        value: Number,
        creatorId: Number
     })

     const Item = mongoose.model("Item", itemSchema);

     export default Item; 