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
    const items = await Item.find({ });
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
      request_item: req.body.request_item,
      offer_item: req.body.offer_item,
    });  

    if (!trade || !trade.offer_item || !trade.request_item) {
      res.status(400).json({message: "missing trade items"})
      return;
    }

    
    //control check users own items
    const requesterOwnsOfferedItems = trade.offer_item.some( (item) => requester.ownedItems.includes(item) );
    const recipientOwnsRequestedItems = trade.request_item.some( (item) => recipient.ownedItems.includes(item) );

    if (!requesterOwnsOfferedItems || !recipientOwnsRequestedItems) {
      res.status(400).json({message: "You do not own the items you are offering/requesting"});
      return;
    }

    
    //control check if items are already owned by users 
    const requesterAlreadyOwnsRequestedItems = trade.request_item.some( (item) => requester.ownedItems.includes(item) );
    const recipientAlreadyOwnsOfferedItems = trade.offer_item.some( (item) => recipient.ownedItems.includes(item) );

    if(requesterAlreadyOwnsRequestedItems || recipientAlreadyOwnsOfferedItems) {
      res.status(400).json({message: "You cannot trade items you already own"});
      return;
    }

    res.json({message: "Trade request sent", trade});

    recipient.tradeRequest.push(trade._id);
    res.json(trade);

    await trade.save();
    await recipient.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { userTradeRequest };
