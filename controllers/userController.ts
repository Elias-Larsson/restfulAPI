import {Request, Response} from "express";
import User from "../models/user";

const createUser = async (req: Request, res: Response) => {
    try{
        const user = await User.create(req.body);
        await user.save();
        res.status(201).send(user);
    } catch(error) {
        res.status(400).send(error);
    }
};

const getUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).send();
            return
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateUser = async (req: Request, res: Response) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id)
        if(!user) {
            res.status(404).send();
            return
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
        res.status(404).send();
        return
    }
    } catch(error){
        res.status(500).send(error)
        return
    }
};

export {createUser, updateUser, deleteUser, getUser};