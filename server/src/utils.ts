import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyUser = async (
  req: Request | any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(" ")[1];
    if (!token) return res.status(401).json("not token available");

    const payload = await jwt.verify(token, process.env.SECRET_TOKEN!);

    const { user } = payload as any;
    if (!user) {
      return res.send("invalid token provided");
    }
    req.user = { user };
    next();
  } catch (error) {
    console.log(error);
  }
};
