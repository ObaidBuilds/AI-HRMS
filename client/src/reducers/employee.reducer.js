import { createSlice } from "@reduxjs/toolkit";
import {
  getAllEmployees,
  getEmployeeById,
  addEmployee,
  editEmployee,
  deleteEmployee,
  bulkUploadEmployees,
} from "../services/employee.service";

const initialState = {
  employees: [],
  pagination: null,
  employee: null,
  loading: false,
  error: null,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle getAllEmployees async action
      .addCase(getAllEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload.employees;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle getEmployeeById async action
      .addCase(getEmployeeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployeeById.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = action.payload;
      })
      .addCase(getEmployeeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle addEmployee async action
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.push(action.payload);
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle bulkUploadEmployee async action
      .addCase(bulkUploadEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bulkUploadEmployees.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(bulkUploadEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle editEmployee async action
      .addCase(editEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editEmployee.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.employees.findIndex(
          (employee) => employee._id === action.payload._id
        );
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })
      .addCase(editEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle deleteEmployee async action
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = state.employees.filter(
          (employee) => employee._id !== action.payload
        );
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default employeeSlice.reducer;
