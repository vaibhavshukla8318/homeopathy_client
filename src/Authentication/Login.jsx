import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";
import "./css/Register.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {storeTokenInLS, API} = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login successful!");
        // localStorage.setItem("authToken", data.token);
        // localStorage.setItem("userId", data.userId);
        storeTokenInLS(data.token, data.userId)
        navigate("/"); // Redirect to dashboard or home page
      } else {
        toast.error(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="form-container">
      <form  className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email}
          onChange={handleChange} placeholder="Enter your email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password"    value={formData.password}
          onChange={handleChange} placeholder="Enter your password" required />
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <Link to="/auth/forgot-password" className="forgot-password">Forgot Password?</Link>
        <p className="register-link">Don't have an account?  <Link to="/auth/register" className="register-link"> Register here</Link></p>
      </form>
      </div>
    </div>
  );
};

export default Login;
