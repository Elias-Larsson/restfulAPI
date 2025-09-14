import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body; 

    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "User not found" }); 
      return;
    }

    if (!(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: "Password or email is incorrect" });
      return;
    }

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET!);

    res.status(200).json({ 
      message: "Login successful", 
      accessToken 
    });
  } catch (error) {
    console.error('Login error:', error); 

    res.status(500).json({ message: "Error logging in" });
  }
};

export default { login };