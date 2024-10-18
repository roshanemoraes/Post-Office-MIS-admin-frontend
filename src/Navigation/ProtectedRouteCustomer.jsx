import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouteCustomer = ({ element: Component, allowedRoles }) => {
  const userRoles = JSON.parse(localStorage.getItem("userRoles") || "[]"); // Parse roles as an array

  if (!userRoles.length) {
    return <Navigate to="/login" />;
  }

  const hasRequiredRole = allowedRoles.some((role) => userRoles.includes(role));

  return hasRequiredRole ? <Component /> : <Navigate to="/unauthorized" />;
};

export default ProtectedRouteCustomer;
