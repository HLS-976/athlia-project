import "./Header.css";

/**
 * Header component
 *
 * This component displays the dashboard header.
 *
 * - Shows a welcome message and a subtitle on the left.
 * - On the right, displays a notification bell icon and a user profile avatar.
 *
 * All elements are organized inside the header for a clean dashboard top bar.
 */
const Header = () => {
  return (
    <header className="dashboard-header">
      {/* Welcome message and subtitle */}
      <div>
        <h1>Welcome, User</h1>
        <p>Your personalized exercise dashboard</p>
      </div>
      {/* Notification bell and user avatar */}
      <div className="header-profile">
        <span className="notification-bell">🔔</span>
        <img src="https://i.pravatar.cc/36" alt="Profile" />
      </div>
    </header>
  );
};

export default Header;
