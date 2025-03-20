import { Request, Response } from "express";
import Item from "../models/item";
import User from "../models/user";
import { UserRequest } from "../types";
import { Types } from "mongoose";

const createItem = async (req: Request, res: Response) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json({ message: "Item created" });
  } catch (error) {
    res.status(400).json({ message: "Item not created" });
  }
};

const getItem = async (req: Request, res: Response) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      res.status(404).json({ message: "Item not found" });
      return;
    }
    res.json(item);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getItems = async (req: Request, res: Response) => {
  const item = await Item.find({});
  res.json(item);
};

const lootbox = async (req: UserRequest, res: Response) => {
  try {
    // Fetch all items
    const items = await Item.find({});
    if (items.length === 0) {
      return res.status(404).json({ message: "No items available" });
    }

    // Fetch user details
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).json({ message: "You must be logged in to open a loot box" });
    }

    // Jonas kod TA BORT 
    // if (!Array.isArray(user.ownedItems)) {
    //     user.ownedItems = [];
    // } else {
    //     user.ownedItems = user.ownedItems.filter(item => item !== null);
    // }

    await user.save();
    // Filter out the items the user already owns
    const availableItems = items.filter(item => !user.ownedItems.includes(item._id));
    console.log("item ids:", user.ownedItems);
    console.log("Available Items:", availableItems);
    console.log("All Items:", items);
    if (availableItems.length === 0) {
      return res.status(404).json({ message: "You already own all items" });
    }

    // Select a random item from available ones
    const randomItem = availableItems[Math.floor(Math.random() * availableItems.length)];

    // Add the new item to the user's owned items and save
    const objectId = new Types.ObjectId(randomItem._id);
    user.ownedItems.push(objectId);
    await user.save();

    // Return response
    res.json({
      message: "🎁 You opened the loot box and got an item!",
      item: randomItem,
    });

  } catch (error) {
    console.error("Lootbox error:", error);
    res.status(500).json({ message: "Error opening loot box" });
  }
};


export { createItem, getItem, getItems, lootbox };
