import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
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

  // Extract the redirect query parameter or default to /combined
  const queryParams = new URLSearchParams(location.search);
  const redirectTo = queryParams.get("redirect") || "/combined";

  // State for error messages - utiliser une chaîne au lieu d'un tableau
  const [errorMsg, setErrorMsg] = useState("");

  // State for form fields - récupérer l'email sauvegardé
  const [formData, setFormData] = useState({
    email: localStorage.getItem("rememberedEmail") || "",
    password: "",
  });

  // Sauvegarder l'email dans localStorage quand il change
  useEffect(() => {
    if (formData.email.trim() !== "") {
      localStorage.setItem("rememberedEmail", formData.email);
    }
  }, [formData.email]);

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
      const response = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
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

      // Save login state and tokens in localStorage only if the tokens exist
      if (data.access && data.refresh) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        localStorage.setItem("justAuthenticated", "true");

        // Sauvegarder l'email pour la prochaine connexion
        localStorage.setItem("rememberedEmail", formData.email);

        // Optional: log token for debugging
        console.log("Tokens correctly saved:", data);

        try {
          const userRes = await fetch("http://localhost:8000/api/user/", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${data.access}`,
            },
          });

          if (userRes.ok) {
            const userData = await userRes.json();
            localStorage.setItem("user", JSON.stringify(userData));
            console.log("User info:", userData);
          } else {
            console.error("Failed to fetch user info");
          }
        } catch (fetchError) {
          console.error("Error fetching user info:", fetchError);
        }

        // ✅ Redirection après login + récupération infos
        navigate(redirectTo, { replace: true });
      } else {
        setErrorMsg("Login failed. No tokens received.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg("Login failed. Please check your email or password.");
    }
  };

  return (
    <main>
      <div id="login-container">
        <h2>Connexion</h2>
        <form id="login" onSubmit={handleLogin}>
          {/* Username or Email field */}
          <div className="field-group">
            <label>Email* : </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password field */}
          <div className="field-group">
            <label>Mot de passe* : </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Error messages - afficher directement la chaîne */}
          {errorMsg && <p id="error">{errorMsg}</p>}

          {/* Submit button */}
          <button type="submit">Se connecter</button>

          {/* Link to signup page */}
          <p id="signup-link">
            Pas encore de compte ? <Link to="/signup">S'inscrire</Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;
