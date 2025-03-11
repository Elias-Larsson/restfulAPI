import {createUser, getUser, updateUser, deleteUser} from "../controllers/userController";
import express ,{Express, Request, Response} from "express";
const app: Express = express();
app.use(express.json());

const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, World!");
  });

app.get("/api/profile", getUser); 
app.post("/api/profile", createUser);
app.put("/api/profile", updateUser);
app.delete("/api/profile", deleteUser);