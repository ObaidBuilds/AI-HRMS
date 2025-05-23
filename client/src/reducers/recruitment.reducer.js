import { createSlice } from "@reduxjs/toolkit";
import {
  createJob,
  createJobApplication,
  getJobApplicants,
  getJobOpenings,
} from "../services/recruitment.service";

const initialState = {
  jobs: [],
  jobApplications: [],
  loading: false,
  error: null,
};

const recruitmentSlice = createSlice({
  name: "recruitment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling the createJob action
      .addCase(createJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.jobs = [...state.jobs, action.payload];
        state.loading = false;
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create job";
      })

      // Handling the createJobApplication action
      .addCase(createJobApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createJobApplication.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createJobApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create application";
      })

      // Handling the getJobOpenings action
      .addCase(getJobOpenings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJobOpenings.fulfilled, (state, action) => {
        state.jobs = action.payload;
        state.loading = false;
      })
      .addCase(getJobOpenings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch job";
      })
      // Handling the getJobApplicants action
      .addCase(getJobApplicants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJobApplicants.fulfilled, (state, action) => {
        state.jobApplications = action.payload;
        state.loading = false;
      })
      .addCase(getJobApplicants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch applications";
      });
  },
});

export default recruitmentSlice.reducer;
