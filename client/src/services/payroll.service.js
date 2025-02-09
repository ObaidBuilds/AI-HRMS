import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios/axiosInstance";

// Fetch Roles
export const getAllPayrolls = createAsyncThunk(
  "payroll/getAllPayrolls",
  async ({ status, currentPage }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams({
        status: status || "",
        page: currentPage,
      }).toString();

      const { data } = await axiosInstance.get(`/payrolls?${queryParams}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch payrolls"
      );
    }
  }
);

// Fetch Roles
export const updatePayroll = createAsyncThunk(
  "payroll/updatePayroll",
  async ({ id, payroll }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/payrolls/${id}`, payroll);
      return data.payroll;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to update payroll"
      );
    }
  }
);
