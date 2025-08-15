import { createSlice } from "@reduxjs/toolkit";
import { createFeedback, getFeedbacks } from "../services/feedback.service";

const initialState = {
  feedbacks: [],
  pagination: null,
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
        state.feedbacks = action.payload.feedback;
        state.pagination = action.payload.pagination;
        state.loading = false;
      })
      .addCase(getFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling createFeedback action
      .addCase(createFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFeedback.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default feedbackSlice.reducer;
