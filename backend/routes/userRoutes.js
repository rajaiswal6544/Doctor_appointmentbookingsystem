import express from "express";
import { registerUser, loginUser } from "../controller/userController.js";
import { searchDoctors } from "../controller/searchController.js";
import { bookAppointment, cancelAppointment } from "../controller/appointmentController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Doctor Search
router.get("/doctors", authenticate, searchDoctors);

// Appointment Booking
router.post("/appointments/book", authenticate, bookAppointment);
router.post("/appointments/cancel", authenticate, cancelAppointment);
export default router;
