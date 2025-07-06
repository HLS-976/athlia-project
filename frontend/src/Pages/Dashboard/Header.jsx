import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header id="dashboard-header">
      {/* Logo à gauche */}
      <div id="logo">
        <Link to="/">
          <img src="/Logo.png" alt="Logo" />
        </Link>
      </div>

      {/* Icônes à droite */}
      <div id="header-icons">
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
