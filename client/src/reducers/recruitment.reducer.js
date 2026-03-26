import { createSlice } from "@reduxjs/toolkit";
import {
  updateJob,
  createJob,
  getJobOpenings,
  getJobApplicants,
  updateApplication,
  inviteForInterview,
  createJobApplication,
} from "../services/recruitment.service";

const initialState = {
  jobs: [],
  jobApplications: [],
  loading: false,
  error: null,
  fetch: true,
};

const recruitmentSlice = createSlice({
  name: "recruitment",
  initialState,
  reducers: {
    setFetchFlag: (state, action) => {
      state.fetch = action.payload;
    },
  },
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
        state.error = action.payload;
      })

      // Handling the updateJob action
      .addCase(updateJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        const index = state.jobs.findIndex(
          (job) => job._id === action.payload._id
        );

        if (index !== -1) {
          state.jobs[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
        state.error = action.payload;
      })

      // Handling the getJobOpenings action
      .addCase(getJobOpenings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJobOpenings.fulfilled, (state, action) => {
        state.jobs = action.payload;
        state.loading = false;
        state.fetch = false;
        state.fetch = false;
      })
      .addCase(getJobOpenings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
        state.error = action.payload;
      })

      // Handling the updateApplication action
      .addCase(updateApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateApplication.fulfilled, (state, action) => {
        const index = state.jobApplications.findIndex(
          (applicant) => applicant._id === action.payload._id
        );

        if (index !== -1) {
          state.jobApplications[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling the inviteForInterview action
      .addCase(inviteForInterview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(inviteForInterview.fulfilled, (state, action) => {
        const index = state.jobApplications.findIndex(
          (applicant) => applicant._id === action.payload._id
        );

        if (index !== -1) {
          state.jobApplications[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(inviteForInterview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFetchFlag } = recruitmentSlice.actions;
export default recruitmentSlice.reducer;
