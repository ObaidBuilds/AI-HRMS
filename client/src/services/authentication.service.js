import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../axios/axiosInstance";

//  Login
export const login = createAsyncThunk(
  "auth/loginAdmin",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/auth/login", credentials);
      if (data.user.remember) {
        localStorage.setItem("session", data.token);
        localStorage.setItem("loggedInUser", JSON.stringify(data.user));
      } else {
        sessionStorage.setItem("session", data.token);
        sessionStorage.setItem("loggedInUser", JSON.stringify(data.user));
      }
      localStorage.setItem("remember", data.remember);
      toast.success(data.message);
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

// Forget Password
export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/auth/forget/password", email);
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response?.data.message);
    }
  }
);

//  Update Password
export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch("/auth/password/update", {
        credentials,
      });
      toast.success(data.message);
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response?.data.message);
    }
  }
);

// Set New Password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(
        "/auth/reset/password",
        credentials
      );
      toast.success(data.message);
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response?.data.message);
    }
  }
);

// Check Reset Password
export const checkResetPasswordValidity = async (
  setLoading,
  { employeeId, forgetPasswordToken }
) => {
  const queryParams = new URLSearchParams({
    employeeId: employeeId || "",
    forgetPasswordToken: forgetPasswordToken || "",
  }).toString();

  setLoading(true);

  try {
    const { data } = await axiosInstance.get(
      `/auth/reset/password/validate?${queryParams}`
    );

    return data.success;
  } catch (error) {
    return false;
  } finally {
    setLoading(false);
  }
};

// Check Reset Password
export const checkAuthorityValidity = async (
  employeeId,
  authority,
  session
) => {
  try {
    const { data } = await axiosInstance.post("/auth/authority/check", {
      employeeId,
      authority,
      session,
    });

    return data.success;
  } catch (error) {
    return false;
  }
};

// Logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/auth/logout");
      toast.success(data.message);
      return data.success;
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);
