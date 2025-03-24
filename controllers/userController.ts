import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";

const createUser = async (req: Request, res: Response) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    console.log(salt);
    console.log(hashedPassword);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(400).json({ message: "User not created" });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send().json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUsers = async (req: Request, res: Response) => {
  const user = await User.find({});
  res.json(user);
};

//Create User

//Update User
const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      res.status(404).send();
      return;
    }
    const updatedUser = await User.findById(req.params.id);
    res.status(200).json({ message: "User updated", updatedUser });
  } catch (error) {
    res.status(400).send(error);
  }
};
//Delete User
const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted" });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
  } catch (error) {
    res.status(500).send(error);
    return;
  }
};

export { getUser, getUsers, createUser, updateUser, deleteUser };
