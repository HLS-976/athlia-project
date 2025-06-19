import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  const location = useLocation();

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={`/login?redirect=${location.pathname}`} replace />
  );
}

export default PrivateRoute;
