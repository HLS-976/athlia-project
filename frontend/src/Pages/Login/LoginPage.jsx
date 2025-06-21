import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import "./LoginPage.css";

function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const redirectTo = queryParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email");
      return;
    }

    if (!password.trim()) {
      setErrorMsg("Please enter a password");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(
          data.detail || "Login failed. Please check your email or password."
        );
        console.error("Server responded with error:", data);
        return;
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("refreshToken", data.refresh);

      const token = localStorage.getItem("refreshToken");

      if (token) {
        console.log("Token correctly saved:", data);
      }

      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg("Login failed. Please check your email or password.");
    }
  };

  return (
    <main>
      <header>
        <Header />
      </header>
      <div id="login-container">
        <h2>Welcome Back</h2>
        <form id="login" onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errorMsg && <p id="error">{errorMsg}</p>}
          <button type="submit">Log In</button>
          <p id="signup-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;
