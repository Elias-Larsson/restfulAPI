import express, { Express, Request, Response, NextFunction } from "express";
import userRouter from "./routes/userRoutes";
import itemRouter from "./routes/itemRoutes";
import tradeRouter from "./routes/tradeRoutes";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db";
import AuthController from "./controllers/authController";
import authenticateToken from "./middleware/auth";
import { UserRequest } from "./types";

dotenv.config();
const app: Express = express();

const PORT = process.env.PORT || 3001;
connectDB();

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET, POST, PUT, DELETE, OPTIONS",
  })
);
app.use(itemRouter);
app.use(userRouter);
app.use(tradeRouter);
app.get("/", (req: UserRequest, res: Response) => {
  res.send({ message: "you are authenticated", user: req.user });
});



app.post("/api/login", AuthController.login);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
