import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Async thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (token, { rejectWithValue }) => {
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id; // Ensure your token contains `id`
      
      const response = await axios.get(
        `https://doctor-appointmentbookingsystem.onrender.com/api/profile/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Return structured user profile based on role
      const userData = response.data;
      if (userData.role === "doctor") {
        return {
          userId,
          name: userData.name,
          role: userData.role,
          specialty: userData.specialty,
          experience: userData.experience,
          location: userData.location,
          availability: userData.availability || [],
        };
      } else if (userData.role === "patient") {
        return {
          userId,
          name: userData.name,
          role: userData.role,
          email: userData.email,
        };
      } else {
        throw new Error("Invalid user role");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch user profile");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.user = jwtDecode(action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
