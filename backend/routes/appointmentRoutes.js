import express from "express";
import { getPatientAppointments } from "../controller/appointmentController.js";
import { authenticate } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/my-appointments", authenticate, getPatientAppointments);

export default router;