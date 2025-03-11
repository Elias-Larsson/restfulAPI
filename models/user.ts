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



const User = mongoose.model("User", userSchema);


export default User;