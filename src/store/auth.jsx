// Import necessary modules
import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";


const themes = [
  { 
    name: "Light", 
    navbar: "#ffffff", // White 
    navbarText: "#333333", // Dark gray
    background: "#f8f9fa", // Soft gray
    backgroundText: "#333333", // Dark gray
    content: "#ffffff", // Pure white for content
    contentText: "#4a4a4a" // Neutral dark gray for text
  },
  { 
    name: "Dark", 
    navbar: "#333333", // Dark gray for navbar
    navbarText: "#e0e0e0", // Light gray
    background: "#212529", // Deep dark gray
    backgroundText: "#ffffff", // White
    content: "#2b2b2b", // Slightly lighter dark gray
    contentText: "#e0e0e0" // Light gray for content text
  },
  { 
    name: "Blue", 
    navbar: "#17a2b8", // Teal blue
    navbarText: "#f8f9fa", // Light gray
    background: "#e9f5ff", // Light blue
    backgroundText: "#000000", // Black
    content: "#ffffff", // White for content
    contentText: "#333333" // Dark gray for text
  },
  { 
    name: "Green", 
    navbar: "#28a745", // Green
    navbarText: "#ffffff", // White
    background: "#e8f5e9", // Light green
    backgroundText: "#000000", // Black
    content: "#ffffff", // White
    contentText: "#2d3d2d" // Forest green for text
  },
  { 
    name: "Purple", 
    navbar: "#6f42c1", // Purple
    navbarText: "#f8f9fa", // Light gray
    background: "#f3e8fb", // Light lavender
    backgroundText: "#000000", // Black
    content: "#ffffff", // White
    contentText: "#4a4a4a" // Neutral dark gray for text
  },
  { 
    name: "Neutral", 
    navbar: "#ececec", // Light gray
    navbarText: "#4a4a4a", // Dark gray
    background: "#f7f7f7", // Off-white
    backgroundText: "#2c2c2c", // Almost black
    content: "#ffffff", // White
    contentText: "#3a3a3a" // Slightly darker gray
  },
  { 
    name: "Pastel", 
    navbar: "#ffe4e1", // Soft pink
    navbarText: "#5d5d5d", // Neutral gray
    background: "#fffaf0", // Ivory
    backgroundText: "#4a4a4a", // Dark gray
    content: "#ffffff", // White
    contentText: "#5d5d5d" // Neutral gray
  },
  { 
    name: "High Contrast", 
    navbar: "#000000", // Black
    navbarText: "#ffffff", // White
    background: "#ffffff", // White
    backgroundText: "#000000", // Black
    content: "#f2f2f2", // Light gray for content
    contentText: "#1a1a1a" // Very dark gray for text
  },
  { 
    name: "Gradient", 
    navbar: "linear-gradient(to right, #6a11cb, #2575fc)", // Purple to blue gradient
    navbarText: "#ffffff", // White
    background: "#f3f4f6", // Light gray
    backgroundText: "#333333", // Dark gray
    content: "#ffffff", // White
    contentText: "#4a4a4a" // Neutral gray
  },
  { 
    name: "Autumn", 
    navbar: "#d35400", // Pumpkin orange
    navbarText: "#ffffff", // White
    background: "#fbe4d5", // Light peach
    backgroundText: "#4a342e", // Coffee brown
    content: "#fdf7f0", // Very light beige for content
    contentText: "#5a3e2e" // Darker brown for text
  },
  { 
    name: "Content-Specific", 
    navbar: "#4caf50", // Green
    navbarText: "#ffffff", // White
    background: "#fff3e0", // Light cream for background
    backgroundText: "#3e2723", // Dark brown
    content: "#ffffff", // Pure white for content
    contentText: "#3e2723" // Dark brown for content text
  }
];


// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component to provide context values
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [blog, setBlog] = useState(null);
  const [theme, setTheme] = useState(themes[0]);

  // API Base URL (use environment variable if available, fallback to localhost)
  const API = import.meta.env.VITE_API_URL;

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

  // Fetch blog data from the API
  const fetchBlogData = async () => {
    try {
      const response = await fetch(`${API}/api/blog/allblogs`, {
        method: "GET",
      });
      
      if (response.ok) {
        const data = await response.json();
        // console.log("this data is coming from blog data" , data);
        setBlog(data);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching Blog data:", error);
    }
  }

  

  // Effect to fetch user details on initial render or token change
  useEffect(() => {
      fetchUserData();
      fetchBlogData();
  }, []);

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
        document.documentElement.style.setProperty("--content", foundTheme.content);
        document.documentElement.style.setProperty("--content-text", foundTheme.contentText);
      }
    }
  }, []);

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
    document.documentElement.style.setProperty("--content", selectedTheme.content);
    document.documentElement.style.setProperty("--content-text", selectedTheme.contentText);
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
    blog,
    authorizationToken,
    API,
  };
  

console.log("Hi its me", blog)

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
