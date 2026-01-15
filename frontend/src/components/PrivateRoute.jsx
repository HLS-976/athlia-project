import { Navigate, useLocation } from "react-router-dom";

/**
 * PrivateRoute component
 *
 * This component protects routes that require authentication.
 *
 * - If the user is authenticated, it renders the child components.
 * - Otherwise, it redirects to the login page and passes the current path as a redirect parameter.
 *
 * The returned JSX will either render the protected content or trigger a redirect.
 */
function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  const location = useLocation();

  return (
    // If authenticated, render children; else, redirect to login with redirect param
    isAuthenticated ? (
      // Protected content
      children
    ) : (
      // Redirect to login page with redirect parameter
      <Navigate to={`/login?redirect=${location.pathname}`} replace />
    )
  );
}

export default PrivateRoute;
