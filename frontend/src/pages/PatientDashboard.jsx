import React from "react";
import { FaUserMd, FaCalendarAlt, FaClock, FaSignOutAlt, FaCog, FaSearch, FaUser } from "react-icons/fa";

const PatientDashboard = () => {
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
        <h1 className="text-3xl font-bold mb-4">Welcome, Patient</h1>
        <p className="mb-4">Search for doctors, book, or cancel appointments.</p>
        
        {/* Search Doctor */}
        <div className="bg-white p-6 shadow-md rounded-lg mb-4">
          <h2 className="text-xl font-semibold mb-2">Search for a Doctor</h2>
          <input type="text" placeholder="Enter doctor's name or specialty" className="w-full p-2 border rounded mb-2" />
          <button className="bg-blue-500 text-white py-2 px-4 rounded flex items-center">
            <FaSearch className="mr-2" /> Search
          </button>
        </div>

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
              <tr>
                <td className="border p-2">Dr. John Doe</td>
                <td className="border p-2">2023-07-15</td>
                <td className="border p-2">10:00 AM</td>
                <td className="border p-2">
                  <button className="bg-red-500 text-white py-1 px-3 rounded">Cancel</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
