import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        id: Number, 
        email: { type: String, required: true, unique: true }, 
        name: { type: String, required: true },
        password: { type: String, required: true },
        money: Number,
        ownedItems: {type: [{type: Schema.Types.ObjectId}], default: []}
    }, 
    {
        collection: "users",
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

export default User;