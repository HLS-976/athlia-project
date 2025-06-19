import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <div style={{ textAlign: "right", padding: "20px" }}>
      <header id="header">
        <Link to="/login">
          <button id="header-login">Login</button>
        </Link>
        <Link to="/signup">
          <button id="header-signup">Sign Up</button>
        </Link>
      </header>
    </div>
  );
}

export default Header;
