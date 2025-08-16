import "typeface-poppins";
import Login from "./auth/Login";
import AdminApp from "./app/admin";
import EmployeeApp from "./app/employee";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context";
import { useSelector } from "react-redux";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Loader from "./components/shared/loaders/Loader";
import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";

const Career = lazy(() => import("./careers/Career"));
const ResetPassword = lazy(() => import("./auth/ResetPassword"));
const ForgetPassword = lazy(() => import("./auth/ForgetPassword"));
const InvalidResetLink = lazy(() => import("./auth/InvalidResetLink"));
const EmailConfirmation = lazy(() => import("./auth/EmailConfirmation"));

function HrmsForMetroCashAndCarry() {
  const { user } = useSelector((state) => state.authentication);

  useEffect(() => {
    const syncLogout = (event) => {
      if (event.key === "logout") {
        sessionStorage.clear();
        localStorage.clear();

        window.location.href = "/login";
      }
    };

    window.addEventListener("storage", syncLogout);
    return () => {
      window.removeEventListener("storage", syncLogout);
    };
  }, []);

  if (user?.authority === "admin") return <AdminRouter />;
  if (user?.authority === "employee") return <EmployeeRouter />;

  return <AuthRouter />;
}

function EmployeeRouter() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/*" element={<EmployeeApp />} />
      </Routes>
    </ThemeProvider>
  );
}

function AdminRouter() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/*" element={<AdminApp />} />
      </Routes>
    </ThemeProvider>
  );
}

function AuthRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/careers" element={<Career />} />
      <Route path="/reset/password" element={<ResetPassword />} />
      <Route path="/forget/password" element={<ForgetPassword />} />
      <Route path="/email/confirmation" element={<EmailConfirmation />} />
      <Route path="/reset/password/invalid" element={<InvalidResetLink />} />
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
}

const RootApp = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Toaster />
      <HrmsForMetroCashAndCarry />
    </Suspense>
  );
};

export default RootApp;
