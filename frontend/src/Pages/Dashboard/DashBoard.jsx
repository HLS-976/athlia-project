import Sidebar from "./SideBar";
import Header from "./Header";
import "./DashBoard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-main">
        <Header />
        <section className="dashboard-metrics">
          <div className="card">
            🔥<p>Calories Burned</p>
            <h2>520</h2>
          </div>
          <div className="card">
            🏃<p>Workouts Completed</p>
            <h2>12</h2>
          </div>
          <div className="card">
            ⏳<p>Minutes Trained</p>
            <h2>350</h2>
          </div>
        </section>

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

        <section className="dashboard-progress">
          <h2>Weekly Progress</h2>
          <div className="progress-placeholder"></div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
