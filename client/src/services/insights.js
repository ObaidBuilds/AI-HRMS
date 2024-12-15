import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { configuration, URL } from "../utils";

// Fetch quick insights using createAsyncThunk
export const getInsights = createAsyncThunk(
  "insight/getInsights",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${URL}/insights`, configuration);
      return data.insights;
    } catch (error) {
      console.error(
        error.response?.data.message || "Client : " + error.message
      );
      return rejectWithValue(
        error.response?.data.message || "Client : " + error.message
      ); // Handle error
    }
  }
);
