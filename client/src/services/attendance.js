import axios from "axios";
import { URL, configuration } from "../utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Get attendance lis
export const getAttendanceList = createAsyncThunk(
  "attendance/getAttendanceList",
  async (department, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams({
        department: department || "",
      }).toString();

      const { data } = await axios.get(
        `${URL}/attendance/list?${queryParams}`,
        configuration
      );
      return data.employees;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Client : " + error.message
      );
    }
  }
);

// Fetch all employees
export const markAttendance = createAsyncThunk(
  "attendance/markAttendance",
  async (attendanceRecords, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${URL}/attendance/mark`,
        {attendanceRecords},
        configuration
      );
      toast.success(data.message);
    } catch (error) {
        toast.error(error.response?.data.message || "An error occurred.");
      return rejectWithValue(
        error.response?.data.message || "Client : " + error.message
      );
    }
  }
);
