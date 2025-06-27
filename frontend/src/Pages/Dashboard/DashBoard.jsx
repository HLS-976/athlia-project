import Header from "./Header";
import ExercisesHistory from "./ExercisesHistory";
import ExercisesFrequency from "./ExercisesFrequency";
import ProgressTracker from "./ProgressTracker";
import MusclesUsage from "./MusclesUsage";
import "./DashBoard.css";

const DashBoard = () => (
  <main>
    <Header />
    <div id="Dashboard-Container">
      <div id="Dashboard-Content">
        <div id="welcome-message">
          <h1>Welcome to your Dashboard</h1>
          <p>Your personalized exercise dashboard</p>
        </div>
        <div id="history">
          <ExercisesHistory />
        </div>
        <div id="muscles">
          <MusclesUsage />
        </div>
        <div id="frequency">
          <ExercisesFrequency />
        </div>
        <div id="progress">
          <ProgressTracker />
        </div>
      </div>
    </div>
  </main>
);

export default DashBoard;
