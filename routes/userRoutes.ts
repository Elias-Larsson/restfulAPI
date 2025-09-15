import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  filterUsers,
} from "../controllers/userController";
import express, { Router, Express, Request, Response } from "express";
import authenticateToken from "../middleware/auth";

const userRouter = Router();

userRouter.get("/api/users", getUsers);
userRouter.get("/api/user", authenticateToken, getUser);
userRouter.get("/api/users/filter", filterUsers);
userRouter.post("/api/user", createUser);
userRouter.put("/api/user", authenticateToken, updateUser);
userRouter.delete("/api/user", authenticateToken, deleteUser);

export default userRouter;
