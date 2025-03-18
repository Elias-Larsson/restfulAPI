import { getUsers, getUser, createUser, updateUser, deleteUser} from "../controllers/userController";
import express ,{ Router, Express, Request, Response} from "express";

const userRouter = Router();

// userRouter.get("/api/profile/:id", getUser); 
userRouter.get("/api/profile", getUsers);
userRouter.get("/api/profile/:id", getUser);
userRouter.post("/api/profile", createUser);
userRouter.put("/api/profile/:id", updateUser);
userRouter.delete("/api/profile/:id", deleteUser);

export default userRouter;