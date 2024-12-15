import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { configuration, URL } from "../utils";
import toast from "react-hot-toast";

// Fetch Departments
export const getDepartments = createAsyncThunk(
  "department/getDepartments",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${URL}/departments`, configuration);
      return data.department;
    } catch (error) {
      console.error(
        error.response?.data.message || "Failed to fetch departments"
      );
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch departments"
      );
    }
  }
);

// Add Department
export const addDepartment = createAsyncThunk(
  "department/addDepartment",
  async (department, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${URL}/departments`,
        department,
        configuration
      );
      toast.success(data.message);
      return data.department;
    } catch (error) {
      toast.error(error.response?.data.message || "Failed to add department");
      return rejectWithValue(
        error.response?.data.message || "Failed to add department"
      );
    }
  }
);

// Edit Department
export const editDepartment = createAsyncThunk(
  "department/editDepartment",
  async ({ id, department }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `${URL}/departments/${id}`,
        department,
        configuration
      );
      toast.success(data.message);
      return data.department;
    } catch (error) {
      toast.error(error.response?.data.message || "Failed to edit department");
      return rejectWithValue(
        error.response?.data.message || "Failed to edit department"
      );
    }
  }
);

// Delete Department
export const deleteDepartment = createAsyncThunk(
  "department/deleteDepartment",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${URL}/departments/${id}`,
        configuration
      );
      toast.success(data.message);
      return id;
    } catch (error) {
      toast.error(
        error.response?.data.message || "Failed to delete department"
      );
      return rejectWithValue(
        error.response?.data.message || "Failed to delete department"
      );
    }
  }
);
