import Header from "./Header.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUpPage.css";

/**
 * SignUpPage component
 *
 * This component displays the user registration form.
 *
 * - The returned JSX contains:
 *   - The header bar at the top.
 *   - A signup form with fields for first name, last name, username, email, and password.
 *   - Error messages if registration fails or fields are invalid.
 *   - A submit button for creating an account.
 *   - A link to the login page for existing users.
 */
function SignUpPage() {
  // State for form fields
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
  });

  // State for error messages and submission status
  const [errorMsg, setErrorMsg] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  //Handles the signup form submission.
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handles the signup form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      formData.email.trim() === "" ||
      formData.password.trim() === "" ||
      formData.user_name.trim() === ""
    ) {
      setErrorMsg(["Please enter email, username and password"]);
      return;
    }

    // Validate email format
    if (!formData.email.includes("@")) {
      setErrorMsg(["Please enter a valid email"]);
      return;
    }

    // Validate password length
    if (formData.password.length < 8) {
      setErrorMsg(["The password must be 8 characters long"]);
      return;
    }

    // Send registration request to backend
    try {
      const response = await fetch(
        "http://localhost:8000/api/users/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      console.log("Data fetched successfully");
      const data = await response.json();

      // If registration failed, show error messages
      if (!response.ok) {
        console.error("Server responded with error:", data);
        const errors = [];
        for (const key in data) {
          const messages = Array.isArray(data[key]) ? data[key] : [data[key]];
          messages.forEach((msg) => errors.push(msg));
        }
        setErrorMsg(errors);
        return;
      }

      // Registration successful
      console.log("Registered succefully :", data);
      setSubmitted(true);
    } catch (error) {
      // Handle network or unexpected errors
      console.error("Error when register :", error);
      setErrorMsg(["Error when register please try again."]);
    }
  };

  return (
    <main>
      {/* Top header bar */}
      <header>
        <Header />
      </header>
      <div id="signup-container">
        <h2>Sign up</h2>
        {/* Success message after registration */}
        {submitted ? (
          <p id="success-msg">Welcome to Athlia ! 🎉</p>
        ) : (
          // Signup form
          <form id="signup" onSubmit={handleSubmit}>
            <div id="names">
              {/* First name input */}
              <div className="name">
                <label>First name : </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  required
                />
              </div>
              {/* Last name input */}
              <div className="name">
                <label>Last name : </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>
            {/* Username input */}
            <label>Username* : </label>
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              placeholder="Enter your user_name"
              required
            />
            {/* Email input */}
            <label>Email* : </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            {/* Password input */}
            <label>Password* : </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            {/* Error messages */}
            {errorMsg.length > 0 &&
              errorMsg.map((msg, i) => (
                <p key={i} className="error-message">
                  {msg}
                </p>
              ))}
            {/* Submit button */}
            <button type="submit">Sign Up</button>
            {/* Link to login page */}
            <p id="signup-link">
              Have an account? <Link to="/login">login</Link>
            </p>
          </form>
        )}
      </div>
    </main>
  );
}

export default SignUpPage;
