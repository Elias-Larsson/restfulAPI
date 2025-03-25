import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const login = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(404).json("User not found");
      return;
    }

    if (!(await bcrypt.compare(req.body.password, user.password))) {
      res.status(401).json("Password is incorrect");
      return;
    }

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET!);

    res.json({ accessToken: accessToken });
  } catch (error) {
    console.log(error);

    res.status(500).json("Error logging in");
  }
};

export default { login };
