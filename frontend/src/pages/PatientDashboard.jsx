import React, { useEffect, useState } from "react";
import { FaUserMd, FaCalendarAlt, FaClock, FaSignOutAlt, FaCog, FaSearch, FaUser } from "react-icons/fa";

const PatientDashboard = () => {
  const [patientName, setPatientName] = useState("Patient");
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctors] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const fetchPatientDetails = async () => {
        try {
          const response = await fetch("https://doctor-appointmentbookingsystem.onrender.com/api/patient", {
            headers: { "Authorization": `Bearer ${token}` },
          });
          const data = await response.json();
          if (response.ok) {
            setPatientName(data.name);
          }
        } catch (error) {
          console.error("Error fetching patient details", error);
        }
      };
      fetchPatientDetails();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetch("http://localhost:5001/api/my-appointments", {
        headers: { "Authorization": `Bearer ${token}` },
      })
        .then(response => response.json())
        .then(data => setAppointments(data))
        .catch(error => console.error("Error fetching appointments:", error));
    }
  }, [token]);

  const searchDoctors = async () => {
    if (!searchTerm.trim()) return; // Prevent empty searches

    if (token) {
      try {
        const queryParams = new URLSearchParams({ name: searchTerm });
        const response = await fetch(`https://doctor-appointmentbookingsystem.onrender.com/api/doctors?${queryParams}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }

        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error searching doctors:", error);
      }
    }
  };
  

  const cancelAppointment = (id) => {
    if (token) {
      fetch(`https://doctor-appointmentbookingsystem.onrender.com/api/appointments/cancel/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      })
        .then(() => setAppointments(appointments.filter(appt => appt.id !== id)))
        .catch(error => console.error("Error canceling appointment:", error));
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white p-6 shadow-lg">
        <div className="flex items-center mb-6">
          <FaUser className="text-3xl text-blue-500 mr-2" />
          <h2 className="text-xl font-bold">Patient Portal</h2>
        </div>
        <ul>
          <li className="mb-2 flex items-center"><FaSearch className="mr-2" /><a href="#" className="text-blue-500">Search Doctors</a></li>
          <li className="mb-2 flex items-center"><FaCalendarAlt className="mr-2" /><a href="#" className="text-gray-700">My Appointments</a></li>
          <li className="mb-2 flex items-center"><FaClock className="mr-2" /><a href="#" className="text-gray-700">Upcoming Sessions</a></li>
          <li className="mb-2 flex items-center"><FaCog className="mr-2" /><a href="#" className="text-gray-700">Settings</a></li>
        </ul>
        <button className="w-full mt-4 py-2 bg-blue-500 text-white rounded-lg flex items-center justify-center">
          <FaSignOutAlt className="mr-2" /> Log Out
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Welcome, {patientName}</h1>
        <p className="mb-4">Search for doctors, book, or cancel appointments.</p>
        
        {/* Search Doctor */}
        <div className="bg-white p-6 shadow-md rounded-lg mb-4">
        <h2 className="text-xl font-semibold mb-2">Search for a Doctor</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter doctor's name or specialty"
            className="flex-1 p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded flex items-center"
            onClick={searchDoctors}
          >
            <FaSearch className="mr-2" /> Search
          </button>
        </div>
      </div>

      {/* Display Search Results */}
      {doctors.length > 0 && (
        <div className="bg-white p-6 shadow-md rounded-lg mt-4">
          <h2 className="text-xl font-semibold mb-2">Search Results</h2>
          <ul>
            {doctors.map((doctor) => (
              <li key={doctor._id} className="border-b p-2">
                <strong>{doctor.name}</strong> - {doctor.specialty} - {doctor.location?.city}
              </li>
            ))}
          </ul>
        </div>
      )}
        {/* Upcoming Appointments */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Upcoming Appointments</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Doctor</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Time</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map(appt => (
                  <tr key={appt.id}>
                    <td className="border p-2">{appt.doctorName}</td>
                    <td className="border p-2">{appt.date}</td>
                    <td className="border p-2">{appt.time}</td>
                    <td className="border p-2">
                      <button className="bg-red-500 text-white py-1 px-3 rounded" onClick={() => cancelAppointment(appt.id)}>Cancel</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="border p-2 text-center">No upcoming appointments</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;