import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomePage from "./pages/Homepage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import DoctorDashboard from "./pages/Dashboard";
import PatientDashboard from "./pages/PatientDashboard";
import AvailabilityForm from "./components/AvailabilityForm";
import AppointmentsList from "./components/AppointmentsList";
function App() {
  return (
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Signup/>} />
            <Route path="/updateAvaialibility" element={<AvailabilityForm />} />
            <Route path="/doctorDashboard" element={<DoctorDashboard/>} />
            <Route path="/patientDashboard" element={<PatientDashboard/>} />
            <Route path="/appointmentList" element={<AppointmentsList/>} />
          </Routes>
        </div>
      </Router>
  
  );
}

export default App;
