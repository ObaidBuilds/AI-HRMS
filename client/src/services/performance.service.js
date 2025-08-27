import toast from "react-hot-toast";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios/axiosInstance";

// Fetch Performance
export const getPerformances = createAsyncThunk(
  "performance/getPerformances",
  async ({ status, currentPage }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams({
        page: currentPage,
        status: status || "",
      }).toString();

      const { data } = await axiosInstance.get(`/performance?${queryParams}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to get performance records"
      );
    }
  }
);

// Fetch Performance
export const updatePerformance = createAsyncThunk(
  "performance/updatePerformance",
  async ({ id, performance }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(
        `/performance/${id}`,
        performance
      );
      toast.success(data.message);
      return data.performance;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(
        error.response?.data.message || "Failed to update performance"
      );
    }
  }
);
