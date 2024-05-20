import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = token && user && user.email.endsWith(".org");

  return isAdmin ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
