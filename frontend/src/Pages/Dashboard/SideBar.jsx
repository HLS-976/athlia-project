import "./SideBar.css";
import { FaDumbbell, FaHome, FaList, FaChartBar, FaUser } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-icon">
        <FaDumbbell />
      </div>
      <nav>
        <ul>
          <li className="active">
            <FaHome />
          </li>
          <li>
            <FaList />
          </li>
          <li>
            <FaChartBar />
          </li>
          <li>
            <FaUser />
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
