import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { configuration, URL } from "../utils";
import toast from "react-hot-toast";

// Fetch Roles
export const getRoles = createAsyncThunk(
  "role/getRoles",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${URL}/roles`, configuration);
      return data.role;
    } catch (error) {
      console.error(error.response?.data.message || "Failed to fetch roles");
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch roles"
      );
    }
  }
);

// Add Role
export const addRole = createAsyncThunk(
  "role/addRole",
  async (role, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${URL}/roles`, role, configuration);
      toast.success(data.message);
      return data.role;
    } catch (error) {
      toast.error(error.response?.data.message || "Failed to add role");
      return rejectWithValue(
        error.response?.data.message || "Failed to add role"
      );
    }
  }
);

// Edit Role
export const editRole = createAsyncThunk(
  "role/editRole",
  async ({ id, role }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `${URL}/roles/${id}`,
        role,
        configuration
      );
      toast.success(data.message);
      return data.role;
    } catch (error) {
      toast.error(error.response?.data.message || "Failed to edit role");
      return rejectWithValue(
        error.response?.data.message || "Failed to edit role"
      );
    }
  }
);

// Delete Role
export const deleteRole = createAsyncThunk(
  "role/deleteRole",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${URL}/roles/${id}`, configuration);
      toast.success(data.message);
      return id;
    } catch (error) {
      toast.error(error.response?.data.message || "Failed to delete role");
      return rejectWithValue(
        error.response?.data.message || "Failed to delete role"
      );
    }
  }
);
