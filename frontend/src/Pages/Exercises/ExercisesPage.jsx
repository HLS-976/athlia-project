import Header from "./Header";
import "./ExercisesPage.css";
import ExercicsesCards from "./ExercicesCards";

const ExercisesPage = () => {
  return (
    <main>
      <header>
        <Header />
      </header>
      <div id="Exercises">
        <ExercicsesCards />
      </div>
    </main>
  );
};

export default ExercisesPage;
