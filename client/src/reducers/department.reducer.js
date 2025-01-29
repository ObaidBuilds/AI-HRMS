import { createSlice } from "@reduxjs/toolkit";
import {
  getDepartments,
} from "../services/department.service";

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
  },
});

export default departmentSlice.reducer;
