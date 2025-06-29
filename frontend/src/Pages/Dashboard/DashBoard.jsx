import React from 'react';
import Header from "./Header";
import ExercisesHistory from "./ExercisesHistory";
import ExercisesFrequency from "./ExercisesFrequency";
import ProgressTracker from "./ProgressTracker";
import MusclesUsage from "./MusclesUsage";
import AdviceContainer from "./AdviceContainer";
import "./DashBoard.css";

const DashBoard = () => (
  <main>
    <Header />
    <div id="Dashboard-Container">
      <div id="Dashboard-Content">
        <div id="welcome-message">
          <h1>Bienvenue sur votre Tableau de Bord</h1>
          <p>Votre espace personnel pour suivre vos progrès sportifs</p>
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
        <div id="advice">
          <AdviceContainer />
        </div>
      </div>
    </div>
  </main>
);

export default DashBoard;
