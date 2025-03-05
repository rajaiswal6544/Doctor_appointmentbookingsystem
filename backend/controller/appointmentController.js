import { Appointment } from "../models/Appointment.js";
import mongoose from "mongoose";
import { sendAppointmentEmail, sendCancellationEmail } from "../utils/emailService.js";
import { User } from "../models/User.js";

export const bookAppointment = async (req, res) => {
    try {
        const { doctorId, date, timeSlot } = req.body;
        const patientId = req.user._id; // Use _id instead of id

        // Check if the user is a patient
        if (req.user.role !== "patient") {
            return res.status(403).json({ message: "Only patients can book appointments" });
        }

        // Check if doctor exists
        const doctor = await User.findById(doctorId);
        if (!doctor || doctor.role !== "doctor") {
            return res.status(404).json({ message: "Doctor not found" });
        }

        // Check if the requested time slot is available
        const isSlotAvailable = doctor.availability.some(slot => 
            slot.day === new Date(date).toLocaleString('en-US', { weekday: 'long' }) &&
            slot.startTime <= timeSlot && 
            slot.endTime >= timeSlot
        );

        if (!isSlotAvailable) {
            return res.status(400).json({ message: "Selected time slot is not available" });
        }

        // Check if the slot is already booked
        const existingAppointment = await Appointment.findOne({ doctorId, date, timeSlot });
        if (existingAppointment) {
            return res.status(400).json({ message: "Slot already booked" });
        }

        // Create a new appointment
        const appointment = new Appointment({ doctorId, patientId, date, timeSlot });
        await appointment.save();

        // Send Email Notification
        await sendAppointmentEmail(req.user.email, doctor.name, date, timeSlot);

        res.status(201).json({ message: "Appointment booked successfully, email sent" });
    } catch (error) {
        console.error("Error booking appointment:", error);
        res.status(500).json({ message: "Error booking appointment" });
    }
};

export const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const patientId = req.user._id;

        // Find the appointment
        const appointment = await Appointment.findOne({ _id: appointmentId, patientId });

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found or unauthorized" });
        }

        // Fetch doctor & patient details
        const doctor = await User.findById(appointment.doctorId);

        // Delete the appointment
        await Appointment.findByIdAndDelete(appointmentId);

        // Send Cancellation Email
        await sendCancellationEmail(req.user.email, doctor.name, appointment.date, appointment.timeSlot);
        await sendCancellationEmail(doctor.email, req.user.name, appointment.date, appointment.timeSlot);

        res.status(200).json({ message: "Appointment canceled successfully, email sent" });
    } catch (error) {
        console.error("Error canceling appointment:", error);
        res.status(500).json({ message: "Error canceling appointment" });
    }
};

export const getPatientAppointments = async (req, res) => {
    try {
        const patientId = req.user._id;

        // Fetch appointments for the logged-in patient
        const appointments = await Appointment.find({ patientId }).populate("doctorId", "name");

        res.status(200).json(appointments);
    } catch (error) {
        console.error("Error fetching patient appointments:", error);
        res.status(500).json({ message: "Error fetching patient appointments" });
    }
};
