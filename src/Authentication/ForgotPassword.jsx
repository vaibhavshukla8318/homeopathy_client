import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import "./css/Register.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const {API} = useAuth();
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API}/api/auth/forget-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("OTP has been sent to your email.");
        setEmail(""); 
        navigate("/auth/reset-password");
      } else {
        toast.error(data.message || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending reset OTP:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
       <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
            <h2>Forgot Password</h2>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter Email"
              required
              />
            </div>
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        </div>
    </div>
  );
};

export default ForgotPassword;
