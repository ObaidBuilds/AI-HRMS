import { createSlice } from "@reduxjs/toolkit";
import {
  getDepartments,
  addDepartment,
  editDepartment,
  deleteDepartment,
} from "../../services/department";

const initialState = {
  departments: [],
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

      // Handling the addDepartment action
      .addCase(addDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDepartment.fulfilled, (state, action) => {
        state.departments.push(action.payload);
        state.loading = false;
      })
      .addCase(addDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add department";
      })

      // Handling the editDepartment action
      .addCase(editDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editDepartment.fulfilled, (state, action) => {
        const index = state.departments.findIndex(
          (dept) => dept.id === action.payload.id
        );
        if (index !== -1) {
          state.departments[index] = {
            ...state.departments[index],
            ...action.payload,
          };
        }
        state.loading = false;
      })
      .addCase(editDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to edit department";
      })

      // Handling the deleteDepartment action
      .addCase(deleteDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.departments = state.departments.filter(
          (dept) => dept.id !== action.payload
        ); // Remove deleted department from state
        state.loading = false;
      })
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete department";
      });
  },
});

export default departmentSlice.reducer;
