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

  const [errorMsg, setErrorMsg] = useState([]);
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
      setErrorMsg(["Please enter email, username and password"]);
      return;
    }

    if (!formData.email.includes("@")) {
      setErrorMsg(["Please enter a valid email"]);
      return;
    }

    if (formData.password.length < 8) {
      setErrorMsg(["The password must be 8 characters long"]);
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

      console.log("Data fetched successfully");
      const data = await response.json();

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

      console.log("Registered succefully :", data);
      setSubmitted(true);
    } catch (error) {
      console.error("Error when register :", error);
      setErrorMsg(["Error when register please try again."]);
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
                  value={formData.first_name}
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
                  value={formData.last_name}
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
              value={formData.user_name}
              onChange={handleChange}
              placeholder="Enter your user_name"
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
            {errorMsg.length > 0 &&
              errorMsg.map((msg, i) => (
                <p key={i} className="error-message">
                  {msg}
                </p>
              ))}
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
