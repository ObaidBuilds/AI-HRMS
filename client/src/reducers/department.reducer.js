import { createSlice } from "@reduxjs/toolkit";
import {
  createDepartment,
  getAllEmployeesForHead,
  getDepartments,
  updateDepartment,
} from "../services/department.service";

const initialState = {
  departments: [],
  heads: [],
  loading: false,
  error: null,
};

const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling the getDepartments action
      .addCase(getDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDepartments.fulfilled, (state, action) => {
        state.departments = action.payload;
        state.loading = false;
      })
      .addCase(getDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch departments";
      })

      // Handling the getAllEmployeesForHead action
      .addCase(getAllEmployeesForHead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEmployeesForHead.fulfilled, (state, action) => {
        state.heads = action.payload;
        state.loading = false;
      })
      .addCase(getAllEmployeesForHead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch heads";
      })

      // Handling the updateDepartment action
      .addCase(updateDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDepartment.fulfilled, (state, action) => {
        const updatedDepartments = [...state.departments]
        const findIndex = updatedDepartments.findIndex(
          (department) => department._id === action.payload._id
        );
        if(findIndex !== -1){
          updatedDepartments[findIndex] = action.payload
          state.departments = updatedDepartments
        }
        state.loading = false;
      })
      .addCase(updateDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch heads";
      })

      // Handling the createDepartment action
      .addCase(createDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.departments = [...state.departments, action.payload];
        state.loading = false;
      })
      .addCase(createDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch heads";
      });
  },
});

export default departmentSlice.reducer;
