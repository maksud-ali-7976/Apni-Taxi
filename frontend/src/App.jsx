import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import Home from "./page/Home";
import Dashboard from "./page/Admin/DashBoard";
import Drivers from "./page/Admin/Drivers";
import React, { Suspense, useEffect } from "react";
import Loader from "./utils/Loader";
import { Toaster } from "react-hot-toast";
import Protected from "./middleware/Protected";
import EmailVerify from "./page/EmailVerify";
import SignIn from "./page/SignIn";
import PublicRoute from "./middleware/Public";
import { useDispatch } from "react-redux";

import { checkAuth } from "./toolkit/thunk/user";
import ThankYou from "./page/ThankYou";
import BookedRide from "./page/Admin/BookedRide";
import ProtectedRoute from "./middleware/Protected";
import ForgotPassword from "./page/FrogotPassword";
import ResetPass from "./page/ResetPass";

const SignUp = React.lazy(() => import("./page/SignUp"));
function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (
      !location.pathname == "localhost:5173/login" &&
      !location.pathname == "localhost:5173/signup" &&
      location.pathname == "localhost:5173/reset-password/:token"
    )
      dispatch(checkAuth());
  }, [dispatch, location.pathname]);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/verify-email" element={<EmailVerify />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPass />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
            <Route index element={<Home />} />
            <Route path="/check-out" element={<ThankYou />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin">
              <Route index element={<Dashboard />} />
              <Route path="drivers" element={<Drivers />} />
              <Route path="booked-rides" element={<BookedRide />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
      <Toaster />
    </>
  );
}

export default React.memo(App);
