import toast from "react-hot-toast";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios/axiosInstance";

// Fetch Leaves by Status
export const getLeavesByStatus = createAsyncThunk(
  "leaves/getLeavesByStatus",
  async (status, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/leaves?status=${status}`);
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
  async (date, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/leaves/employee?date=${date}`);
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
      const { data } = await axiosInstance.post(`/leaves`, leave);
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
      const { data } = await axiosInstance.patch(`/leaves/${leaveID}`, {
        remarks,
        status,
      });
      console.log(data)
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

// Assign Substitute
export const assignSustitute = createAsyncThunk(
  "leaves/assignSustitute",
  async ({ leaveId, employee }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(
        `/leaves/${leaveId}/substitute`,
        {
          employee,
        }
      );
      toast.success(data.message);
      return data.leave;
    } catch (error) {
      toast.success(error.response?.data.message);
      return rejectWithValue(
        error.response?.data.message || "Failed to assign sustitute"
      );
    }
  }
);
