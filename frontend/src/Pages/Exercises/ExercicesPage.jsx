import Header from "./Header";
import "./ExercicesPage.css";

/**
 * HomePage component
 *
 * This component displays the main landing page of the application.
 *
 * - The returned JSX contains:
 *   - The header bar at the top.
 *   - A main section with the title and presentation text.
 *   - Two main buttons: "Get Started" (links to login) and "Explore Features".
 *   - A section with feature cards (CardsFeatures component).
 */
const tittle = "Transform your body with Athlia";
const presentation =
  "Discover personalized sports exercises, track your progress, and reach your goals with a clean and motivating platform designed for athletes and beginners alike even with your injuries";

const HomePage = () => {
  return (
    <main>
      <header>
        <Header />
      </header>
      <div id="HomePage">
        <div id="home">
          <h1 id="tittle">{tittle}</h1>
          <p id="presentation">{presentation}</p>
          <div id="Home-Button">
            <button id="Explore-Features">Explore Features</button>
          </div>
        </div>
        <div id="HomeCards">
          <CardsFeatures />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
