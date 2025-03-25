import { Request, Response } from "express";
import Item from "../models/item";
import User from "../models/user";
import { UserRequest } from "../types";
import { Types } from "mongoose";
import tradeRequest from "../models/tradeRequest";

const userTradeRequest = async (req: UserRequest, res: Response) => {
     try {
        const item = await Item.findById(req.params.id);
    
        if (!item) {
          res.status(404).json({ message: "Item not found" });
          return;
        }
    
        res.json(item);
      } catch (error) {
        res.status(500).json({ message: "Error getting item" });
      }

}

export {userTradeRequest}