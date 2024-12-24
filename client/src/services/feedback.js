import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL, useGetToken } from "../utils";

// Fetch Feedbacks
export const getFeedbacks = createAsyncThunk(
  "feedbacks/getFeedbacks",
  async ({ review, currentPage, limit = 10 }, { rejectWithValue }) => {
    const token = useGetToken();
    try {
      const { data } = await axios.get(
        `${URL}/feedbacks?review=${review}&page=${currentPage}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message ||
          "Failed to fetch employees on leave today"
      );
    }
  }
);
