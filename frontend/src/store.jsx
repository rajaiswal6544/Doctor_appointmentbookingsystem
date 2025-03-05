import { configureStore } from "@reduxjs/toolkit";
import patientReducer from "./slices/patientSlice";
import appointmentsReducer from "./slices/appointmentsSlice";
import doctorsReducer from "./slices/doctorsSlice";
import bookAppointmentReducer from "./slices/appointmentsSlice";
import userSliceReducer from "./slices/userSlice"; // Corrected import
import availabilityReducer from "./slices/availabilitySlice";
const store = configureStore({
  reducer: {
    bookAppointment: bookAppointmentReducer,
    patient: patientReducer,
    appointments: appointmentsReducer,
    doctors: doctorsReducer,
    user: userSliceReducer,
    availability: availabilityReducer, // Added userSliceReducer correctly
  },
});

export default store;
