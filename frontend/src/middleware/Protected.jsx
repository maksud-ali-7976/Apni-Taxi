import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, isAuthenticated } = useSelector(
    (state) => ({
      isAuthenticated: state.auth.isAuthenticated,
      user: state.auth.user,
    }),
    shallowEqual
  );
  if (!isAuthenticated && !user?.role) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles?.length > 0 && user?.role && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/UnAuthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
