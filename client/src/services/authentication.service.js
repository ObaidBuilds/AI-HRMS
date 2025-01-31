import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../axios/axiosInstance";

//  Login
export const login = createAsyncThunk(
  "auth/loginAdmin",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/auth/login", credentials);
      console.log();
      if (data.user.remember) localStorage.setItem("session", data.token);
      else sessionStorage.setItem("session", data.token);
      localStorage.setItem("remember", data.user.remember);
      toast.success(data.message);
      return data.user;
    } catch (error) {
      toast.error(error.response?.data.message || "client : " + error.message);
      return rejectWithValue(
        error.response?.data.message || "client : " + error.message
      );
    }
  }
);

//  Update Password
export const updatePassword = async (setLoading, credentials) => {
  setLoading(true);
  try {
    const { data } = await axiosInstance.patch("/auth/password", credentials);
    toast.success(data.message);
    return data.success;
  } catch (error) {
    toast.error(error.response?.data.message || "client : " + error.message);
  } finally {
    setLoading(false);
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
      toast.error(error.response?.data.message || "client : " + error.message);
      return rejectWithValue(
        error.response?.data.message || "client : " + error.message
      );
    }
  }
);
