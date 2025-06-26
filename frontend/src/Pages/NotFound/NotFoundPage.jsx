import "./NotFound.css";
import Header from "./Header";

function NotFound() {
  return (
    <main>
      <header>
        <Header />
      </header>
      <div id="error404">
        <h1 id="tittle">Error</h1>
        <p id="message">This page was not found</p>
      </div>
    </main>
  );
}

export default NotFound;
