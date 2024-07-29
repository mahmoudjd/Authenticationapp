import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUser = async (req: Request | any, res: Response) => {
  const { user } = req.user;
  try {
    const userInfo = await User.findOne({ _id: user._id });
    if (!userInfo) {
      return res.status(404).json({
        error: true,
        message: "not found User",
      });
    }
    return res.status(201).json({
      user: userInfo,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

export const signup = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    bcrypt.hash(password, 10).then(async (hash) => {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hash,
      });

      const token = jwt.sign({ user }, process.env.SECRET_TOKEN!, {
        expiresIn: "1d",
      });

      return res.status(200).json({
        user,
        token,
      });
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "internal server error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "not found email",
      });
    }
    bcrypt.compare(password, user.password, (error, response) => {
      if (response) {
        const token = jwt.sign({ user }, process.env.SECRET_TOKEN!, {
          expiresIn: "1d",
        });

        return res.status(201).json({
          user,
          token,
        });
      } else {
        return res.json({
          error: true,
          message: "password is incorrect",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};
