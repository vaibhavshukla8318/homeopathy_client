// Import necessary modules
import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

// Themes array
const themes = [
  { 
    name: "Light", 
    navbar: "#ffffff", // White for navbar
    navbarText: "#333333", // Dark gray for text
    background: "#f8f9fa", // Soft gray for background
    backgroundText: "#333333", // Dark gray for text
  },
  { 
    name: "Dark", 
    navbar: "#333333", // Dark gray for navbar
    navbarText: "#e0e0e0", // Light gray for text to avoid pure white glare
    background: "#212529", // Deep dark gray for background
    backgroundText: "#ffffff" // White for text (compatible with dark gray and light gray)
  },
  { 
    name: "Blue", 
    navbar: "#17a2b8", 
    navbarText: "#f8f9fa",
    background: "#e9f5ff",
    backgroundText: "#000000"
  },
  { 
    name: "Green", 
    navbar: "#28a745", 
    navbarText: "#fff",
    background: "#e8f5e9",
    backgroundText: "#000000"
  },
  { 
    name: "Purple", 
    navbar: "#6f42c1", // Purple for navbar
    navbarText: "#f8f9fa", // Soft gray for text (compatible with purple and light lavender)
    background: "#f3e8fb", // Light lavender for background
    backgroundText: "#000000" // Black for text (compatible with purple and light lavender)
  }
];



// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component to provide context values
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(themes[0]);

  // API Base URL (use environment variable if available, fallback to localhost)
  const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // Authorization token for API calls
  const authorizationToken = token ? `Bearer ${token}` : null;

  // Function to store token in localStorage and state
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setUser(null); // Clear user state
    localStorage.removeItem("token"); // Remove token from localStorage
    toast.success("Logged out successfully!");
  };

  // Fetch user data from the API
  const fetchUserData = async () => {
    if (!authorizationToken) {
      console.error("Authorization token is missing.");
      return;
    }

    try {
      const response = await fetch(`${API}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
      } else {
        console.error("Failed to fetch user data");
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
    }
  };

  // Effect to fetch user details on initial render or token change
  useEffect(() => {
    if (token) {
      fetchUserData();
    } else {
      setUser(null);
    }
  }, [token]);

  // Load the persisted theme on component mount
  // useEffect(() => {
  //   const savedTheme = localStorage.getItem("selectedTheme");
  //   if (savedTheme) {
  //     const foundTheme = themes.find((t) => t.name === savedTheme);
  //     if (foundTheme) setTheme(foundTheme);
  //   }
  // }, []);


  useEffect(() => {
    const savedTheme = localStorage.getItem("selectedTheme");
    if (savedTheme) {
      const foundTheme = themes.find((t) => t.name === savedTheme);
      if (foundTheme) {
        setTheme(foundTheme);
        document.documentElement.style.setProperty("--navbar", foundTheme.navbar);
        document.documentElement.style.setProperty("--navbar-text", foundTheme.navbarText);
        document.documentElement.style.setProperty("--background", foundTheme.background);
        document.documentElement.style.setProperty("--background-text", foundTheme.backgroundText);
      }
    }
  }, []);
  

  // Save the selected theme to localStorage
  // const handleThemeChange = (e) => {
  //   const selectedTheme = themes.find((t) => t.name === e.target.value);
  //   if (selectedTheme) {
  //     setTheme(selectedTheme);
  //     localStorage.setItem("selectedTheme", selectedTheme.name);
  //   } else {
  //     console.error("Invalid theme selected.");
  //   }
  // };


  // AuthProvider.js
const handleThemeChange = (e) => {
  const selectedTheme = themes.find((t) => t.name === e.target.value);
  if (selectedTheme) {
    setTheme(selectedTheme);
    localStorage.setItem("selectedTheme", selectedTheme.name);

    // Update CSS variables dynamically
    document.documentElement.style.setProperty("--navbar", selectedTheme.navbar);
    document.documentElement.style.setProperty("--navbar-text", selectedTheme.navbarText);
    document.documentElement.style.setProperty("--background", selectedTheme.background);
    document.documentElement.style.setProperty("--background-text", selectedTheme.backgroundText);
  }
};



  // Context value to be provided to consumers
  const value = {
    theme, 
    themes, 
    handleThemeChange,
    isLoggedIn: !!token,
    storeTokenInLS,
    logout,
    user,
    authorizationToken,
    API,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

// Prop validation for the AuthProvider component
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook for consuming AuthContext
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContextValue;
};
