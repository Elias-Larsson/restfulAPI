import { Request, Response } from "express";
import Item from "../models/item";
import User from "../models/user";
import { UserRequest } from "../types";
import { Types } from "mongoose";
import tradeRequest from "../models/tradeRequest";

const userTradeRequest = async (req: UserRequest, res: Response) => {
  try {
    const trade = new tradeRequest({
      requestItems: req.body.requestItems,
      giveItems: req.body.giveItems,
    });

    if (!trade || !trade.giveItems || !trade.requestItems) {
        res.status(400).json({message: "missing trade items"})
    }

    await trade.save();
  } catch (error) {}
};

export { userTradeRequest };
