import Header from "./Header";
import { Link } from "react-router-dom";
import CardsFeatures from "./CardsFeatures";
import "./HomePage.css";

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
            <Link to="/login">
              <button id="Get-Started">Get Started</button>
            </Link>
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
