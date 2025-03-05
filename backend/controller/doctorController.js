import { Appointment } from "../models/Appointment.js";
import { User } from "../models/User.js"; // Import the User model

// Controller for setting availability
export const setAvailability = async (req, res) => {
  try {
    const { userId } = req; // Extracted from auth middleware
    const { availability } = req.body;

    // Validate input structure
    if (!Array.isArray(availability)) {
      return res.status(400).json({ message: "Availability must be an array" });
    }

    // Check each entry for required fields
    for (const slot of availability) {
      if (!slot.day || !slot.startTime || !slot.endTime || !Array.isArray(slot.consultLocations)) {
        return res.status(400).json({ message: "Each availability slot must include day, startTime, endTime, and consultLocations (as an array)" });
      }
    }

    // Find the doctor
    const doctor = await User.findById(userId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    if (doctor.role !== "doctor") {
      return res.status(403).json({ message: "Only doctors can set availability" });
    }

    // Update availability
    doctor.availability = availability;
    await doctor.save();

    res.status(200).json({ message: "Availability updated successfully", availability: doctor.availability });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const getDoctorAppointments = async (req, res) => {
    try {
        const doctorId = req.userId; // Extracted from the token

        // Fetch doctor details to check role
        const doctor = await User.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        if (doctor.role !== "doctor") {
            return res.status(403).json({ message: "Access denied. Only doctors can view their appointments." });
        }

        // Fetch upcoming appointments for the logged-in doctor
        const today = new Date();
        const upcomingAppointments = await Appointment.find({
            doctorId,
            date: { $gte: today.toISOString().split("T")[0] } // Fetch appointments from today onwards
        })
        .populate("patientId", "name email") // Populate patient details
        .sort({ date: 1, timeSlot: 1 }); // Sort by date and time

        res.status(200).json(upcomingAppointments);
    } catch (error) {
        console.error("Error fetching doctor appointments:", error);
        res.status(500).json({ message: "Error fetching doctor appointments" });
    }
};