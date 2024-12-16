import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { URL, configuration } from "../utils";

// Admin login
export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${URL}/auth/login`,
        credentials,
        configuration
      );
      sessionStorage.setItem("session", data.token);
      toast.success(data.message);
      return data.admin;
    } catch (error) {
      toast.error(error.response?.data.message || "Client : " + error.message);
      return rejectWithValue(
        error.response?.data.message || "Client : " + error.message
      );
    }
  }
);

// Admin logout
export const logoutAdmin = createAsyncThunk(
  "auth/logoutAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${URL}/auth/logout`, configuration);
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
