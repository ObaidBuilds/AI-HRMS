import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios/axiosInstance";
import toast from "react-hot-toast";

// Fetch Payroll
export const getAllPayrolls = createAsyncThunk(
  "payroll/getAllPayrolls",
  async ({ currentPage, month, isPaid }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams({
        page: currentPage,
        month: month,
        isPaid: isPaid,
      }).toString();

      const { data } = await axiosInstance.get(`/payrolls?${queryParams}`);
      return data;
    } catch (error) {
      console.error(error || "Failed to fetch payroll");
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch payroll"
      );
    }
  }
);

// Mark Payroll Pais
export const markAsPaid = createAsyncThunk(
  "payroll/markAsPaid",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(`/payrolls/${id}/pay`);
      toast.success(data.message);
      return data.payroll;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(
        error.response?.data.message || "Failed to mark payroll"
      );
    }
  }
);

// Update Payroll
export const updatePayroll = createAsyncThunk(
  "payroll/updatePayroll",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(`/payrolls/${id}`, formData);
      toast.success(data.message);
      return data.payroll;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(
        error.response?.data.message || "Failed to update payroll"
      );
    }
  }
);
