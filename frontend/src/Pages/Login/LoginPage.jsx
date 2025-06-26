import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import "./LoginPage.css";

/**
 * LoginPage component
 *
 * This component displays the login form for users.
 *
 * - The returned JSX contains:
 *   - The header bar at the top.
 *   - A login form with email and password fields.
 *   - Error messages if login fails or fields are invalid.
 *   - A submit button for logging in.
 *   - A link to the signup page for new users.
 */
function LoginPage() {
  // Get the current location and navigation functions from React Router
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the redirect query parameter or default to /dashboard
  const queryParams = new URLSearchParams(location.search);
  const redirectTo = queryParams.get("redirect") || "/exercises";

  // State for error messages and submission status
  const [errorMsg, setErrorMsg] = useState([]);

  // State for form fields and error message
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //Handles the signup form submission.
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // The login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate email format
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMsg("Please enter a valid email");
      return;
    }

    // Validate password presence
    if (!formData.password.trim()) {
      setErrorMsg("Please enter a password");
      return;
    }

    // Send login request to backend
    try {
      const response = await fetch("http://localhost:8000/api/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Parse response data
      const data = await response.json();

      // If login failed, show error message
      if (!response.ok) {
        setErrorMsg(
          data.detail || "Login failed. Please check your email or password."
        );
        console.error("Server responded with error:", data);
        return;
      }

      // Save login state and token in localStorage only if the token exists
      if (data.refresh) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("refreshToken", data.refresh);

        // Optional: log token for debugging
        console.log("Token correctly saved:", data);

        // Redirect to the intended page after login
        navigate(redirectTo, { replace: true });
      } else {
        setErrorMsg("Login failed. No token received.");
      }
    } catch (error) {
      // Handle network or unexpected errors
      console.error("Login error:", error);
      setErrorMsg("Login failed. Please check your email or password.");
    }
  };

  return (
    <main>
      {/* Top header bar */}
      <header>
        <Header />
      </header>
      <div id="login-container">
        <h2>Welcome Back</h2>
        {/* Login form */}
        <form id="login" onSubmit={handleLogin}>
          {/* Email input */}
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {/* Password input */}
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {/* Error message */}
          {errorMsg && <p id="error">{errorMsg}</p>}
          {/* Submit button */}
          <button type="submit">Log In</button>
          {/* Signup link */}
          <p id="signup-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;
