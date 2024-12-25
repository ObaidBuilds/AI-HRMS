import { createSlice } from "@reduxjs/toolkit";
import {
  getLeavesByStatus,
  getEmployeesOnLeave,
  respondToLeaveRequest,
} from "../services/leave";

const initialState = {
  leaves: [],
  employeesOnLeaveToday: [],
  loading: false,
  error: null,
};

const leavesSlice = createSlice({
  name: "leave",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling getLeavesByStatus action
      .addCase(getLeavesByStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLeavesByStatus.fulfilled, (state, action) => {
        state.leaves = action.payload;
        state.loading = false;
      })
      .addCase(getLeavesByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch leaves";
      })

      // Handling getEmployeesOnLeave action
      .addCase(getEmployeesOnLeave.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployeesOnLeave.fulfilled, (state, action) => {
        state.employeesOnLeaveToday = action.payload;
        state.loading = false;
      })
      .addCase(getEmployeesOnLeave.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to fetch employees on leave today";
      })

      // Handling respondToLeaveRequest action
      .addCase(respondToLeaveRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(respondToLeaveRequest.fulfilled, (state, action) => {
        const updatedLeave = action.payload;
        const updatedLeaves = state.leaves.map((leave) =>
          leave._id === updatedLeave._id ? updatedLeave : leave
        );
        state.leaves = updatedLeaves;
        state.loading = false;
      })
      .addCase(respondToLeaveRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to respond to leave request";
      });
  },
});

export default leavesSlice.reducer;
