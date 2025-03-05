import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Search doctors API
export const searchDoctors = createAsyncThunk(
  "doctors/searchDoctors",
  async ({ token, searchTerm, specialty, location }) => {
    const queryParams = new URLSearchParams();
    if (searchTerm) queryParams.append("name", searchTerm);
    if (specialty) queryParams.append("specialty", specialty);
    if (location) queryParams.append("city", location);

    const response = await fetch(`https://doctor-appointmentbookingsystem.onrender.com/api/doctors?${queryParams}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch doctors");
    }

    return await response.json();
  }
);

// Fetch doctor's upcoming sessions
export const getDoctorAppointments = createAsyncThunk(
  "doctors/getDoctorAppointments",
  async ({ token }) => {
    const response = await fetch(`https://doctor-appointmentbookingsystem.onrender.com/api/doctors/doctor/appointments`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch doctor appointments");
    }

    return await response.json();
  }
);

const doctorsSlice = createSlice({
  name: "doctors",
  initialState: {
    list: [],
    appointments: [], // Stores doctor's upcoming sessions
    status: "idle",
    appointmentsStatus: "idle",
    error: null,
    appointmentsError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle doctor search
      .addCase(searchDoctors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchDoctors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(searchDoctors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Handle fetching doctor's upcoming appointments
      .addCase(getDoctorAppointments.pending, (state) => {
        state.appointmentsStatus = "loading";
      })
      .addCase(getDoctorAppointments.fulfilled, (state, action) => {
        state.appointmentsStatus = "succeeded";
        state.appointments = action.payload;
      })
      .addCase(getDoctorAppointments.rejected, (state, action) => {
        state.appointmentsStatus = "failed";
        state.appointmentsError = action.error.message;
      });
  },
});

export default doctorsSlice.reducer;
