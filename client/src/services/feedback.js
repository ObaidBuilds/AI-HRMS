import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL, useGetToken } from "../utils";
import toast from "react-hot-toast";

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
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message ||
          "Failed to fetch employees on leave today"
      );
    }
  }
);

// Create Feedbacks
export const createFeedback = createAsyncThunk(
  "feedbacks/createFeedback",
  async (feedback, { rejectWithValue }) => {
    const token = useGetToken();
    try {
      const { data } = await axios.post(`${URL}/feedbacks`, feedback, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(data.message)
      return data;
    } catch (error) {
      toast.error(error.response?.data.message)
      return rejectWithValue(
        error.response?.data.message ||
          "Failed to fetch employees on leave today"
      );
    }
  }
);
