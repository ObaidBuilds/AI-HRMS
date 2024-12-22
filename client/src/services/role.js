import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL, useGetToken } from "../utils";

// Fetch Roles
export const getRoles = createAsyncThunk(
  "role/getRoles",
  async (_, { rejectWithValue }) => {
    const token = useGetToken();

    try {
      const { data } = await axios.get(`${URL}/roles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.role;
    } catch (error) {
      console.error(error.response?.data.message || "Failed to fetch roles");
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch roles"
      );
    }
  }
);
