import express, { Express, Request, Response, NextFunction } from "express";
import userRouter from "./routes/userRoutes";
import itemRouter from "./routes/itemRoutes";
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

app.get("/", (req: UserRequest, res: Response) => {
  res.send({ message: "you are authenticated", user: req.user });
});

app.use(express.json());
app.use(itemRouter);
app.use(userRouter);
app.use(
  cors({
    origin: "https://restfulapi-aqov.onrender.com, http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
  })
);

app.post("/api/login", AuthController.login);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
