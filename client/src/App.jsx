import App from "./app/admin";
import "typeface-poppins";
import "animate.css";
import Login from "./pages/auth/Login";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/shared/loaders/Loader";
import React, { Suspense } from "react";
import NotFound from "./components/shared/error/NotFound";
import { useDispatch, useSelector } from "react-redux";
import { useGetToken } from "./utils";
import "@fortawesome/fontawesome-free/css/all.min.css";

function HrmsForMetroCashAndCarry() {
  const { user } = useSelector((state) => state.authentication);
  const token = useGetToken();

  if (!(user && token)) return <AuthRouter />;

  if (user.authority === "admin") return <AdminRouter />;
  else if (user.authority === "employee") return <EmployeeRouter />;

  return <AuthRouter />;
}

function EmployeeRouter() {
  console.log("Employee");
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <div>Hello Employee Router</div>
          </>
        }
      />
    </Routes>
  );
}

function AdminRouter() {
  console.log("Admin");
  return (
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  );
}

function AuthRouter() {
  console.log("Auth");
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
