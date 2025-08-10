import { createSlice } from "@reduxjs/toolkit";
import { getEmployeeInsights, getInsights } from "../services/insights.service";

const initialState = {
  insights: null,
  employeeInsights: null,
  loading: false,
  error: null,
};

const insightSlice = createSlice({
  name: "insight",
  initialState,
  reducers: {},
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
      })

      // Handling the getEmployeeInsights action
      .addCase(getEmployeeInsights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployeeInsights.fulfilled, (state, action) => {
        state.loading = false;
        state.employeeInsights = action.payload;
      })
      .addCase(getEmployeeInsights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch employee insights";
      });
  },
});

export default insightSlice.reducer;
