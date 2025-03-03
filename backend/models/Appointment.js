import mongoose from "mongoose";
const AppointmentSchema = new mongoose.Schema({
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    status: { type: String, enum: ["booked", "canceled"], default: "booked" },
  });
  
  // Prevent double booking using a unique compound index
  AppointmentSchema.index({ doctorId: 1, date: 1, timeSlot: 1 }, { unique: true });
  
  export const Appointment = mongoose.model("Appointment", AppointmentSchema);
  