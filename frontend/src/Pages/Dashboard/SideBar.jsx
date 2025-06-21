import "./SideBar.css";
import { FaDumbbell, FaHome, FaList, FaChartBar, FaUser } from "react-icons/fa";

/**
 * Sidebar component
 *
 * This component displays the dashboard sidebar.
 *
 * - At the top, a main dumbbell icon represents the app.
 * - Below, a vertical navigation menu contains:
 *   - Home icon (active)
 *   - Workouts list icon
 *   - Statistics icon
 *   - User profile icon
 *
 * Each icon is placed inside a list item for navigation.
 */
const Sidebar = () => {
  return (
    <aside className="sidebar">
      {/* Main dumbbell icon at the top */}
      <div className="sidebar-icon">
        <FaDumbbell />
      </div>
      {/* Vertical navigation menu */}
      <nav>
        <ul>
          {/* Home icon (active) */}
          <li className="active">
            <FaHome />
          </li>
          {/* Workouts list icon */}
          <li>
            <FaList />
          </li>
          {/* Statistics icon */}
          <li>
            <FaChartBar />
          </li>
          {/* User profile icon */}
          <li>
            <FaUser />
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
