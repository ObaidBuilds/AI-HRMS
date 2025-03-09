import { createSlice } from "@reduxjs/toolkit";
import { getAllPayrolls } from "../services/payroll.service";

const initialState = {
  payrolls: [],
  pagination: null,
  loading: false,
  error: null,
};

const payrollSlice = createSlice({
  name: "payroll",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling the getAllPayrolls action
      .addCase(getAllPayrolls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPayrolls.fulfilled, (state, action) => {
        state.payrolls = action.payload.payrolls;
        state.pagination = action.payload.pagination;
        state.loading = false;
      })
      .addCase(getAllPayrolls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch payrolls";
      });
  },
});

export default payrollSlice.reducer;
