import {
  getItem,
  getItems,
  createItem,
  lootbox,
} from "../controllers/itemController";
import express, { Router, Express, Request, Response } from "express";
import authenticateToken from "../middleware/auth";

const itemRouter = Router();

itemRouter.get("/api/items/:id", getItem);
itemRouter.get("/api/items", getItems);
itemRouter.post("/api/items", authenticateToken, createItem);
itemRouter.post(
  "/api/items/lootbox",
  authenticateToken,
  lootbox as express.RequestHandler
);

export default itemRouter;
