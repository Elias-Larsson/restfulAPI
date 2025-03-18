import { getItem, getItems, createItem, getLootbox} from "../controllers/itemController";
import express ,{ Router, Express, Request, Response} from "express";

const itemRouter = Router();

itemRouter.get("/api/items/:id", getItem);
itemRouter.get("/api/items", getItems);
itemRouter.post("/api/items", createItem);
itemRouter.get("/api/items/lootbox", getLootbox);

export default itemRouter;