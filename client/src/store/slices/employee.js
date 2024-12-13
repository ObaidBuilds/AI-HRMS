import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
  pagination: null,
  employee: null,
  loading: false,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    // Fetch all employees
    startFetchingEmployees: (state) => {
      state.loading = true;
    },
    setEmployees: (state, action) => {
      state.loading = false;
      state.employees = action.payload.employees;
      state.pagination = action.payload.pagination;
    },
    failFetchingEmployees: (state) => {
      state.loading = false;
    },

    // Fetch a single employee by ID
    startFetchingEmployeeById: (state) => {
      state.loading = true;
    },
    setEmployeeById: (state, action) => {
      state.loading = false;
      state.employee = action.payload;
    },
    failFetchingEmployeeById: (state) => {
      state.loading = false;
    },

    // Add Employee
    startAddingEmployee: (state) => {
      state.loading = true;
    },
    addEmployeeSuccess: (state, action) => {
      state.loading = false;
      state.employees.push(action.payload);
    },
    failAddingEmployee: (state) => {
      state.loading = false;
    },

    // Edit Employee
    startEditingEmployee: (state) => {
      state.loading = true;
    },
    editEmployeeSuccess: (state, action) => {
      state.loading = false;
    },
    failEditingEmployee: (state) => {
      state.loading = false;
    },

    // Delete Employee
    startDeletingEmployee: (state) => {
      state.loading = true;
    },
    deleteEmployeeSuccess: (state, action) => {
      state.loading = false;
    },    
    failDeletingEmployee: (state) => {
      state.loading = false;
    },
  },
});

export const {
  startFetchingEmployees,
  setEmployees,
  failFetchingEmployees,
  startFetchingEmployeeById,
  setEmployeeById,
  failFetchingEmployeeById,
  startAddingEmployee,
  addEmployeeSuccess,
  failAddingEmployee,
  startEditingEmployee,
  editEmployeeSuccess,
  failEditingEmployee,
  startDeletingEmployee,
  deleteEmployeeSuccess,
  failDeletingEmployee,
} = employeeSlice.actions;

export default employeeSlice.reducer;
