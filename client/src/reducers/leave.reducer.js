import { createSlice } from "@reduxjs/toolkit";
import {
  createLeave,
  assignSustitute,
  getLeavesByStatus,
  getEmployeesOnLeave,
  respondToLeaveRequest,
} from "../services/leave.service";

const initialState = {
  leaves: [],
  employeesOnLeaveToday: [],
  loading: false,
  error: null,
  fetch: true,
};

const leavesSlice = createSlice({
  name: "leave",
  initialState,
  reducers: {
    setFetchFlag: (state, action) => {
      state.fetch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling getLeavesByStatus action
      .addCase(getLeavesByStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLeavesByStatus.fulfilled, (state, action) => {
        state.fetch = false;
        state.loading = false;
        state.leaves = action.payload;
      })
      .addCase(getLeavesByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
        state.error = action.payload;
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
        state.error = action.payload;
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
        state.error = action.payload;
      })

      // Handling assignSubstitute action
      .addCase(assignSustitute.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignSustitute.fulfilled, (state, action) => {
        const index = state.employeesOnLeaveToday.findIndex(
          (emp) => emp._id === action.payload._id
        );

        if (index !== -1) {
          state.employeesOnLeaveToday[index] = action.payload;
        }
        state.loading = false;
      })

      .addCase(assignSustitute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFetchFlag } = leavesSlice.actions;
export default leavesSlice.reducer;
