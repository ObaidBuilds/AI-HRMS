import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL, useGetToken } from "../utils";
import toast from "react-hot-toast";

// Fetch Complaints
export const getComplaints = createAsyncThunk(
  "complaints/getComplaints",
  async ({ status, currentPage, limit = 10 }, { rejectWithValue }) => {
    const token = useGetToken();
    try {
      const { data } = await axios.get(
        `${URL}/complaints?status=${status}&page=${currentPage}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
    const token = useGetToken();
    try {
      const { data } = await axios.post(`${URL}/complaints`, complaint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(data.message);
      return data.leave;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(
        error.response?.data.message || "Failed to respond to complaint request"
      );
    }
  }
);

// Respond to Compaints's  (approve or reject)
export const respondToComplaintRequest = createAsyncThunk(
  "complaints/respondToComplaintRequest",
  async ({ complaintID, status, remarks }, { rejectWithValue }) => {
    const token = useGetToken();
    try {
      const { data } = await axios.patch(
        `${URL}/complaints/${complaintID}?status=${status}`,
        { remarks },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(data.message);
      return data.complaint;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(
        error.response?.data.message || "Failed to respond to complaint request"
      );
    }
  }
);
