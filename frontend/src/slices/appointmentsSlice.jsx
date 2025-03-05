import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to book an appointment
export const bookAppointment = createAsyncThunk(
  "appointments/bookAppointment",
  async ({ token, doctorId, date, timeSlot }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://doctor-appointmentbookingsystem.onrender.com/api/appointments/book",
        { doctorId, date, timeSlot },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Async thunk to fetch appointments
export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAppointments",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://doctor-appointmentbookingsystem.onrender.com/api/my-appointments",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch appointments");
    }
  }
);
// Async thunk to cancel an appointment
export const cancelAppointment = createAsyncThunk(
    "appointments/cancelAppointment",
    async ({ token, appointmentId }, { rejectWithValue }) => {
      try {
        console.log("Canceling appointment:", appointmentId);
        console.log("Using token:", token);
  
        const response = await axios.post(
          "https://doctor-appointmentbookingsystem.onrender.com/api/appointments/cancel",
          { appointmentId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        console.log("Response:", response.data);
        return appointmentId;
      } catch (error) {
        console.error("Cancel appointment error:", error.response?.data);
        return rejectWithValue(error.response?.data || "Failed to cancel appointment");
      }
    }
  );
  
  
  
const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: {
    list: [],
    appointment: null,
    status: "idle",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bookAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointment = action.payload;
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAppointments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        state.list = state.list.filter((appointment) => appointment.id !== action.payload);
      });
      
  },
});

export default appointmentsSlice.reducer;
