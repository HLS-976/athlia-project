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

  const handleLogin = (e) => {
    e.preventDefault();

    // 💡 Simule une authentification
    const isAuthenticated = email && password;

    if (isAuthenticated) {
      // ✅ Stocke l'état de connexion
      localStorage.setItem("isLoggedIn", "true");

      // 🔁 Redirige vers la page demandée
      navigate(redirectTo, { replace: true });
    } else {
      alert("Please enter both email and password");
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
