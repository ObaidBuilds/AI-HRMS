import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// Fetch Leaves by Status
export const getLeavesByStatus = createAsyncThunk(
  "leaves/getLeavesByStatus",
  async (status, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/leaves?status=${status}`);
      return data.leaves;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch leaves"
      );
    }
  }
);

// Fetch Employees on Leave Today
export const getEmployeesOnLeave = createAsyncThunk(
  "leaves/getEmployeesOnLeaveToday",
  async (status, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/leaves/employee?date=${status}`);
      return data.leaves;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message ||
          "Failed to fetch employees on leave today"
      );
    }
  }
);

// Appy for Leave
export const createLeave = createAsyncThunk(
  "leaves/createLeave",
  async (leave, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/leaves`, leave);
      toast.success(data.message);
      return data.leave;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(
        error.response?.data.message || "Failed to respond to leave request"
      );
    }
  }
);

// Respond to Employee's Leave Request (approve or reject)
export const respondToLeaveRequest = createAsyncThunk(
  "leaves/respondToLeaveRequest",
  async ({ leaveID, status, remarks }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `/leaves/${leaveID}?status=${status}`,
        { remarks }
      );
      toast.success(data.message);
      return data.leave;
    } catch (error) {
      toast.success(error.response?.data.message);
      return rejectWithValue(
        error.response?.data.message || "Failed to respond to leave request"
      );
    }
  }
);
