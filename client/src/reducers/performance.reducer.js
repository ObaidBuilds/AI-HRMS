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
  fetch: true,
};

const performanceSlice = createSlice({
  name: "performance",
  initialState,
  reducers: {
    setFetchFlag: (state, action) => {
      state.fetch = action.payload;
    },
  },
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
        state.fetch = false;
      })
      .addCase(getPerformances.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling the updatePerformance action
      .addCase(updatePerformance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePerformance.fulfilled, (state, action) => {
        const index = state.performances.findIndex(
          (performance) => performance._id === action.payload._id
        );

        if (index !== -1) {
          state.performances[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updatePerformance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFetchFlag } = performanceSlice.actions;
export default performanceSlice.reducer;
