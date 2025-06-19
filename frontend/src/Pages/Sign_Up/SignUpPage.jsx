import Header from "./Header.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUpPage.css";

function SignUpPage() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.email.trim() === "" ||
      formData.password.trim() === "" ||
      formData.user_name.trim() === ""
    ) {
      alert("Email, username et password sont obligatoires.");
      return;
    }

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

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const data = await response.json();
      console.log("Register succefully :", data);
      setSubmitted(true);
    } catch (error) {
      console.error("Error when register :", error);
      alert("Error when register please try again.");
    }
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
                  name="first_name"
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
                  name="last_name"
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
              name="user_name"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
            <label>Email* : </label>
            <input
              type="email"
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
