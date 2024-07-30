import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { authRoute } from "./routes/authRoute";

const app = express();
dotenv.config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

//Route
app.use("/auth", authRoute);

// MongoDB connection
mongoose
  .connect(MONGO_URI!)
  .then(() => {
    console.log("MongoDB is connected successfully...");
  })
  .catch((err) => console.log("MongoDB not connected", err));

//Listen
app.listen(PORT, () => {
  console.log(`server is running on Port ${PORT}...`);
});
