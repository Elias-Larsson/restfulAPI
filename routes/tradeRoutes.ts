import {userTradeChoice, userTradeRequest} from "../controllers/tradeController";
  import express, { Router, Express, Request, Response } from "express";
  import authenticateToken from "../middleware/auth";
  
  const tradeRouter = Router();
  
  tradeRouter.get("/api/trade/:id", authenticateToken);
  tradeRouter.post("/api/trade/choice/:id", authenticateToken, userTradeChoice);
  tradeRouter.post("/api/trade/request", authenticateToken, userTradeRequest);
  
  export default tradeRouter;
  