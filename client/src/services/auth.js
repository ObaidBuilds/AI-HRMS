import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { URL, useGetToken } from "../utils";

//  Login
export const login = createAsyncThunk(
  "auth/loginAdmin",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${URL}/auth/login`, credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      sessionStorage.setItem("session", data.token);
      toast.success(data.message);
      return data.user;
    } catch (error) {
      toast.error(error.response?.data.message || "Client : " + error.message);
      return rejectWithValue(
        error.response?.data.message || "Client : " + error.message
      );
    }
  }
);

//  Update Password
export const updatePassword = async (setLoading, credentials) => {
  const token = useGetToken();
  setLoading(true);
  try {
    const { data } = await axios.patch(
      `${URL}/auth/password`,
      { credentials },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success(data.message);
    return data.success;
  } catch (error) {
    toast.error(error.response?.data.message || "Client : " + error.message);
  } finally {
    setLoading(false);
  }
};

// Logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    const token = useGetToken();
    try {
      const { data } = await axios.get(`${URL}/auth/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(data.message);
      return data.success;
    } catch (error) {
      toast.error(error.response?.data.message || "Client : " + error.message);
      return rejectWithValue(
        error.response?.data.message || "Client : " + error.message
      );
    }
  }
);
