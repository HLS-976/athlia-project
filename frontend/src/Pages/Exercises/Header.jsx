import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

/**
 * Header component
 *
 * This component displays the header for the exercises pages.
 *
 * - The returned JSX contains:
 *   - A header bar with the logo on the left (clickable, links to home).
 *   - A "Profil" button linking to the profil page, on the right.
 *   - A "Logout" button linking to the logout page, on the right.
 *   - Both buttons are spaced using the "header-buttons" CSS class.
 */
function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <header id="header">
      {/* Header bar with logo, profil and logout buttons */}
      <div id="logo">
        {/* Logo with button to go back to home page */}
        <Link to="/">
          <img src="/Logo.png" alt="Logo" />
        </Link>
      </div>
      <div className="header-buttons">
        {/* profil button */}
        <button id="header-profil">Profile</button>
        {/* Logout button */}
        <button onClick={handleLogout} id="header-logout">
          Log Out
        </button>
      </div>
    </header>
  );
}

export default Header;
