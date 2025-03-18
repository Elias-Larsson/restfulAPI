import { getUsers, createUser, updateUser, deleteUser} from "../controllers/userController";
import express ,{ Router, Express, Request, Response} from "express";

const userRouter = Router();

// userRouter.get("/api/profile/:id", getUser); 
userRouter.get("/api/profile", getUsers);
userRouter.post("/api/profile", createUser);
userRouter.put("/api/profile", updateUser);
userRouter.delete("/api/profile", deleteUser);

export default userRouter;