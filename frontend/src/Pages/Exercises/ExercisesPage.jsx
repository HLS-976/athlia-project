import React from 'react';
import Header from "./Header";
import "./ExercisesPage.css";
import ExercicsesCards from "./ExercicesCards";

const ExercisesPage = ({ 
  selectedZones = [], 
  onExerciseSelect = null, 
  isExerciseSelected = null,
  showHeader = true
}) => {
  return (
    <main>
      {showHeader && (
        <header>
          <Header />
        </header>
      )}
      <div id="Exercises">
        <ExercicsesCards 
          selectedZones={selectedZones}
          onExerciseSelect={onExerciseSelect}
          isExerciseSelected={isExerciseSelected}
        />
      </div>
    </main>
  );
};

export default ExercisesPage;
