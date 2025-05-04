import "typeface-poppins";
import Login from "./auth/Login";
import AdminApp from "./app/admin";
import useGetToken from "./hooks";
import EmployeeApp from "./app/employee";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "./context";
import { Suspense, useEffect, useState } from "react";
import Loader from "./components/shared/loaders/Loader";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Navigate, Route, Routes } from "react-router-dom";
import ForgetPassword from "./auth/ForgetPassword";
import EmailConfirmation from "./auth/EmailConfirmation";
import ResetPassword from "./auth/ResetPassword";
import InvalidResetLink from "./auth/InvalidResetLink";
import { checkAuthorityValidity } from "./services/authentication.service";
import ComponentLoader from "./components/shared/loaders/ComponentLoader";
import { clearState } from "./reducers/authentication.reducer";

function HrmsForMetroCashAndCarry() {
  const token = useGetToken();
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(null);
  const { user } = useSelector((state) => state.authentication);

  useEffect(() => {
    const validate = async () => {
      if (user && token) {
        const result = await checkAuthorityValidity(
          user._id,
          user.authority,
          token
        );
        setIsValid(result);
      } else {
        setIsValid(false);
      }
    };

    validate();
  }, [user, token]);

  useEffect(() => {
    if (isValid === false) {
      dispatch(clearState());
    }
  }, [isValid, dispatch]);

  if (isValid === null) return <ComponentLoader />;

  if (!isValid) return <AuthRouter />;

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
      <Route path="/forget/password" element={<ForgetPassword />} />
      <Route path="/reset/password" element={<ResetPassword />} />
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
