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
      console.error(error || error.message);
      return rejectWithValue(error.response?.data.message || error.message);
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
      console.error(error || error.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

// Fetch updates using createAsyncThunk
export const getUpdates = createAsyncThunk(
  "insight/getUpdates",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/insights/updates");
      return data.updates;
    } catch (error) {
      console.error(error || error.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);
