import axiosInstance from "../axios/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Get attendance list
export const getAttendanceList = createAsyncThunk(
  "attendance/getAttendanceList",
  async (department, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams({
        department: department || "",
      }).toString();

      const { data } = await axiosInstance.get(`/attendance/?${queryParams}`);
      return data.employees;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "client : " + error.message
      );
    }
  }
);

// Mark Attendance
export const markAttendance = createAsyncThunk(
  "attendance/markAttendance",
  async (attendanceRecords, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/attendance/mark", {
        attendanceRecords,
      });
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data.message || "An error occurred.");
      return rejectWithValue(
        error.response?.data.message || "client : " + error.message
      );
    }
  }
);

// Get all employees attendance
export const getEmployeeAttendance = createAsyncThunk(
  "attendance/getEmployeeAttendance",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/attendance/employee");
      return data.attendance;
    } catch (error) {
      console.log(error.response?.data.message || "An error occurred.");
      return rejectWithValue(
        error.response?.data.message || "client : " + error.message
      );
    }
  }
);
