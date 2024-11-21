import { useState } from "react";
import "../css/Navbar.css";
import { useAuth } from "../../store/auth";
import {useNavigate} from 'react-router-dom'


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout,theme, themes, handleThemeChange  } = useAuth();
  
  const navigate = useNavigate();

  const handleLogin = () => navigate("/auth/login");
  const handleSignUp = () => navigate("/auth/register");

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="logo">
          MyApp
        </a>
        <div className={`menu ${menuOpen ? "active" : ""}`}>
          <a href="/" className="nav-link">
            Home
          </a>
          <a href="/blogs" className="nav-link">
            Blog
          </a>
          <div>
            {user ? (
              <div className="profile-dropdown">
                <button className="profile-button nav-link">Profile</button>
                <div className="dropdown-menu">
                  <a href="/dashboard">Dashboard</a>
                  <a href="/settings">Settings</a>
                  <select id="theme" value={theme.name} onChange={handleThemeChange}>
                    {themes.map((t) => (
                      <option key={t.name} value={t.name}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                  <span onClick={logout} className="logout">
                    Logout
                  </span>
                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <button onClick={handleLogin} className="btn sign-in">
                  Sign In
                </button>
                <button onClick={handleSignUp} className="btn sign-up">
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen((prev) => !prev)}>
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
