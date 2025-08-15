import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios/axiosInstance";

// Fetch Admin Insight
export const getInsights = createAsyncThunk(
  "insight/getInsights",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/insights");
      return data.insights;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch insights"
      );
    }
  }
);

// Fetch Employee Insights
export const getEmployeeInsights = createAsyncThunk(
  "insight/getEmployeeInsights",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/insights/employee");
      return data.insights;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch insights"
      );
    }
  }
);

// Fetch updates
export const getUpdates = createAsyncThunk(
  "insight/getUpdates",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/insights/updates");
      return data.updates;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch updates"
      );
    }
  }
);
