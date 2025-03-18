import express, { Express, Request, Response } from "express";
import userRouter from "./routes/userRoutes";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db";

dotenv.config();
const app: Express = express();

const PORT = process.env.PORT || 3001;
connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use(express.json());
app.use(userRouter);
app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE",
}));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
