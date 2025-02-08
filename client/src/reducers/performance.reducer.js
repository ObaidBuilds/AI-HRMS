import { createSlice } from "@reduxjs/toolkit";
import {
  getPerformances,
  updatePerformance,
} from "../services/performance.service";

const initialState = {
  performances: [],
  pagination: null,
  loading: false,
  error: null,
};

const performanceSlice = createSlice({
  name: "performance",
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
        state.error = action.payload || "Failed to fetch performance";
      })

      // Handling the updatePerformance action
      .addCase(updatePerformance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePerformance.fulfilled, (state, action) => {
        const updatedPerformance = [...state.performances];
        const findIndex = updatedPerformance.findIndex(
          (perfromance) => perfromance._id == action.payload._id
        );
        if (findIndex !== -1) {
          updatedPerformance[findIndex] = action.payload;
          state.performances = updatedPerformance;
        }
        state.loading = false;
      })
      .addCase(updatePerformance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update perfromance";
      });
  },
});

export default performanceSlice.reducer;
