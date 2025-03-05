import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPatientDetails = createAsyncThunk(
  "patient/fetchPatientDetails",
  async (token) => {
    const response = await fetch("https://doctor-appointmentbookingsystem.onrender.com/api/patient", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data;
  }
);

const patientSlice = createSlice({
  name: "patient",
  initialState: { name: "Patient", status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPatientDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.name = action.payload.name;
      })
      .addCase(fetchPatientDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default patientSlice.reducer;
