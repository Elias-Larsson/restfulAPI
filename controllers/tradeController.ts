import { Request, Response } from "express";
import Item from "../models/item";
import User from "../models/user";
import { UserRequest } from "../types";
import { Types } from "mongoose";
import tradeRequest from "../models/tradeRequest";

const userTradeRequest = async (req: UserRequest, res: Response): Promise<void> => { 
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
    if(recipient.tradeRequest.length >= 1) {
      res.status(400).json({ message: "This user has the maximum amount of trade requests at a time" });
      return;
    }

    const trade = new tradeRequest({
      recipient_id: recipient._id,
      requester_id: requester._id,
      request_item: req.body.request_item,
      offer_item: req.body.offer_item,
    });  

    if (!requester.ownedItems.includes(req.body.offer_item)) {
      res.status(400).json({ message: "You do not own the item you are offering" });
      return;
    }

    if (!recipient.ownedItems.includes(req.body.request_item)) {
      res.status(400).json({ message: "Recipient does not own the requested item" });
      return;
    }

    recipient.tradeRequest.push(trade._id);
    await trade.save();
    await recipient.save();
    res.json({ message: "Trade request sent", trade });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
}

const userTradeChoice = async (req: UserRequest, res: Response) => {
  try {
    const choice_value = req.body.choice_value;

    if (!choice_value) {
      res.status(404).json({ message: "Choice request not found" });
      return;
    }
    const trade = await tradeRequest.findById(req.params.id);

    if (!trade) {
      res.status(404).json({ message: "Trade request not found"});
      return;
    }

    const requester = await User.findById(trade.requester_id);
    const recipient = await User.findById(trade.recipient_id);

    if (!requester) {
      res.status(404).json({ message: "Requester not found" });
      return;
    }

    if (!recipient) {
      res.status(404).json({ message: "Recipient not found" });
      return;
    }

    if (choice_value) {
      recipient.ownedItems = recipient.ownedItems.filter(
        (item) => !item.equals(trade.request_item)
      );
      requester.ownedItems = requester.ownedItems.filter(
        (item) => !item.equals(trade.offer_item)
      );
      recipient.tradeRequest = recipient.tradeRequest.filter(
        (item) => !item.equals(trade._id));

      recipient.ownedItems.push(trade.offer_item);
      requester.ownedItems.push(trade.request_item);

      await recipient.save();
      await requester.save();
      await trade.deleteOne();
      
      res.json({ message: "Trade accepted and completed" });
    } else {
      await trade.deleteOne();
      res.json({ message: "Trade rejected and deleted" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getTradeRequest = async (req: UserRequest, res: Response) => {  
  try {
    const trade = await tradeRequest.findById(req.params.id);

    if (!trade) {
      res.status(404).json({ message: "Trade request not found" });
      return;
    }

    res.json(trade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
}

export { userTradeRequest, userTradeChoice, getTradeRequest};
