import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios/axiosInstance";
import toast from "react-hot-toast";

// Fetch Departments
export const getDepartments = createAsyncThunk(
  "department/getDepartments",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/departments`);
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

// Fetch Departments
export const getAllEmployeesForHead = createAsyncThunk(
  "department/getAllEmployeesForHead",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/departments/head`);
      return data.employees;
    } catch (error) {
      console.error(error || "Failed to fetch heads");
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch heads"
      );
    }
  }
);

// Update Departments
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
      console.error(error || "Failed to fetch heads");
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch heads"
      );
    }
  }
);

// Fetch Departments
export const createDepartment = createAsyncThunk(
  "department/createDepartment",
  async (department, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/departments`, department);
      toast.success(data.message);
      return data.department;
    } catch (error) {
      console.error(error || "Failed to fetch heads");
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch heads"
      );
    }
  }
);
