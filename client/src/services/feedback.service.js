import toast from "react-hot-toast";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios/axiosInstance";

// Fetch Feedbacks
export const getFeedbacks = createAsyncThunk(
  "feedbacks/getFeedbacks",
  async ({ review, currentPage, limit = 13 }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams({
        page: currentPage,
        review: review || "",
        limit: limit || "",
      }).toString();

      const { data } = await axiosInstance.get(`/feedbacks?${queryParams}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message ||
          "Failed to fetch feedbacks"
      );
    }
  }
);

// Create Feedbacks
export const createFeedback = createAsyncThunk(
  "feedbacks/createFeedback",
  async (feedback, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/feedbacks", feedback);
      toast.success(data.message);
      return data;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(
        error.response?.data.message ||
          "Failed to create feedback"
      );
    }
  }
);
