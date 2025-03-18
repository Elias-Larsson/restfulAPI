import {Request, Response} from "express";
import User from "../models/user";
import testUser from "../models/user";
// titta error meddelanden
// ta bort node_modules och lägg tillbaks

const getUser = async (req: Request, res: Response) => {
try {

const user = await User.findById(req.params.id);
 if (!user) {
     res.status(404).send().json({message:"User not found"});
     return
 }
res.json(user);
} catch (error) {
res.status(500).send(error);
}
};

const getUsers = async (req: Request, res: Response) => {
  res.json(User);
};
// Paginate, search, sort och filter users. Titta på mongoose-example från torsdag lektion.

//Create User
const createUser = async (req: Request, res: Response) => {
    try{
        const user = await User.create(req.body);
        await user.save();
        res.status(201).send(user);
    } catch(error) {
        res.status(400).send(error);
    }
};

//Update User
const updateUser = async (req: Request, res: Response) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true})
        if(!user) {
            res.status(404).send();
            return
        }
        res.send(user);
        } catch(error){
            res.status(400).send(error);
        }

};
//Delete User
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

export {getUser, getUsers, createUser, updateUser, deleteUser};