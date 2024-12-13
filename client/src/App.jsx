import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import App from "./app";
import ProtectedRoute from "./routes";
import Loader from "./components/shared/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getRoles } from "./services/role";
import { getInsights } from "./services/insights";
import { getDepartments } from "./services/department";
import { Toaster } from "react-hot-toast";

const RootApp = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated
  );

  useEffect(() => {
    getDepartments(dispatch);
    if (isAuthenticated) {
      getRoles(dispatch);
      getInsights(dispatch);
    }
  }, [dispatch, isAuthenticated]);

  return (
    <Suspense fallback={<Loader />}>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/hrms/*" element={<App />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default RootApp;
