import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserRequest } from "../types";

function authenticateToken(req: UserRequest, res: Response,next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.sendStatus(401);
    return;
  }
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, payload) => {
      if (err || !payload || typeof payload === "string") {
        res.sendStatus(403);
        return;
      }

      req.user = payload.user;
      next();
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
export default authenticateToken;
// Kolla vad koden gör
