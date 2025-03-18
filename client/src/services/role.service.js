import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios/axiosInstance";
import toast from "react-hot-toast";

// Fetch Roles
export const getRoles = createAsyncThunk(
  "role/getRoles",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/roles");
      return data.role;
    } catch (error) {
      console.error(error || "Failed to fetch roles");
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch roles"
      );
    }
  }
);

// Update Role
export const updateRole = createAsyncThunk(
  "role/updateRole",
  async ({ id, role }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(`/roles/${id}`, role);
      toast.success(data.message);
      return data.role;
    } catch (error) {
      console.error(error || "Failed to fetch role");
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch role"
      );
    }
  }
);

// Create Role
export const createRole = createAsyncThunk(
  "role/createRole",
  async (role, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/roles`, role);
      toast.success(data.message);
      return data.role;
    } catch (error) {
      console.error(error || "Failed to fetch role");
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch role"
      );
    }
  }
);
