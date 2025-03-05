import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API URL
const API_URL = "https://doctor-appointmentbookingsystem.onrender.com/api/doctors/set-availability";

// Fetch doctor's availability
export const fetchAvailability = createAsyncThunk(
  "availability/fetchAvailability",
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch availability");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update doctor's availability
export const updateAvailability = createAsyncThunk(
  "availability/updateAvailability",
  async ({ token, availability }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ availability }),
      });

      if (!response.ok) {
        throw new Error("Failed to update availability");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const availabilitySlice = createSlice({
  name: "availability",
  initialState: {
    availability: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch availability
      .addCase(fetchAvailability.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAvailability.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.availability = action.payload;
      })
      .addCase(fetchAvailability.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Update availability
      .addCase(updateAvailability.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAvailability.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.availability = action.payload;
      })
      .addCase(updateAvailability.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default availabilitySlice.reducer;
