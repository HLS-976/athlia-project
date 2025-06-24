import Sidebar from "./SideBar";
import Header from "./Header";
import "./DashBoard.css";

/**
 * Dashboard component
 *
 * Displays the main dashboard layout with sidebar, header, metrics, today's program, and weekly progress.
 *
 * Sections:
 * - Metrics: Shows calories burned, workouts completed, and minutes trained.
 * - Today's Program: Lists the user's scheduled workouts for the day.
 * - Weekly Progress: Placeholder for weekly progress visualization.
 */

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar navigation */}
      <Sidebar />
      <main className="dashboard-main">
        {/* Top header */}
        <Header />

        {/* Metrics section: calories, workouts, minutes */}
        <section className="dashboard-metrics">
          <div className="dashboard-cards">
            🔥<p>Calories Burned</p>
            <h2>520</h2>
          </div>
          <div className="dashboard-cards">
            🏃<p>Workouts Completed</p>
            <h2>12</h2>
          </div>
          <div className="dashboard-cards">
            ⏳<p>Minutes Trained</p>
            <h2>350</h2>
          </div>
        </section>

        {/* Today's Program section */}
        <section className="dashboard-program">
          <h2>Today's Program</h2>
          <div className="program-cards">
            <div className="program-card">
              🏋️{" "}
              <div>
                <h3>Upper Body Strength</h3>
                <p>45 min · 8 exercises</p>
              </div>
            </div>
            <div className="program-card">
              🏃{" "}
              <div>
                <h3>Cardio Endurance</h3>
                <p>30 min · 5 exercises</p>
              </div>
            </div>
            <div className="program-card">
              🏊{" "}
              <div>
                <h3>Flexibility Session</h3>
                <p>20 min · 6 exercises</p>
              </div>
            </div>
          </div>
        </section>

        {/* Weekly Progress section */}
        <section className="dashboard-progress">
          <h2>Weekly Progress</h2>
          <div className="progress-placeholder"></div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
