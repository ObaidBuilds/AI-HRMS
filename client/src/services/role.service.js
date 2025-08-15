import toast from "react-hot-toast";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios/axiosInstance";

// Fetch Roles
export const getRoles = createAsyncThunk(
  "role/getRoles",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/roles");
      return data.role;
    } catch (error) {
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
      return rejectWithValue(
        error.response?.data.message || "Failed to update role"
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
      return rejectWithValue(
        error.response?.data.message || "Failed to create role"
      );
    }
  }
);
