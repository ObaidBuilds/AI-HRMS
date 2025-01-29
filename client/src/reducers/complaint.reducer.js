import { createSlice } from "@reduxjs/toolkit";
import {
  createComplaint,
  getComplaints,
  respondToComplaintRequest,
} from "../services/complaint.service";

const initialState = {
  complaints: [],
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
      })
      .addCase(getComplaints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch complaints";
      })

      .addCase(respondToComplaintRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(respondToComplaintRequest.fulfilled, (state, action) => {
        state.loading = false;

        const updatedComplaint = action.payload;

        state.complaints = state.complaints.filter(
          (complaint) => complaint._id !== updatedComplaint._id
        );
      })

      .addCase(respondToComplaintRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to respond to the complaint";
      });

    // Handle createComplaint action
    builder
      .addCase(createComplaint.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComplaint.fulfilled, (state, action) => {
        state.loading = false;
        state.complaints.push(action.payload);
      })
      .addCase(createComplaint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create complaint";
      });
  },
});

export default complaintsSlice.reducer;
