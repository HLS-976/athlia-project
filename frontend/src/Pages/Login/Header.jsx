import { Link } from "react-router-dom";
import "./Header.css";

/**
 * Header component
 *
 * This component displays the header for the home page.
 *
 * - The returned JSX contains:
 *   - A right-aligned header bar.
 *   - A "Login" button linking to the login page.
 *   - A "Sign Up" button linking to the signup page.
 */
function Header() {
  return (
    <div style={{ textAlign: "right", padding: "20px" }}>
      {/* Header bar with login and signup buttons */}
      <header id="header">
        {/* Login button */}
        <Link to="/login">
          <button id="header-login">Login</button>
        </Link>
        {/* Sign Up button */}
        <Link to="/signup">
          <button id="header-signup">Sign Up</button>
        </Link>
      </header>
    </div>
  );
}

export default Header;
