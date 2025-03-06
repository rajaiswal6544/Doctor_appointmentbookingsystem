# Doctor Search & Appointment Booking System

## Overview
This project is a full-stack Doctor Search & Appointment Booking System built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It enables patients to search for doctors and book appointments while allowing doctors to manage their availability and appointments.

## Features
### 1. User Authentication & Role Management
- JWT-based authentication for Doctors and Patients.
- Secure password hashing using bcrypt.js.
- Patients can register/login and manage appointments.
- Doctors can register/login and set their availability.

### 2. Doctor Search & Profile Management
- Patients can search for doctors using filters:
  - Specialty (e.g., Cardiologist, Dermatologist).
  - Location (City, State).
  - Doctor’s Name (partial match search).
- Doctor Profile Page displays:
  - Name, Specialty, Experience, Location, and Availability Slots.

### 3. Appointment Booking System
- Doctors set availability (working hours and consultation locations).
- Patients can book an available slot with a doctor.
- Concurrency handling to prevent double booking.
- Patients can cancel appointments.
- Email notifications for bookings and cancellations using Nodemailer.

### 4. Web Interface (Frontend)
- Responsive UI using React.js.
- **Patient Portal:**
  - Search for doctors.
  - Book or cancel appointments.
- **Doctor Dashboard:**
  - Set up consultation locations.
  - Define and update availability.
  - View upcoming appointments.
- Redux/Context API for state management.

<!-- ### 5. Deployment & Documentation
- Backend deployed using Render.
- Frontend deployed using Vercel / Netlify.
- Comprehensive documentation with API usage guide and sample requests. -->

---

## Tech Stack
- **Frontend:** React.js, Redux, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT, bcrypt.js
- **Email Notifications:** Nodemailer
- **Deployment:** Render(Backend),, Vercel(Frontend) 

---

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js (>= 16.x)
- MongoDB
- npm

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/rajaiswal6544/Doctor_appointmentbookingsystem.git
cd Doctor_appointmentbookingsystem/backend

# Install dependencies
npm install

# Configure environment variables (create a .env file)
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

# Start the server
npm start
```

### Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install

# Start the frontend
npm start
```

---

## API Endpoints
### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Login user

### Doctor Management
- `GET /api/doctors` - Fetch all doctors (with filters)
- `GET /api/profile/:id` - Fetch doctor profile
- `POST /api/doctors/set-availability` - Set doctor availability (Doctor only)
- `GET /api/doctors/doctor/appointments` - Get doctor upcoming appointments (Doctor only)

### Appointment Management
- `GET /api/my-appointments` - Get users appointments (Patient only)
- `POST /api/appointments/book` - Book an appointment (Patient only)
- `POST /api/appointments/cancel` - Cancel an appointment (Patient only)

---

## Deployment
### Backend Deployment
- Deploy on **Render**
- Configure environment variables in the respective platform.

### Frontend Deployment
- Deploy on **Vercel**

---

## Live Demo
- **Frontend:** [Deployed Link](https://doctor-appointmentbookingsystem-2cls0j8q2.vercel.app/)
- **Backend API:** [Deployed Link](https://doctor-appointmentbookingsystem.onrender.com)

---

## License
This project is licensed under the MIT License.

