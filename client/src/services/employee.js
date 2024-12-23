import axios from "axios";
import { URL, useGetToken } from "../utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Fetch all employees
export const getAllEmployees = createAsyncThunk(
  "employee/getAllEmployees",
  async ({ currentPage, filters }, { rejectWithValue }) => {
    const token = useGetToken();
    const { department, role, status, name } = filters;

    try {
      const queryParams = new URLSearchParams({
        page: currentPage,
        name: name || "",
        department: department || "",
        role: role || "",
        status: status || "",
      }).toString();

      const { data } = await axios.get(`${URL}/employees?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Client : " + error.message
      );
    }
  }
);

// Fetch a single employee by ID
export const getEmployeeById = createAsyncThunk(
  "employee/getEmployeeById",
  async (id, { rejectWithValue }) => {
    const token = useGetToken();
    try {
      const { data } = await axios.get(`${URL}/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.employee;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Client : " + error.message
      );
    }
  }
);

// Create a new employee
export const addEmployee = createAsyncThunk(
  "employee/addEmployee",
  async (employee, { rejectWithValue }) => {
    const token = useGetToken();
    try {
      const { data } = await axios.post(`${URL}/employees`, employee, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(data.message);
      return data.employee;
    } catch (error) {
      toast.error(error.response?.data.message || "Client : " + error.message);
      return rejectWithValue(
        error.response?.data.message || "Client : " + error.message
      );
    }
  }
);

// Update an existing employee
export const editEmployee = createAsyncThunk(
  "employee/editEmployee",
  async ({ id, employee }, { rejectWithValue }) => {
    const token = useGetToken();
    try {
      const { data } = await axios.patch(`${URL}/employees/${id}`, employee, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(data.message);
      return data.employee;
    } catch (error) {
      toast.error(error.response?.data.message || "Client : " + error.message);
      return rejectWithValue(
        error.response?.data.message || "Client : " + error.message
      );
    }
  }
);

// Delete an employee
export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async (id, { rejectWithValue }) => {
    const token = useGetToken();
    try {
      const { data } = await axios.delete(`${URL}/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(data.message);
      return id;
    } catch (error) {
      toast.error(error.response?.data.message || "Client : " + error.message);
      return rejectWithValue(
        error.response?.data.message || "Client : " + error.message
      );
    }
  }
);
