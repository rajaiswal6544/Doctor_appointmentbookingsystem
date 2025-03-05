import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/User.js";
dotenv.config();

export const auth =  async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id; // Attach userId to the request
  
      // Verify user exists
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
  export const authenticate = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user; // Attach full user object
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};