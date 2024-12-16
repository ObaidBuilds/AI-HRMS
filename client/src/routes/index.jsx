import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useGetToken } from "../utils";

const ProtectedRoute = () => {
  const admin = useSelector((state) => state.authentication.admin);
  const session = useGetToken();

  return session && admin ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
