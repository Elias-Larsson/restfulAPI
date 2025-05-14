import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import express, { Router, Express, Request, Response } from "express";
import authenticateToken from "../middleware/auth";

const userRouter = Router();

userRouter.get("/api/profile", getUsers);
userRouter.get("/api/profile/:id", getUser);
userRouter.post("/api/profile", createUser);
userRouter.put("/api/profile", authenticateToken, updateUser);
userRouter.delete("/api/profile", authenticateToken, deleteUser);

export default userRouter;
