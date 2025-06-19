import "./Header.css";

const Header = () => {
  return (
    <header className="dashboard-header">
      <div>
        <h1>Welcome, User</h1>
        <p>Your personalized exercise dashboard</p>
      </div>
      <div className="header-profile">
        <span className="notification-bell">🔔</span>
        <img src="https://i.pravatar.cc/36" alt="Profile" />
      </div>
    </header>
  );
};

export default Header;
