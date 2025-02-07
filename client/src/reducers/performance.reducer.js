import { createSlice } from "@reduxjs/toolkit";
import { getPerformances } from "../services/performance.service";

const initialState = {
  performances: [],
  pagination : null,
  loading: false,
  error: null,
};

const performanceSlice = createSlice({
  name: "perfromance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling the getPerformances action
      .addCase(getPerformances.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPerformances.fulfilled, (state, action) => {
        state.performances = action.payload.performances;
        state.pagination = action.payload.pagination;
        state.loading = false;
      })
      .addCase(getPerformances.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch roles";
      });
  },
});

export default performanceSlice.reducer;
