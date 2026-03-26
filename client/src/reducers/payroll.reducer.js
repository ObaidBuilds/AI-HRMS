import { createSlice } from "@reduxjs/toolkit";
import {
  markAsPaid,
  updatePayroll,
  getAllPayrolls,
} from "../services/payroll.service";

const initialState = {
  payrolls: [],
  pagination: null,
  loading: false,
  error: null,
  fetch: true,
};

const payrollSlice = createSlice({
  name: "payroll",
  initialState,
  reducers: {
    setFetchFlag: (state, action) => {
      state.fetch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling the getAllPayrolls action
      .addCase(getAllPayrolls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPayrolls.fulfilled, (state, action) => {
        state.fetch = false;
        state.loading = false;
        state.payrolls = action.payload.payrolls;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllPayrolls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling the markAsPaid action
      .addCase(markAsPaid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markAsPaid.fulfilled, (state, action) => {
        const index = state.payrolls.findIndex(
          (payroll) => payroll._id === action.payload._id
        );

        if (index !== -1) {
          state.payrolls[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(markAsPaid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling the updatePayroll action
      .addCase(updatePayroll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePayroll.fulfilled, (state, action) => {
        const index = state.payrolls.findIndex(
          (payroll) => payroll._id === action.payload._id
        );

        if (index !== -1) {
          state.payrolls[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updatePayroll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFetchFlag } = payrollSlice.actions;
export default payrollSlice.reducer;
