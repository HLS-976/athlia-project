import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import Login from "./Pages/Login/LoginPage";
import SignUpPage from "./Pages/Sign_Up/SignUpPage";
import Footer from "./components/Footer";
import Dashboard from "./Pages/Dashboard/DashBoard";
import ExercisesPage from "./Pages/Exercises/ExercisesPage";
import SkeletonPage from "./Pages/Skeleton/SkeletonPage";
import CombinedPage from "./Pages/CombinedPage/CombinedPage";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./Pages/NotFound/NotFoundPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div id="App">
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/exercises"
              element={
                <PrivateRoute>
                  <ExercisesPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/skeleton"
              element={
                <PrivateRoute>
                  <SkeletonPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/combined"
              element={
                <PrivateRoute>
                  <CombinedPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/CombinedPage"
              element={
                <PrivateRoute>
                  <CombinedPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
