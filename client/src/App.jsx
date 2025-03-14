import "typeface-poppins";
import Login from "./auth/Login";
import AdminApp from "./app/admin";
import useGetToken from "./hooks";
import EmployeeApp from "./app/employee";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { ThemeProvider } from "./context";
import { Suspense } from "react";
import Loader from "./components/shared/loaders/Loader";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Navigate, Route, Routes } from "react-router-dom";
import ForgetPassword from "./auth/ForgetPassword";
import EmailConfirmation from "./auth/EmailConfirmation";
import ResetPassword from "./auth/ResetPassword";

function HrmsForMetroCashAndCarry() {
  const { user } = useSelector((state) => state.authentication);
  const token = useGetToken();

  if (!(user && token)) return <AuthRouter />;

  if (user.authority === "admin") return <AdminRouter />;
  else if (user.authority === "employee") return <EmployeeRouter />;

  return <AuthRouter />;
}

function EmployeeRouter() {
  return (
    <Routes>
      <Route path="/*" element={<EmployeeApp />} />
    </Routes>
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
      <Route path="/forget/password" element={<ForgetPassword />} />
      <Route path="/reset/password" element={<ResetPassword />} />
      <Route path="/email/confirmation" element={<EmailConfirmation />} />
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
