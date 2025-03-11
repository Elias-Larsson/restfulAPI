import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        id:  Number, 
        email: String, 
        name: String,
        password: String,
        money: Number,
        ownedItems: [Number]
    }, {collection: "movies"}
)

const itemSchema = new mongoose.Schema(
    {
        id: Number,
        itemName: String,
        value: Number,
        creatorId: Number

    
     })

const User = mongoose.model("User", userSchema);
const Item = mongoose.model("Item", itemSchema);

export default {User, Item};