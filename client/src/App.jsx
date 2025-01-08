import "animate.css";
import "typeface-poppins";
import Login from "./auth/Login";
import AdminApp from "./app/admin";
import useGetToken from "./hooks";
import React, { Suspense, useEffect } from "react";
import EmployeeApp from "./app/employee";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/shared/error/NotFound";
import Loader from "./components/shared/loaders/Loader";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { logout } from "./services/auth";

function HrmsForMetroCashAndCarry() {
  const { user } = useSelector((state) => state.authentication);
  const token = useGetToken();

  if (!(user && token)) return <AuthRouter />;

  if (user.authority === "admin") return <AdminRouter />;
  else if (user.authority === "employee") return <EmployeeRouter />;

  return <AuthRouter />;
}

function EmployeeRouter() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleBeforeUnload = async () => {
      try {
        dispatch(logout());
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/*" element={<EmployeeApp />} />
    </Routes>
  );
}

function AdminRouter() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleBeforeUnload = async () => {
      try {
        dispatch(logout());
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/*" element={<AdminApp />} />
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
  return (
    <Suspense fallback={<Loader />}>
      <Toaster />
      <HrmsForMetroCashAndCarry />
    </Suspense>
  );
};

export default RootApp;
