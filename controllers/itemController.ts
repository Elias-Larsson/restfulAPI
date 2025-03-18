import {Request, Response} from "express";
import Item from "../models/item";

const createItem = async (req: Request, res: Response) => {
const item = await Item.create(req.body);
item.save();
res.status(201).send(item);
};
const getItem = async (req: Request, res: Response) => {

};

const getItems = async (req: Request, res: Response) => {

};

export {createItem, getItem, getItems};