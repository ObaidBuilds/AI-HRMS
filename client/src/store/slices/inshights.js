import { createSlice } from "@reduxjs/toolkit";
import { getInsights } from "../../services/insights";

const initialState = {
  insights: null,
  loading: false,
  error: null,
};

const insightSlice = createSlice({
  name: "insight",
  initialState,
  reducers: {
    // Additional reducers can be added if needed
  },
  extraReducers: (builder) => {
    builder
      // Handling the getInsights action
      .addCase(getInsights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInsights.fulfilled, (state, action) => {
        state.loading = false;
        state.insights = action.payload;
      })
      .addCase(getInsights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch insights";
      });
  },
});

export default insightSlice.reducer;
