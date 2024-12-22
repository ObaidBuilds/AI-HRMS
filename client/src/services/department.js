import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../utils";

// Fetch Departments
export const getDepartments = createAsyncThunk(
  "department/getDepartments",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${URL}/departments`);
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
