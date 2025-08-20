import toast from "react-hot-toast";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios/axiosInstance";

// Fetch Departments
export const getDepartments = createAsyncThunk(
  "department/getDepartments",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/departments`);
      return data.department;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch departments"
      );
    }
  }
);

// Fetch Head
export const getAllEmployeesForHead = createAsyncThunk(
  "department/getAllEmployeesForHead",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/departments/head`);
      return data.employees;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch heads"
      );
    }
  }
);

// Update Department
export const updateDepartment = createAsyncThunk(
  "department/updateDepartment",
  async ({ id, department }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(
        `/departments/${id}`,
        department
      );
      toast.success(data.message);
      return data.department;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to update department"
      );
    }
  }
);

// Create Department
export const createDepartment = createAsyncThunk(
  "department/createDepartment",
  async (department, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/departments`, department);
      toast.success(data.message);
      return data.department;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to create department"
      );
    }
  }
);
