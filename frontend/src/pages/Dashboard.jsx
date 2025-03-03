import React from "react";
import { FaUserMd, FaCalendarAlt, FaClock, FaHospital, FaSignOutAlt, FaCog, FaUser } from "react-icons/fa";

const DoctorDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white p-6 shadow-lg">
        <div className="flex items-center mb-6">
          <FaUserMd className="text-3xl text-blue-500 mr-2" />
          <h2 className="text-xl font-bold">Dashboard</h2>
        </div>
        <ul>
          <li className="mb-2 flex items-center"><FaHospital className="mr-2" /><a href="#" className="text-blue-500">Dashboard</a></li>
          <li className="mb-2 flex items-center"><FaCalendarAlt className="mr-2" /><a href="#" className="text-gray-700">My Appointments</a></li>
          <li className="mb-2 flex items-center"><FaClock className="mr-2" /><a href="#" className="text-gray-700">My Sessions</a></li>
          <li className="mb-2 flex items-center"><FaUser className="mr-2" /><a href="#" className="text-gray-700">My Patients</a></li>
          <li className="mb-2 flex items-center"><FaCog className="mr-2" /><a href="#" className="text-gray-700">Settings</a></li>
        </ul>
        <button className="w-full mt-4 py-2 bg-blue-500 text-white rounded-lg flex items-center justify-center">
          <FaSignOutAlt className="mr-2" /> Log Out
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Welcome, Doctor</h1>
        <p className="mb-4">Manage your availability, set consultation locations, and view appointments.</p>
        
        {/* Consultation Location & Availability */}
        <div className="bg-white p-6 shadow-md rounded-lg mb-4">
          <h2 className="text-xl font-semibold mb-2">Set Consultation Location</h2>
          <input type="text" placeholder="Enter location" className="w-full p-2 border rounded mb-2" />
          <h2 className="text-xl font-semibold mb-2">Update Availability</h2>
          <input type="datetime-local" className="w-full p-2 border rounded mb-2" />
          <button className="bg-blue-500 text-white py-2 px-4 rounded">Save</button>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Upcoming Appointments</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Session Title</th>
                <th className="border p-2">Scheduled Date</th>
                <th className="border p-2">Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">General Checkup</td>
                <td className="border p-2">2023-07-15</td>
                <td className="border p-2">10:00 AM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
