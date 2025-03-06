import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["doctor", "patient"], required: true },
  specialty: { type: String, index: true }, // Only for doctors
  experience: { type: Number }, // Only for doctors
  location: {
    city: { type: String, index: true },
    state: { type: String, index: true },
  },
  availability: [
    {
      day: { type: String, index: true },
      startTime: String,
      endTime: String,
      consultLocations: [{ type: String, index: true }], // New field for locations
    },
  ],
});

// Add separate indexes for efficient querying
UserSchema.index({ name: "text" }); // Name search (Full-text)
UserSchema.index({ specialty: 1, "location.city": 1 }); // Filtering

// Validation for doctors
UserSchema.pre("save", function (next) {
    if (this.role === "doctor") {
      if (!this.specialty || !this.experience || !this.location) {
        return next(new Error("Doctors must have a specialty, experience, and location"));
      }
    }
    next();
  });

export const User = mongoose.model("User", UserSchema);
