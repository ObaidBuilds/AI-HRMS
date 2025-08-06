import { createSlice } from "@reduxjs/toolkit";
import {
  getLeavesByStatus,
  getEmployeesOnLeave,
  respondToLeaveRequest,
  createLeave,
  assignSustitute,
} from "../services/leave.service";

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

        state.leaves = state.leaves.filter(
          (leave) => leave._id !== updatedLeave._id
        );

        state.loading = false;
      })

      .addCase(respondToLeaveRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to respond to leave request";
      })

      // Handling createLeave action
      .addCase(createLeave.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLeave.fulfilled, (state, action) => {
        state.leaves.push(action.payload);
        state.loading = false;
      })
      .addCase(createLeave.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create leave";
      })

      // Handling assignSubstitute action
      .addCase(assignSustitute.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignSustitute.fulfilled, (state, action) => {
        const updatedLeave = [...state.employeesOnLeaveToday];
        const findIndex = updatedLeave.findIndex(
          (leave) => leave._id == action.payload._id
        );
        if (findIndex !== -1) {
          updatedLeave[findIndex] = action.payload;
          state.employeesOnLeaveToday = updatedLeave;
        }
        state.loading = false;
      })

      .addCase(assignSustitute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to assign substitute";
      });
  },
});

export default leavesSlice.reducer;
