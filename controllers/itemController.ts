import {Request, Response} from "express";
import Item from "../models/item";

const createItem = async (req: Request, res: Response) => {
    try{
        const item = await Item.create(req.body);
        res.status(201).json({message:"Item created"});
    } catch(error) {
        res.status(400).json({message:"Item not created"});
    }
};
const getItem = async (req: Request, res: Response) => {
    try {
        const item = await Item.findById(req.params.id);
         if (!item) {
             res.status(404).send().json({message:"Item not found"});
             return
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





const getLootbox = async (req: Request, res: Response) => {
    try {
        const items = await Item.find({});
        if (items.length === 0) {
            res.status(404).json({ message: "No items available" });
            return;
        }
        const randomItem = items[Math.floor(Math.random() * items.length)];
        res.json({
            message: "🎁 You opened the loot box and got an item!",
            item: randomItem
        });
    } catch (error) {
        res.status(500).json({ message: "Error opening loot box" });
    }
};


export {createItem, getItem, getItems, getLootbox};