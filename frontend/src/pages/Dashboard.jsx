import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserMd, FaCalendarAlt, FaClock, FaHospital, FaSignOutAlt, FaCog, FaUser } from "react-icons/fa";
import { getDoctorAppointments } from "../slices/doctorsSlice";
import { fetchUserProfile } from "../slices/userSlice";

const DoctorDashboard = ({ token }) => {
  const authToken = token || localStorage.getItem("token");
  const dispatch = useDispatch();
  const doctor = useSelector((state) => state.user.user);
  const { appointments, appointmentsStatus, appointmentsError } = useSelector((state) => state.doctors);

  useEffect(() => {
    if (authToken) {
      dispatch(fetchUserProfile(authToken));
      dispatch(getDoctorAppointments({ token: authToken }));
    }
  }, [dispatch, authToken]);

  if (!doctor) return <p className="text-center text-gray-600">Loading doctor details...</p>;

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-72 bg-white p-6 shadow-lg flex flex-col items-center">
        <FaUserMd className="text-4xl text-blue-500 mb-4" />
        <h2 className="text-xl font-bold">{doctor?.name}</h2>
        <p className="text-sm text-gray-500 mb-6">{doctor?.specialty}</p>
        <ul className="w-full">
          <li className="mb-4 py-2 px-4 flex items-center rounded-lg hover:bg-blue-100 cursor-pointer">
            <FaHospital className="mr-2 text-blue-500" /> <a href="#">Dashboard</a>
          </li>
          <li className="mb-4 py-2 px-4 flex items-center rounded-lg hover:bg-blue-100 cursor-pointer">
            <FaClock className="mr-2 text-gray-700" /> <a href="/updateAvailability">Manage Availability</a>
          </li>
          <li className="mb-4 py-2 px-4 flex items-center rounded-lg hover:bg-blue-100 cursor-pointer">
            <FaUser className="mr-2 text-gray-700" /> <a href="#">My Patients</a>
          </li>
          <li className="mb-4 py-2 px-4 flex items-center rounded-lg hover:bg-blue-100 cursor-pointer">
            <FaCog className="mr-2 text-gray-700" /> <a href="#">Settings</a>
          </li>
        </ul>
        <button className="w-full mt-6 py-2 bg-red-500 text-white rounded-lg flex items-center justify-center hover:bg-red-600 transition">
          <FaSignOutAlt className="mr-2" /> Log Out
        </button>
      </div>

      <div className="flex-1 p-6">
        <div className="bg-white p-6 shadow-md rounded-lg mb-6">
          <h1 className="text-2xl font-bold">Welcome, {doctor?.name}!</h1>
          <p className="text-gray-600">Specialty: {doctor?.specialty}</p>
          <p className="text-gray-600">Experience: {doctor?.experience} years</p>
          <p className="text-gray-600">Location: {doctor?.location?.city}, {doctor?.location?.state}</p>
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">Upcoming Sessions</h2>
          {appointmentsStatus === "loading" ? (
            <p>Loading appointments...</p>
          ) : appointmentsError ? (
            <p className="text-red-500">{appointmentsError}</p>
          ) : appointments.length > 0 ? (
            <ul>
              {appointments.map((session) => (
                <li key={session._id} className="border-b py-3">
                  <p className="font-semibold">{new Date(session.date).toLocaleDateString()} at {session.timeSlot}</p>
                  <p className="text-gray-600">Patient: {session.patientId.name} ({session.patientId.email})</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No upcoming sessions.</p>
          )}
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-bold mb-4">Availability</h2>
          {doctor?.availability && doctor.availability.length > 0 ? (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border border-gray-300 p-2">Day</th>
                  <th className="border border-gray-300 p-2">Start Time</th>
                  <th className="border border-gray-300 p-2">End Time</th>
                  <th className="border border-gray-300 p-2">Location</th>
                </tr>
              </thead>
              <tbody>
                {doctor.availability.map((slot, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-2">{slot.day}</td>
                    <td className="border border-gray-300 p-2">{slot.startTime}</td>
                    <td className="border border-gray-300 p-2">{slot.endTime}</td>
                    <td className="border border-gray-300 p-2">{slot.consultLocations.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No availability set.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
