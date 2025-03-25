import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserRequest } from "../types";

function authenticateToken(
  req: UserRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res
      .status(401)
      .json({ message: "You must be logged in to access this route" });
    return;
  }
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, payload) => {
      if (err || !payload || typeof payload === "string") {
        res
          .status(403)
          .json({ message: "You are not authorized to access this route" });
        return;
      }

      req.user = payload.user;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error authenticating token" });
  }
}
export default authenticateToken;
