import { getItem, getItems, createItem, lootbox} from "../controllers/itemController";
import express ,{ Router, Express, Request, Response} from "express";
import AuthenticateToken from "../middleware/auth";

const itemRouter = Router();

itemRouter.get("/api/items/:id", getItem);
itemRouter.get("/api/items", getItems);
itemRouter.post("/api/items", createItem);
itemRouter.post("/api/items/lootbox", AuthenticateToken, lootbox as express.RequestHandler);

export default itemRouter;