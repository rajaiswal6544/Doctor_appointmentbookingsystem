import React from "react";
import { FaCalendarAlt, FaClock, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { cancelAppointment } from "../slices/appointmentsSlice";
import moment from "moment";

const AppointmentsList = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments.list);

  const handleCancel = (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      dispatch(cancelAppointment(appointmentId));
    }
  };

  const formatDoctorName = (name) => {
    return name.replace(/^Dr\.\s*/i, "Dr.");
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mt-4">
      <h2 className="text-2xl font-semibold mb-4">My Appointments</h2>
      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments booked yet.</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li
              key={appointment.id}
              className="flex justify-between items-center p-4 border-b last:border-none"
            >
              <div>
                <p className="text-lg font-semibold">
                  {formatDoctorName(appointment.doctor.name)}
                </p>
                <p className="text-gray-600 flex items-center">
                  <FaCalendarAlt className="mr-2 text-blue-500" />
                  {moment(appointment.date).format("MMMM D, YYYY")}
                </p>
                <p className="text-gray-600 flex items-center">
                  <FaClock className="mr-2 text-blue-500" />
                  {moment(appointment.timeSlot, "HH:mm").format("h:mm A")}
                </p>
              </div>
              <button
                onClick={() => handleCancel(appointment.id)}
                className="bg-red-500 text-white px-4 py-2 rounded flex items-center hover:bg-red-600"
              >
                <FaTimes className="mr-2" /> Cancel
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppointmentsList;
