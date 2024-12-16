import App from "./app";
import Login from "./pages/auth/Login";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/shared/Loader";
import React, { Suspense, useEffect } from "react";
import { getDepartments } from "./services/department";
import { useDispatch, useSelector } from "react-redux";
import { useGetToken } from "./utils";
import NotFound from "./components/shared/NotFound";
import { getInsights } from "./services/insights";


function HrmsForMetroCashAndCarry() {
  const isAuthenticated = useSelector((state) => state.authentication.admin);
  const token = useGetToken();

  if (!(isAuthenticated && token)) return <AuthRouter />;
  else return <AppRouter />;
}

function AppRouter() {
 
  return (
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  );
}

function AuthRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const RootApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDepartments());
    dispatch(getInsights());
  }, [dispatch]);

  return (
    <Suspense fallback={<Loader />}>
      <Toaster />
      <HrmsForMetroCashAndCarry />
    </Suspense>
  );
};

export default RootApp;
