import { createSlice } from "@reduxjs/toolkit";
import { getFeedbacks } from "../../services/feedback";

const initialState = {
  feedbacks: [],
  loading: false,
  error: null,
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling getFeedbacks action
      .addCase(getFeedbacks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeedbacks.fulfilled, (state, action) => {
        state.feedbacks = action.payload;
        state.loading = false;
      })
      .addCase(getFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch leaves";
      });
  },
});

export default feedbackSlice.reducer;
