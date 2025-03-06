import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token"); // Clear the token

    toast.success("Logged out successfully!", {
      position: "top-center",
      onClose: () => navigate("/"), // Redirect to homepage after toast disappears
    });
  }, [navigate]);

  return <ToastContainer autoClose={2000} />; // Shows toast for 2 seconds
};

export default Logout;
