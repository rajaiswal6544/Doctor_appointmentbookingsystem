import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserMd, FaCalendarAlt, FaClock, FaSignOutAlt, FaCog, FaSearch, FaUser, FaPlus,FaTimes } from "react-icons/fa";
import { fetchAppointments, bookAppointment, cancelAppointment } from "../slices/appointmentsSlice";
import { searchDoctors } from "../slices/doctorsSlice";
import { fetchPatientDetails } from "../slices/patientSlice";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import {ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchUserProfile } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const patient = useSelector((state) => state.user.user);
  const appointments = useSelector((state) => state.appointments.list);
  const doctors = useSelector((state) => state.doctors.list);

  const [searchTerm, setSearchTerm] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const specialties = ["Cardiologist", "Dermatologist", "Neurologist", "Pediatrician"];
  const locations = ["New York", "Los Angeles", "Chicago", "Houston"];

  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile(token));
      dispatch(fetchAppointments(token));
    }
  }, [token, dispatch]);

  const handleSearch = () => {
    if (!searchTerm.trim() && !specialty && !location) {
      toast.warn("Please enter a search term or select filters.");
      return;
    }

    dispatch(searchDoctors({ token, searchTerm, specialty, location }));
    toast.info("Searching for doctors...");
  };

  const getWeekdayName = (date) => {
    return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
  };
  const generateTimeSlots = (startTime, endTime) => {
    const slots = [];
    let [startHour, startMinute] = startTime.split(":").map(Number);
    let [endHour, endMinute] = endTime.split(":").map(Number);
    while (startHour < endHour || (startHour === endHour && startMinute < endMinute)) {
      let formattedTime = `${String(startHour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}`;
      slots.push(formattedTime);
      startMinute += 30;
      if (startMinute >= 60) {
        startMinute = 0;
        startHour++;
      }
    }
    return slots;
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (!selectedDoctor) return;
    const weekday = getWeekdayName(date);
    const selectedDay = selectedDoctor.availability.find(
      (slot) => slot.day === weekday
    );
    setAvailableTimes(selectedDay ? generateTimeSlots(selectedDay.startTime, selectedDay.endTime) : []);
  };

  const handleBookAppointment = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTimeSlot) {
      toast.error("Please select a doctor, date, and time slot.");
      return;
    }
  
    const formattedDate = selectedDate.toLocaleDateString("en-CA");
  
    const appointmentData = {
      doctorId: selectedDoctor._id,
      date: formattedDate,
      timeSlot: selectedTimeSlot,
    };
  
    try {
      await dispatch(bookAppointment({ token, ...appointmentData }));
      toast.success("Appointment booked successfully!", {
        onClose: () => window.location.reload(), // Reload after toast disappears
      });
    } catch (error) {
      toast.error("Failed to book appointment.");
    }
  };
  

  const handleCancel = (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      dispatch(cancelAppointment({ token, appointmentId }))
        .then(() => {
            dispatch(fetchAppointments(token))
            toast.success("Appointment canceled successfully.")
                  // Dispatch after toast disappears
          
        })
        .catch(() => {
          toast.error("Failed to cancel appointment.");
        });
    }
  };


  const formatDoctorName = (name) => {
    return name.replace(/^Dr\.\s*/i, "Dr.");
  };

  return (
    <div className="flex h-screen bg-gray-100">
        <ToastContainer /> 
      <div className="w-64 bg-white p-6 shadow-lg">
        <div className="flex items-center mb-6">
          <FaUser className="text-3xl text-blue-500 mr-2" />
          <h2 className="text-xl font-bold">Patient Portal</h2>
        </div>
        <ul>
          <li className="mb-2 flex items-center"><FaSearch className="mr-2" /><a href="#" className="text-blue-500">Search Doctors</a></li>
          <li className="mb-2 flex items-center"><FaCalendarAlt className="mr-2" /><a href="#" className="text-gray-700">My Appointments</a></li>
          <button
      onClick={() => navigate("/logout")}
      className="w-full mt-6 py-2 bg-red-500 text-white rounded-lg flex items-center justify-center hover:bg-red-600 transition"
    >
      <FaSignOutAlt className="mr-2" /> Log Out
    </button>
        </ul>
      </div>

      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Welcome, {patient ? patient.name : "Loading..."}</h1>
        <div className="bg-white p-6 shadow-md rounded-lg mb-4">
          <h2 className="text-xl font-semibold mb-2">Search for a Doctor</h2>
          <div className="flex space-x-2">
            <input type="text" placeholder="Enter doctor's name" className="flex-1 p-2 border rounded" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <select className="p-2 border rounded" value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
              <option value="">Select Specialty</option>
              {specialties.map(spec => <option key={spec} value={spec}>{spec}</option>)}
            </select>
            <select className="p-2 border rounded" value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="">Select Location</option>
              {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
            <button className="bg-blue-500 text-white py-2 px-4 rounded flex items-center" onClick={handleSearch}>
              <FaSearch className="mr-2" /> Search
            </button>
          </div>
        </div>

        {doctors.length > 0 && (
          <div className="bg-white p-6 shadow-md rounded-lg mt-4">
            <h2 className="text-xl font-semibold mb-2">Available Doctors</h2>
            <ul>
              {doctors.map(doctor => (
                <li key={doctor._id} className="border-b p-2">
                  <div>
                    <strong>{doctor.name}</strong> - {doctor.specialty}
                    <div className="text-sm text-gray-600">
                      <p>Available on: {doctor.availability.map(a => `${a.day} (${a.startTime} - ${a.endTime})`).join(", ")}</p>
                    </div>
                  </div>
                  <button className="bg-green-500 text-white px-4 py-1 rounded mt-2" onClick={() => setSelectedDoctor(doctor)}>
                    Select
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

{selectedDoctor && (
  <div className="bg-white p-4 shadow-md rounded-lg mt-4 w-[350px] mx-auto">
    <h2 className="text-lg font-semibold mb-2 text-center">Doctor's Availability</h2>
    
    {/* Styled Calendar Wrapper */}
    <div className="flex justify-center">
      <div className="border border-gray-300 rounded-lg p-2 shadow-sm">
        <Calendar 
          onChange={handleDateChange} 
          className="w-[280px] h-auto text-sm"
        />
      </div>
    </div>

    {selectedDate && (
      <div className="mt-3 text-center">
        <h3 className="text-base font-medium mb-1">Select Time Slot:</h3>

        {availableTimes.length > 0 ? (
          <select 
            className="p-2 border rounded w-full text-sm"
            value={selectedTimeSlot} 
            onChange={(e) => setSelectedTimeSlot(e.target.value)}
          >
            <option value="">Select Time</option>
            {availableTimes.map((time, index) => (
              <option key={index} value={time}>{time}</option>
            ))}
          </select>
        ) : (
          <p className="text-gray-500 text-sm">No slots available.</p>
        )}

        {/* Smaller, Centered Button */}
        <button 
          className="bg-blue-500 text-white py-2 px-4 rounded text-sm flex items-center justify-center w-full mt-3"
          onClick={handleBookAppointment}
        >
          <FaPlus className="mr-2 text-xs" /> Book Now
        </button>
      </div>
    )}
  </div>
)}

        {/* Appointments List */}
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
                  {formatDoctorName(appointment.doctorId.name)}
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
                onClick={() => handleCancel(appointment._id)}
                className="bg-red-500 text-white px-4 py-2 rounded flex items-center hover:bg-red-600"
              >
                <FaTimes className="mr-2" /> Cancel
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
        
      </div>
    </div>
  );
};

export default PatientDashboard;
