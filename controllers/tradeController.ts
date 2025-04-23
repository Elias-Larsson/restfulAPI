import { Request, Response } from "express";
import Item from "../models/item";
import User from "../models/user";
import { UserRequest } from "../types";
import { Types } from "mongoose";
import tradeRequest from "../models/tradeRequest";

const userTradeRequest = async (req: UserRequest, res: Response) => { 
  try {
    const requester = await User.findById(req.user._id);
    const recipient = await User.findById(req.body.recipient_id);

    if (!requester) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (!recipient) {
      res.status(404).json({ message: "Recipient not found" });
      return;
    }

    const trade = new tradeRequest({
      recipient_id: recipient._id,
      requester_id: requester._id,
      request_items: req.body.request_items,
      offer_items: req.body.offer_items,
    });  
     
    
    if (!trade || !trade.offer_items || !trade.request_items) {
      res.status(400).json({message: "missing trade items"})
    }
    
    recipient.tradeRequest.push(trade._id);
    res.json(trade);
    await recipient.save();
  } catch (error) {}
};

export { userTradeRequest };
