import { User } from "../models/User.js"
export const searchDoctors = async (req, res) => {
    try {
      const { specialty, city, name } = req.query;
  
      const query = {};
      if (specialty) query.specialty = specialty;
      if (city) query["location.city"] = city;
      if (name) query.$text = { $search: name };
  
      const doctors = await User.find(query).select("name specialty experience location availability");
      res.json(doctors);
    } catch (error) {
        console.error("Error fetching doctors:", error);  // Log the error
        res.status(500).json({ message: "Error fetching doctors", error: error.message });
    }
  };
  