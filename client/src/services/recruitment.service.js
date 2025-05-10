import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios/axiosInstance";
import toast from "react-hot-toast";

// Fetch Roles
export const createJob = createAsyncThunk(
  "recruitment/createJob",
  async (job, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/recruitment", job);
      toast.success(data.message);
      return data.job;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(
        error.response?.data.message || "Failed to create jobs"
      );
    }
  }
);

// Fetch Roles
export const getJobOpenings = createAsyncThunk(
  "recruitment/getJobPenings",
  async (status, { rejectWithValue }) => {
    // console.log(status)
    try {
      const { data } = await axiosInstance.get(`/recruitment?status=${status}`);
      return data.jobs;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch jobs"
      );
    }
  }
);
