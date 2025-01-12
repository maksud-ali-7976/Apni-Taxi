import React from "react";
import { useSelector } from "react-redux";

import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  if (isAuthenticated && user && user.role) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default React.memo(PublicRoute);
