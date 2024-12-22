import axios from "axios";
import { URL, useGetToken } from "../utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Get attendance lis
export const getAttendanceList = createAsyncThunk(
  "attendance/getAttendanceList",
  async (department, { rejectWithValue }) => {
    const token = useGetToken();
    try {
      const queryParams = new URLSearchParams({
        department: department || "",
      }).toString();

      const { data } = await axios.get(`${URL}/attendance/?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
    const token = useGetToken();
    try {
      const { data } = await axios.post(
        `${URL}/attendance/mark`,
        { attendanceRecords },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
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
