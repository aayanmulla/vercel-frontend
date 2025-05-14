import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../Firebase"; // Import Google Sign-In function
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
import "./Login.css"; // Ensure you have this CSS file for styling

const BACKEND_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_LOCAL_API_BASE_URL
    : process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add request and response interceptors for logging and debugging
api.interceptors.request.use(
  (config) => {
    console.log("Axios Request Config:", config);
    return config;
  },
  (error) => {
    console.error("Axios Request Error:", error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    console.log("Axios Response:", response);
    return response;
  },
  (error) => {
    console.error("Axios Response Error:", error);

    if (error.response) {
      console.error("Error data:", error.response.data);
      console.error("Error status:", error.response.status);
      console.error("Error headers:", error.response.headers);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error message:", error.message);
    }

    return Promise.reject(error);
  },
);

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error

    try {
      // Log request details
      console.log("Login Attempt:", {
        backendUrl: api.defaults.baseURL,
        endpoint: "/login",
        email: formData.email,
      });

      const response = await api.post("api/login", formData);

      if (response.status === 200) {
        const { token, user } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        alert("Login successful!");
        navigate("/bookings");
      }
    } catch (error) {
      // Extremely detailed error logging
      console.error("Comprehensive Login Error Details:", {
        fullError: error,
        errorName: error.name,
        errorMessage: error.message,
        errorCode: error.code,
        networkError: error.code === "ERR_NETWORK",
        responseData: error.response?.data,
        responseStatus: error.response?.status,
        requestConfig: error.config,
      });

      // Specific error handling
      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
          setError(
            "Network Error: Cannot connect to server. Check your connection.",
          );
        } else if (error.response) {
          // Server responded with an error
          setError(
            error.response.data.message || "Login failed. Please try again.",
          );
        } else if (error.request) {
          // Request made but no response received
          setError("No response from server. Please check the backend.");
        } else {
          setError("An unexpected error occurred during login.");
        }
      } else {
        setError("An unknown error occurred. Please try again.");
      }
    }
  };

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      setUser(result.user); // Store user info
      console.log("User signed in:", result.user);

      // Optional: Send Google user info to backend if needed
      try {
        await api.post("/api/google-login", {
          email: result.user.email,
          name: result.user.displayName,
        });
      } catch (backendError) {
        console.error("Backend Google login error:", backendError);
      }

      // Redirect to bookings page
      navigate("/bookings");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setError("Google Sign-In failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="top-right-links">
          <span>
            New User? <a href="/signup">Sign Up</a>
          </span>
        </div>
        <h1 className="logo">ParkEz</h1>
        <h2>Welcome Back!</h2>
        <p>Login to continue</p>

        {error && <p className="error-message">{error}</p>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="username11@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            LOGIN
          </button>
          <div className="footer-links">
            <a href="/forgot-password">Forgot Password?</a>
          </div>
        </form>

        <div className="login-social">
          <p>Login with</p>
          <div className="social-icons">
            <FaGoogle
              size={30}
              color="red"
              onClick={handleGoogleSignIn}
              style={{ cursor: "pointer" }}
              title="Sign in with Google"
            />
            <FaFacebook
              size={30}
              color="blue"
              style={{ cursor: "pointer" }}
              title="Sign in with Facebook"
            />
            <FaTwitter
              size={30}
              color="skyblue"
              style={{ cursor: "pointer" }}
              title="Sign in with Twitter"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
