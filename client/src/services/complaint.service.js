import toast from "react-hot-toast";
import axiosInstance from "../axios/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch Complaints
export const getComplaints = createAsyncThunk(
  "complaints/getComplaints",
  async ({ status, currentPage, limit = 10 }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams({
        status: status || "",
        page: currentPage,
        limit: limit || "",
      }).toString();

      const { data } = await axiosInstance.get(`/complaints?${queryParams}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch complaints"
      );
    }
  }
);

// Create  Compaints
export const createComplaint = createAsyncThunk(
  "complaints/createComplaint",
  async (complaint, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/complaints", complaint);
      toast.success(data.message);
      return data.leave;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(
        error.response?.data.message || "Failed to create complaint"
      );
    }
  }
);

// Respond to Compaints's  (approve or reject)
export const respondToComplaintRequest = createAsyncThunk(
  "complaints/respondToComplaintRequest",
  async ({ complaintID, status, remarks }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(`/complaints/${complaintID}`, {
        remarks,
        status,
      });
      toast.success(data.message);
      return data.complaint;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(
        error.response?.data.message || "Failed to respond to complaint"
      );
    }
  }
);
