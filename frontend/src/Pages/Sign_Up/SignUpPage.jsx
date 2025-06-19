import Header from "./Header.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUpPage.css";

function SignUpPage() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password.trim() === "") {
      alert("Password is required.");
      return;
    }

    if (formData.user.trim() === "") {
      alert("User is required.");
      return;
    }

    console.log("Inscription réussie :", formData);
    setSubmitted(true);
  };

  return (
    <main>
      <header>
        <Header />
      </header>
      <div id="signup-container">
        <h2>Sign up</h2>
        {submitted ? (
          <p id="success-msg">Welcome to Athlia ! 🎉</p>
        ) : (
          <form id="signup" onSubmit={handleSubmit}>
            <div id="names">
              <div className="name">
                <label>First name : </label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="name">
                <label>Last name : </label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>
            <label>Username* : </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
            <label>Email* : </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            <label>Password* : </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            <button type="submit">Sign Up</button>
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
