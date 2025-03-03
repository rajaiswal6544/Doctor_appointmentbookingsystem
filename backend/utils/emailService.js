import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendAppointmentEmail = async (to, doctorName, date, timeSlot) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Appointment Confirmation",
    text: `Your appointment with Dr. ${doctorName} on ${date} at ${timeSlot} has been confirmed.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
export const sendCancellationEmail = async (patientEmail, doctorName, date, timeSlot) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: patientEmail,
        subject: "Appointment Canceled",
        text: `Your appointment with Dr. ${doctorName} on ${date} at ${timeSlot} has been canceled.`,
    };

    await transporter.sendMail(mailOptions);
};
