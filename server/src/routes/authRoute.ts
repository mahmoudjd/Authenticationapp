import express from "express";
import { getUser, signup, login } from "../controllers/authController";
import { verifyUser } from "../utils";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/get-user", verifyUser, getUser);

export { router as authRoute };
