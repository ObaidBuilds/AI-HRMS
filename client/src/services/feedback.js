import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL, useGetToken } from "../utils";

// Fetch Feedbacks
export const getFeedbacks = createAsyncThunk(
  "feedbacks/getFeedbacks",
  async (review, { rejectWithValue }) => {
    const token = useGetToken();
    console.log(review);
    try {
      const { data } = await axios.get(`${URL}/feedbacks?review=${review}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.feedback;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message ||
          "Failed to fetch employees on leave today"
      );
    }
  }
);
