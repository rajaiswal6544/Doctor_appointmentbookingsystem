import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, specialty, experience, location } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      specialty: role === "doctor" ? specialty : undefined,
      experience: role === "doctor" ? experience : undefined,
      location,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "User not found" });
  
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(400).json({ message: "Invalid password" });
  
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
  
      res.json({ token, user });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  export const getUserProfile = async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Find user by ID, exclude password for security
      const user = await User.findById(userId).select("-password");
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Structure response based on user role
      if (user.role === "doctor") {
        return res.status(200).json({
          name: user.name,
          role: user.role,
          specialty: user.specialty,
          experience: user.experience,
          location: user.location,
          availability: user.availability || [],
        });
      } else if (user.role === "patient") {
        return res.status(200).json({
          name: user.name,
          role: user.role,
          email: user.email,
        });
      } else {
        return res.status(400).json({ message: "Invalid user role" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
   
