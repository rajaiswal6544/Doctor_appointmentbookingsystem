import express from "express";
import { getDoctorAppointments, setAvailability } from "../controller/doctorController.js";
import { auth } from "../middleware/authMiddleware.js";
const router = express.Router();

// Route for doctors to set availability

router.put("/set-availability", auth, setAvailability);
router.get("/doctor/appointments", auth, getDoctorAppointments);
export default router;