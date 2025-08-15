import toast from "react-hot-toast";
import axiosInstance from "../axios/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { removeQr } from "../reducers/attendance.reducer";

// Get attendance list
export const getAttendanceList = createAsyncThunk(
  "attendance/getAttendanceList",
  async ({ selectedDepartment, selectedDate }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams({
        department: selectedDepartment || "",
        date: selectedDate || "",
      }).toString();

      const { data } = await axiosInstance.get(`/attendance/?${queryParams}`);
      return data.employees;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

// Get attendance data
export const getEmployeeAttendanceByDepartment = createAsyncThunk(
  "attendance/getEmployeeAttendanceByDepartment",
  async ({ selectedDepartment, selectedDate }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams({
        department: selectedDepartment || "",
        date: selectedDate || "",
      }).toString();

      const { data } = await axiosInstance.get(
        `/attendance/department/?${queryParams}`
      );
      return data.attendanceRecord;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
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
      return rejectWithValue(error.response?.data.message || error.message);
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
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

// Mark Attendance
export const generateQRCodeForAttendance = createAsyncThunk(
  "attendance/generateQRCodeForAttendance",
  async ({ latitude, longitude }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/attendance/generate", {
        latitude,
        longitude,
      });
      return data.qrcode;
    } catch (error) {
      toast.error(error.response?.data.message || "An error occurred.");
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

// Mark Attendance using QR
export const markAttendanceUsingQrCode = createAsyncThunk(
  "attendance/markAttendanceUsingQrCode",
  async ({ dispatch, qrcode }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/attendance/mark/qr", {
        qrcode,
      });
      if (data.success) {
        dispatch(removeQr());
      }
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data.message || "An error occurred.");
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);
