import {Request, Response} from "express";
import User from "../models/user";
const getUser = async (req: Request, res: Response) => {
    try{
        const user = await User.findById(req.params.id);
    if(!user) {
        return res.status(404).send();
    }
    res.send(user);
    } catch(error){
        res.status(500).send(error);
    }
};
const createUser = async (req: Request, res: Response) => {
    try{
        const user = await User.create(req.body);
        await user.save();
        res.status(201).send(user);
    } catch(error) {
        res.status(400).send(error);
    }
};
const updateUser = async (req: Request, res: Response) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id)
        if(!user) {
            return res.status(404).send();
        }
        res.send(user);
        } catch(error){
            res.status(400).send(error);
        }

};

const deleteUser = async (req: Request, res: Response) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return res.status(404).send();
    }
    } catch(error){
        return res.status(500).send(error)
    }
};

export {createUser, updateUser, deleteUser, getUser};