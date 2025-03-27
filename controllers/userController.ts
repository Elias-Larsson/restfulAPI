import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import { UserRequest } from "../types";
const createUser = async (req: Request, res: Response) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    if (!user.name || !user.email || !user.password) {
      res.status(400).json({ message: "missing email, name or password" });
      return;
    }
    if (req.body.password.length < 6) {
      res
        .status(400)
        .json({ message: "password must be at least 6 characters" });
      return;
    }
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
  try {
    const user = await User.find({});
    if (!user) {
      res.status(404).json({ message: "No users found" });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUser = async (req: UserRequest, res: Response) => {
  try {
    const allowedUpdates = ["name", "email", "password"];

    const updates = Object.keys(req.body);

    const isValidOperation = updates.every((key) => allowedUpdates.includes(key));

    if (!isValidOperation) {
      console.log(updates)
      res.status(400).json({ message: "Invalid updates in request body" });
      return;
    }
    
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    });


    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const updatedUser = await User.findById(req.user._id);

    res.status(200).json({ message: "User updated", updatedUser });
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).send(error);
    return;
  }
};
export { getUser, getUsers, createUser, updateUser, deleteUser };
