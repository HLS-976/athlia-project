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

  // ⚙️ États pour email et mot de passe
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setErrorMsg("Please enter both email and password");
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

      if (!response.ok) {
        throw new Error("Invalid email or pasword");
      }

      const data = await response.json();

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userToken", data.token);

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
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Log In</button>
          <p id="signup-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </main>
  );
}

// TODO : ajouter "Mot de passe oublié ?" ici si besoin

export default LoginPage;
