import { useDispatch } from "react-redux";
import { updateAvailability } from "../slices/availabilitySlice";
import { useState } from "react";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AvailabilityForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");

  const [availabilities, setAvailabilities] = useState([]);
  const [newAvailability, setNewAvailability] = useState({
    day: "Monday",
    consultLocations: [],
    startTime: "",
    endTime: "",
  });

  const addAvailability = () => {
    if (!newAvailability.startTime || !newAvailability.endTime) {
      toast.error("Please provide start and end times.");
      return;
    }

    setAvailabilities((prev) => [...prev, newAvailability]);
    toast.success("Availability added successfully!");
    setNewAvailability({
      day: "Monday",
      consultLocations: [],
      startTime: "",
      endTime: "",
    });
  };

  const removeAvailability = (index) => {
    setAvailabilities((prev) => prev.filter((_, i) => i !== index));
    toast.info("Availability removed.");
  };

  const handleUpdateAvailability = () => {
    if (availabilities.length === 0) {
      toast.error("Please add at least one availability before updating.");
      return;
    }

    dispatch(updateAvailability({ token: authToken, availability: availabilities }));
    toast.success("Registered successfully! guiding to login", {
      onClose: () => navigate("/doctorDashboard"),
    });
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        <ToastContainer/>
      <h2 className="text-xl font-bold mb-4">Manage Availability</h2>

      <select
        className="w-full p-2 border rounded mb-2"
        value={newAvailability.day}
        onChange={(e) =>
          setNewAvailability((prev) => ({ ...prev, day: e.target.value }))
        }
      >
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
          (day) => (
            <option key={day}>{day}</option>
          )
        )}
      </select>

      <input
        className="w-full p-2 border rounded mb-2"
        type="text"
        placeholder="Consult Locations (comma separated)"
        value={newAvailability.consultLocations.join(", ")}
        onChange={(e) =>
          setNewAvailability((prev) => ({
            ...prev,
            consultLocations: e.target.value.split(",").map((loc) => loc.trim()),
          }))
        }
      />

      <input
        className="w-full p-2 border rounded mb-2"
        type="time"
        value={newAvailability.startTime}
        onChange={(e) =>
          setNewAvailability((prev) => ({ ...prev, startTime: e.target.value }))
        }
      />

      <input
        className="w-full p-2 border rounded mb-2"
        type="time"
        value={newAvailability.endTime}
        onChange={(e) =>
          setNewAvailability((prev) => ({ ...prev, endTime: e.target.value }))
        }
      />

      <button
        onClick={addAvailability}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Availability
      </button>

      <ul className="mt-4">
        {availabilities.map((availability, index) => (
          <li key={index} className="flex justify-between bg-gray-100 p-2 mb-2 rounded">
            <span>
              {availability.day}, {availability.startTime} - {availability.endTime} at{" "}
              {availability.consultLocations.join(", ")}
            </span>
            <button
              onClick={() => removeAvailability(index)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={handleUpdateAvailability}
        className="mt-3 px-4 py-2 bg-green-500 text-white rounded"
      >
        Update Availability
      </button>
    </div>
  );
};

export default AvailabilityForm;
