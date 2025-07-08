import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "./SignUpPage.css";

/**
 * SignUpPage component
 *
 * This component displays the user registration form.
 */
function SignUpPage() {
  // State for form fields
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State for checkbox
  const [acceptTerms, setAcceptTerms] = useState(false);

  // State for error messages and submission status
  const [errorMsg, setErrorMsg] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  // Décompte et redirection après inscription réussie
  useEffect(() => {
    if (submitted) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate("/login");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [submitted, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTermsChange = (e) => {
    setAcceptTerms(e.target.checked);
  };

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

    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg(["Passwords do not match"]);
      return;
    }

    // Validate terms acceptance
    if (!acceptTerms) {
      setErrorMsg(["You must accept the terms and conditions"]);
      return;
    }

    // Send registration request to backend (exclude confirmPassword)
    try {
      const { confirmPassword: _, ...dataToSend } = formData;

      const response = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

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
      console.log("Registered successfully :", data);
      setSubmitted(true);
    } catch (error) {
      // Handle network or unexpected errors
      console.error("Error when register :", error);
      setErrorMsg(["Error when register please try again."]);
    }
  };

  // Google OAuth success handler - NOUVELLE API
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      console.log("Google OAuth Success:", credentialResponse);

      // La nouvelle API utilise credentialResponse.credential (JWT token)
      const backendResponse = await fetch(
        "http://localhost:8000/api/google-register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            google_token: credentialResponse.credential, // Token JWT
          }),
        }
      );

      const data = await backendResponse.json();

      if (!backendResponse.ok) {
        console.error("Server responded with error:", data);
        setErrorMsg([
          data.detail || "Erreur lors de l'inscription avec Google",
        ]);
        return;
      }

      // Inscription réussie avec Google
      console.log("Google registration successful:", data);

      // Sauvegarder les tokens si nécessaire
      if (data.access && data.refresh) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirection directe vers le dashboard
        navigate("/combined");
      } else {
        // Juste afficher le message de succès et rediriger vers login
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Google registration error:", error);
      setErrorMsg(["Erreur lors de l'inscription avec Google"]);
    }
  };

  // Google OAuth failure handler
  const handleGoogleFailure = () => {
    console.error("Google OAuth Failed");
    setErrorMsg(["Échec de la connexion Google"]);
  };

  return (
    <GoogleOAuthProvider clientId="VOTRE_GOOGLE_CLIENT_ID">
      <main>
        <div id="signup-container">
          {/* Success message after registration */}
          {submitted ? (
            <div id="success-msg">
              <div className="success-content">
                <h1>Bienvenue chez Athlia ! 🎉</h1>
                <p className="countdown-text">
                  Redirection vers la connexion dans {countdown} seconde
                  {countdown !== 1 ? "s" : ""}...
                </p>
              </div>
            </div>
          ) : (
            <>
              <h2>Inscription</h2>
              {/* Signup form */}
              <form id="signup" onSubmit={handleSubmit}>
                {/* First name and Last name in two columns */}
                <div id="names">
                  <div className="name">
                    <label>Prénom* : </label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="name">
                    <label>Nom* : </label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Username input */}
                <div className="field-group">
                  <label>Nom d'utilisateur* : </label>
                  <input
                    type="text"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email input */}
                <div className="field-group">
                  <label>Email* : </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password and Confirm Password in two columns */}
                <div id="passwords">
                  <div className="password-field">
                    <label>Mot de passe* : </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="password-field">
                    <label>Confirmer le mot de passe* : </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div id="terms-container">
                  <input
                    type="checkbox"
                    id="accept-terms"
                    checked={acceptTerms}
                    onChange={handleTermsChange}
                    required
                  />
                  <label htmlFor="accept-terms">
                    J'accepte les{" "}
                    <Link to="/terms" target="_blank" rel="noopener noreferrer">
                      Conditions Générales
                    </Link>{" "}
                    et la{" "}
                    <Link
                      to="/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Politique de Confidentialité
                    </Link>
                    *
                  </label>
                </div>

                {/* Error messages */}
                {errorMsg.length > 0 &&
                  errorMsg.map((msg, i) => (
                    <p key={i} id="error">
                      {msg}
                    </p>
                  ))}

                {/* Google Sign Up Button */}
                <div className="google-auth-section">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleFailure}
                    text="signup_with"
                    shape="rectangular"
                    theme="outline"
                    size="large"
                  />
                </div>
                {/* Submit button */}
                <button type="submit">S'inscrire</button>

                {/* Link to login page */}
                <p id="signup-link">
                  Vous avez un compte ? <Link to="/login">Se connecter</Link>
                </p>
              </form>
            </>
          )}
        </div>
      </main>
    </GoogleOAuthProvider>
  );
}

export default SignUpPage;
