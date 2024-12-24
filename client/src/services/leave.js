import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL, useGetToken } from "../utils";
import toast from "react-hot-toast";

// Fetch Leaves by Status
export const getLeavesByStatus = createAsyncThunk(
  "leaves/getLeavesByStatus",
  async (status, { rejectWithValue }) => {
    const token = useGetToken();
    try {
      const { data } = await axios.get(`${URL}/leaves?status=${status}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
    const token = useGetToken();
    try {
      const { data } = await axios.get(
        `${URL}/leaves/employee?date=${status}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data.leaves;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message ||
          "Failed to fetch employees on leave today"
      );
    }
  }
);

// Respond to Employee's Leave Request (approve or reject)
export const respondToLeaveRequest = createAsyncThunk(
  "leaves/respondToLeaveRequest",
  async ({ leaveID, status, remarks }, { rejectWithValue }) => {
    const token = useGetToken();
    try {
      const { data } = await axios.patch(
        `${URL}/leaves/${leaveID}?status=${status}`,
        { remarks },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
