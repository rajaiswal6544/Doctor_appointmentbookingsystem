import React from "react";

const HomePage = () => {
  return (
    <div className="relative w-full h-screen bg-cover bg-cover" style={{ backgroundImage:"url('doctor.webp')"}}>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center p-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Avoid Hassles & Delays.</h1>
        <p className="text-lg md:text-xl mb-4 max-w-2xl">
          How is health today? Sounds like not good! Don’t worry. Find your doctor
          online. Book as you wish with Agoro. We offer you a free doctor
          channeling service. Make your appointment now.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg text-lg">
          Make Appointment
        </button>
      </div>
      <div className="absolute top-4 right-8 flex space-x-4 text-white">
        <button className="hover:underline">LOGIN</button>
        <button className="hover:underline">REGISTER</button>
      </div>
      <div className="absolute bottom-4 text-white text-center w-full">
        <p>A Web Solution by Raj.</p>
      </div>
    </div>
  );
};

export default HomePage;
