import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;  // Destructured for clarity

    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "User not found" });  // Use 401 for all auth errors (security)
      return;
    }

    if (!(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: "Password or email is incorrect" });
      return;
    }

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET!);

    res.status(200).json({ 
      message: "Login successful",  // Optional: Add for consistency
      accessToken 
    });
  } catch (error) {
    console.error('Login error:', error);  // Better logging

    res.status(500).json({ message: "Error logging in" });
  }
};

export default { login };