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
      {/* Header bar with profile and signout buttons */}
      <header id="header">
        <button id="header-profil">Profile</button>
        <button id="header-signout">Sign Out</button>
      </header>
    </div>
  );
}

export default Header;
