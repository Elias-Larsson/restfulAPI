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
    res.status(500).json({ message: "User not created" });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Error fetching user" });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const user = await User.find({});
    if (!user) {
      res.status(404).json({ message: "No users found" });
      return;
    }
    console.log(typeof user);

    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const filterUsers = async (req: Request, res: Response) => {
  try {
    const { searchQuery } = req.query;

    if (!searchQuery || typeof searchQuery !== "string") {
      res.status(400).json({ message: "Missing starting letter or invalid starting letter" });
      return;
    }

    const users = await User.find({ name: { $regex: `^${searchQuery}`, $options: "i" } });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error);
    return;
  }
};


const updateUser = async (req: UserRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(400).json({ message: "User information is missing" });
      return;
    }
    
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404).json({ message: "You must be logged in to update user information" });
      return;
    }

    if (req.body.name) {
      user.name = req.body.name;
    }

    if (req.body.email) {
      user.email = req.body.email;
    }

    if (req.body.password) {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(req.body.password, salt);
    }
    
    
    await user.save()
    res.status(200).json({ message: "User updated", updatedUser: user });
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteUser = async (req: UserRequest, res: Response) => {
  try {

    if (!req.user) {
      res.status(404).json({ message: "Could not find user" });
      return;
    }
    const user = await User.findByIdAndDelete(req.user._id);
    
    if (!user) {
      res.status(404).json({ message: "You must be logged in to delete current user" });
      return;
    }

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).send(error);
    return;
  }
};
export { getUser, getUsers, createUser, updateUser, deleteUser, filterUsers };
