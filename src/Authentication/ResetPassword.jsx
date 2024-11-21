import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import "./css/Register.css";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
    passwordConfirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {API} = useAuth()

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate inputs
    const { email, otp, password, passwordConfirm } = formData;
    if (!otp || !password || !passwordConfirm) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    if (password !== passwordConfirm) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, otp, password, passwordConfirm }),
      });

      const data = await response.json();
      console.log("this is coming from reset" ,data.userData)

      if (response.ok) {
        toast.success("Password reset successful! Please log in.");
        navigate("/auth/login");
      } else {
        setError(data.message || "Failed to reset password.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setError("An error occurred while resetting the password.");
    } finally {
      setLoading(false);
    }
  };

  return (  
    <div className="register">
      <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
          <h2>Reset Password</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="form-group">
            <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your registered email"
                value={formData.email}
                onChange={handleChange}
                required
              />
          </div>   
          <div className="form-group">
            <label>OTP</label>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="passwordConfirm"
              placeholder="Confirm new password"
              value={formData.passwordConfirm}
              onChange={handleChange}
              required
            />

          </div>

            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
      </div>
    </div>
 
  );
};

export default ResetPassword;
