import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  // Check if the user is logged in by verifying the token
  if (!auth.token) {
    return <Navigate to="/login" />;
  }

  // Check if the user is an editor and trying to access a restricted route
  if (auth.role === "editor" && location.pathname !== "/upload") {
    return <Navigate to="/unauthorized" />;
  }

  // If the user is an admin or an editor accessing the allowed route, render the children
  return children;
};

export default PrivateRoute;
