import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios/axiosInstance";

// Fetch Payroll
export const getAllPayrolls = createAsyncThunk(
  "payroll/getAllPayrolls",
  async ({ currentPage }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams({
        page: currentPage,
        month: 3,
      }).toString();

      const { data } = await axiosInstance.get(`/payrolls?${queryParams}`);
      return data;
    } catch (error) {
      console.error(error.response?.data.message || "Failed to fetch payroll");
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch payroll"
      );
    }
  }
);
