import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  let { user } = useContext(AuthContext);

  // If user is not authenticated, redirect to login page
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
