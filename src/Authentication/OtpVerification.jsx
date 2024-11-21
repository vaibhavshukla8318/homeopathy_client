import { useState, useRef, useEffect } from "react";
import "./css/OtpVerification.css";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";
import { useNavigate } from 'react-router-dom';

const OtpVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = useRef([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, API, authorizationToken } = useAuth();
  const navigate = useNavigate();

  // Initialize timer from localStorage
  useEffect(() => {
    const savedEndTime = localStorage.getItem("resendTimerEndTime");
    if (savedEndTime) {
      const timeLeft = Math.max(0, Math.floor((new Date(savedEndTime) - new Date()) / 1000));
      if (timeLeft > 0) {
        setIsResendDisabled(true);
        setResendTimer(timeLeft);
      }
    }
  }, []);

  // Update timer and localStorage
  useEffect(() => {
    if (resendTimer > 0 && isResendDisabled) {
      const timerInterval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerInterval);
            setIsResendDisabled(false);
            localStorage.removeItem("resendTimerEndTime");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [resendTimer, isResendDisabled]);

  const handleChange = (value, index) => {
    if (!isNaN(value) && value.length === 1) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      // Automatically focus on the next input
      if (index < 3 && value) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (!value) {
      // Clear input and focus on previous field
      const updatedOtp = [...otp];
      updatedOtp[index] = "";
      setOtp(updatedOtp);
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResend = async () => {
    setIsResendDisabled(true);
    setResendTimer(30);
    const endTime = new Date(Date.now() + 30 * 1000);
    localStorage.setItem("resendTimerEndTime", endTime);

    try {
      const response = await fetch(`${API}/api/auth/resend-otp`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": authorizationToken
        },
        body: JSON.stringify({ email: user?.email }),
      });

      if (response.ok) {
        toast.success("OTP has been resent to your email.");
      } else {
        toast.error("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("An error occurred while resending OTP.");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 4) {
      setError("Please enter a valid 4-digit OTP.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API}/api/auth/verify`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": authorizationToken
        },
        body: JSON.stringify({ email: user?.email, otp: enteredOtp }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("OTP verified successfully!");
        navigate("/");
      } else {
        setError(data.message || "Failed to verify OTP.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("An error occurred while verifying OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="otp">
     <div className="otp-container">
      <h2>OTP Verification</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="otp-form">
        {otp.map((value, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={value}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
            className="otp-input"
          />
        ))}
        <button onClick={handleSubmit} className="submit-btn" disabled={otp.includes("") || loading}>
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </div>
      <button
        onClick={handleResend}
        className="resend-btn"
        disabled={isResendDisabled}
      >
        Resend OTP {isResendDisabled && `(${resendTimer}s)`}
      </button>
    </div>
   </div>
  );
};

export default OtpVerification;
