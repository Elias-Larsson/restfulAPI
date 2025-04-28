import {getTradeRequest, userTradeChoice, userTradeRequest} from "../controllers/tradeController";
  import express, { Router, Express, Request, Response } from "express";
  import authenticateToken from "../middleware/auth";
import { get } from "http";
  
  const tradeRouter = Router();
  
  tradeRouter.get("/api/trade/:id", authenticateToken, getTradeRequest);
  tradeRouter.post("/api/trade/choice/:id", authenticateToken, userTradeChoice);
  tradeRouter.post("/api/trade/request", authenticateToken, userTradeRequest);
  
  export default tradeRouter;
  