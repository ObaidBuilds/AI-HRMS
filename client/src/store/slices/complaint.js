import { createSlice } from "@reduxjs/toolkit";
import {
  getComplaints,
  respondToComplaintRequest,
} from "../../services/complaint";

const initialState = {
  complaints: [],
  pagination: null,
  loading: false,
  error: null,
};

const complaintsSlice = createSlice({
  name: "complaints",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle getComplaints action
    builder
      .addCase(getComplaints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getComplaints.fulfilled, (state, action) => {
        state.loading = false;
        state.complaints = action.payload.complaint;
        state.pagination = action.payload.pagination;
      })
      .addCase(getComplaints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch complaints";
      });

    // Handle respondToComplaintRequest action
    builder
      .addCase(respondToComplaintRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(respondToComplaintRequest.fulfilled, (state, action) => {
        state.loading = false;
        const updatedComplaints = state.complaints.map((complaint) =>
          complaint._id === action.payload._id
            ? {
                ...complaint,
                status: action.payload.status,
                remarks: action.payload.remarks,
              }
            : complaint
        );
        state.complaints = updatedComplaints;
      })
      .addCase(respondToComplaintRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to respond to the complaint";
      });
  },
});

export default complaintsSlice.reducer;
