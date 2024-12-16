import App from "./app";
import ProtectedRoute from "./routes";
import Login from "./pages/auth/Login";
import { Toaster } from "react-hot-toast";
import { getRoles } from "./services/role";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/shared/Loader";
import React, { Suspense, useEffect } from "react";
import { getDepartments } from "./services/department";
import { useDispatch, useSelector } from "react-redux";
import { getInsights } from "./services/insights";
import { useGetToken } from "./utils";

const RootApp = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.authentication.admin);
  const token = useGetToken();
  useEffect(() => {
    dispatch(getDepartments());

    if (token && isAuthenticated) {
      dispatch(getRoles());
      dispatch(getInsights());
    }
  }, [dispatch, isAuthenticated, token]);

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
