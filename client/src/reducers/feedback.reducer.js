import { createSlice } from "@reduxjs/toolkit";
import { createFeedback, getFeedbacks } from "../services/feedback.service";

const initialState = {
  feedbacks: [],
  pagination: null,
  loading: false,
  error: null,
  fetch: true,
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setFetchFlag: (state, action) => {
      state.fetch = action.payload;
    },
  },
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
        state.fetch = false;
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
        state.fetch = true;
      })
      .addCase(createFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFetchFlag } = feedbackSlice.actions;
export default feedbackSlice.reducer;
