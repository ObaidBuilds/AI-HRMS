import { createSlice } from "@reduxjs/toolkit";
import { createJob, getJobOpenings } from "../services/recruitment.service";

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
      });
  },
});

export default recruitmentSlice.reducer;
