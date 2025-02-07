import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios/axiosInstance";

// Fetch Performance
export const getPerformances = createAsyncThunk(
  "performance/getPerformances",
  async (currentPage, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/performance?page=${currentPage}`
      );
      return data;
    } catch (error) {
      console.error(error.response?.data.message || "Failed to fetch roles");
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch roles"
      );
    }
  }
);
