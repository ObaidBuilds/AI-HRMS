import { createSlice } from "@reduxjs/toolkit";
import { getAllPayrolls, updatePayroll } from "../services/payroll.service";

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
      })

      // Handling the updatePayroll action
      .addCase(updatePayroll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePayroll.fulfilled, (state, action) => {
        const updatedPayroll = [...state.payrolls];
        const findIndex = updatedPayroll.findIndex(
          (payroll) => payroll._id == action.payload._id
        );
        if (findIndex !== -1) {
          updatedPayroll[findIndex] = action.payload;
          state.payrolls = updatedPayroll;
        }
        state.loading = false;
      })
      .addCase(updatePayroll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update perfromance";
      });
  },
});

export default payrollSlice.reducer;
