import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios/axiosInstance";

// Fetch quick insights using createAsyncThunk
export const getInsights = createAsyncThunk(
  "insight/getInsights",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/insights");
      return data.insights;
    } catch (error) {
      console.error(
        error.response?.data.message || "Client : " + error.message
      );
      return rejectWithValue(
        error.response?.data.message || "Client : " + error.message
      );
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
      console.error(
        error.response?.data.message || "Client : " + error.message
      );
      return rejectWithValue(
        error.response?.data.message || "Client : " + error.message
      );
    }
  }
);
