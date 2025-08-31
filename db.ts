import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGO_URI_LOCAL = process.env.MONGO_URI_LOCAL as string;
const MONGO_URI_PROD = process.env.MONGO_URI_PROD as string;

const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI_PROD || "";
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Ansluten till MongoDB");
  } catch (error) {
    console.error("error while connecting:", error);
    process.exit(1);
  }
};

export default connectDB;
