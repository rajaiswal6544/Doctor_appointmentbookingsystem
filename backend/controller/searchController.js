import { User } from "../models/User.js";

export const searchDoctors = async (req, res) => {
  try {
    const { specialty, city, name } = req.query;

    const query = { role: "doctor" }; // Filter only doctors

    if (specialty) {
      query.specialty = { $regex: new RegExp(specialty, "i") }; // Case-insensitive specialty match
    }
    if (city) {
      query["location.city"] = { $regex: new RegExp(city, "i") }; // Case-insensitive city match
    }
    if (name) {
      query.name = { $regex: new RegExp(name, "i") }; // Case-insensitive name search
    }

    const doctors = await User.find(query).select("name specialty experience location availability");

    res.json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Error fetching doctors", error: error.message });
  }
};
