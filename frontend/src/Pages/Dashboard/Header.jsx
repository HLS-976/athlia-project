import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import "../../components/Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header id="header">
      {/* Header bar with logo, user menu and logout */}
      <div id="logo">
        {/* Logo with button to go back to home page */}
        <Link to="/">
          <img src="/Logo.png" alt="Logo" />
        </Link>
      </div>
      
      {/* User menu and logout buttons */}
      <div className="header-buttons">
        <div id="user-icon">
          <FaUser />
          <div className="dropdown-menu">
            <Link to="/profile">Mon Profil</Link>
            <Link to="/dashboard">Tableau de Bord</Link>
            <Link to="/combined">Exercices</Link>
          </div>
        </div>

        <div id="logout-icon" onClick={handleLogout}>
          <TbLogout />
        </div>
      </div>
    </header>
  );
};

export default Header;
