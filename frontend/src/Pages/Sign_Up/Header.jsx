import { Link } from "react-router-dom";

/**
 * Header component
 *
 * This component displays the header for the home page.
 *
 * - The returned JSX contains:
 *   - A header bar with the logo on the left (clickable, links to home).
 *   - A "Login" button linking to the login page, on the right.
 *   - A "Sign Up" button linking to the signup page, on the right.
 *   - Both buttons are spaced using the "header-buttons" CSS class.
 */
function Header() {
  return (
    <header id="header">
      {/* Header bar with logo, login and signup buttons */}
      <div id="logo">
        {/* Logo with button to go back to home page */}
        <Link to="/">
          <img src="/Logo.png" alt="Logo" />
        </Link>
      </div>
      {/* login button */}
      <div className="header-buttons">
        <Link to="/login">
          <button id="header-login">Login</button>
        </Link>
        {/* Sign Up button */}
        <Link to="/signup">
          <button id="header-signup">Sign Up</button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
