import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage:"url('bg01.jpg')"}}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-white text-center p-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          Avoid Hassles & Delays.
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-3xl leading-relaxed">
          Not feeling well? Don't worry! Find your doctor online and book your
          appointment instantly with Agoro. A seamless doctor appointment
          booking experience awaits you.
        </p>
        <button
          className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-lg"
          onClick={() => navigate("/appointments")}
        >
          Make Appointment
        </button>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-6 right-10 flex space-x-6">
        <button
          className="text-white text-lg font-semibold hover:underline"
          onClick={() => navigate("/login")}
        >
          LOGIN
        </button>
        <button
          className="text-white text-lg font-semibold hover:underline"
          onClick={() => navigate("/register")}
        >
          REGISTER
        </button>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 text-white text-center w-full">
        <p className="text-sm md:text-base">A Web Solution by Raj.</p>
      </div>
    </div>
  );
};

export default HomePage;
