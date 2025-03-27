import {userTradeRequest} from "../controllers/tradeController";
  import express, { Router, Express, Request, Response } from "express";
  import authenticateToken from "../middleware/auth";
  
  const tradeRouter = Router();
  
  tradeRouter.get("api/trade", authenticateToken);
  tradeRouter.post("api/trade", authenticateToken);
  tradeRouter.post("/api/trade/request", authenticateToken, userTradeRequest);
  
  export default tradeRouter;
  