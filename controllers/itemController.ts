import { Request, Response } from "express";
import Item from "../models/item";
import User from "../models/user";
import { UserRequest } from "../types";
import { Types } from "mongoose";

const createItem = async (req: UserRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(404).json({ message: "Could not find user" });
      return;
    }
    
    const user = await User.findById(req.user._id);

    if (!user) {
      res
        .status(401)
        .json({ message: "You must be logged in to create an item" });
      return;
    }

    const { itemName, value, rarity } = req.body;

    if (!itemName || !value || !rarity) {
      res.status(400).json({ message: "Missing itemName, value, or rarity" });
      return;
    }

    const updatedMoney = user.money - value;

    if (updatedMoney < 0) {
      res.status(400).json({ message: "Not enough money" });
      return;
    }

    const item = await Item.create({
      itemName,
      value,
      rarity,
      creatorId: user._id,
    });

    user.money = updatedMoney;

    await user.save();

    res.status(201).json({ message: "Item created", item });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Item not created" });
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
    res.status(500).json({ message: "Error getting item" });
  }
};

const getItems = async (req: Request, res: Response) => {
  try {
    const item = await Item.find({});

    if (!item) {
      res.status(404).json({ message: "no items not found" });
      return;
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Error getting items" });
  }
};

const lootbox = async (req: UserRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(404).json({ message: "Could not find user" });
      return;
    }

    const user = await User.findById(req.user._id);

    if (!user) {
        res
        .status(401)
        .json({ message: "You must be logged in to open a loot box" });
        return;
    }

    const items = await Item.find({});

    if (items.length === 0) {
      res.status(403).json({ message: "No items available" });
      return;
    }

    const availableItems = items.filter(
      (item) => !user.ownedItems.includes(item._id)
    );

    if (availableItems.length === 0) {
        res.status(400).json({ message: "You already own all items" });
        return;
    }

    // Find a random item that the user doesn't already own
    const randomItem =
      availableItems[Math.floor(Math.random() * availableItems.length)];

    // add the item to the users owned items
    const randomItemId = new Types.ObjectId(randomItem._id);
    if (user.money -100 < 0) {
        res.status(200).json({message: "You don't have enough money"})
        return;
    }
    
    user.money -= 100;
    user.ownedItems.push(randomItemId);

    await user.save();

    res.json({
      message: "🎁 You opened the loot box and got an item!",
      item: randomItem,
    });
  } catch (error) {
    res.status(500).json({ message: "Error opening loot box" });
  }
};

export { createItem, getItem, getItems, lootbox };
