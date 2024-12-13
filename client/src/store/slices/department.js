import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departments: [],
  loading: false,
};

const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    // Fetch Departments
    startFetchDepartment(state) {
      state.loading = true;
    },
    setDepartment(state, action) {
      state.departments = action.payload;
      state.loading = false;
    },
    failFetchingDepartments(state) {
      state.loading = false;
    },

    // Add Department
    startAddDepartment(state) {
      state.loading = true;
    },
    addDepartmentSuccess(state, action) {
      state.departments.push(action.payload);
      state.loading = false;
    },
    addDepartmentFail(state) {
      state.loading = false;
    },

    // Edit Department
    startEditDepartment(state) {
      state.loading = true;
    },
    editDepartmentSuccess(state, action) {
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
    },
    editDepartmentFail(state) {
      state.loading = false;
    },

    // Delete Department
    startDeleteDepartment(state) {
      state.loading = true;
    },
    deleteDepartmentSuccess(state, action) {
      state.departments = state.departments.filter(
        (dept) => dept.id !== action.payload
      );
      state.loading = false;
    },
    deleteDepartmentFail(state) {
      state.loading = false;
    },
  },
});

export const {
  startFetchDepartment,
  setDepartment,
  failFetchingDepartments,
  startAddDepartment,
  addDepartmentSuccess,
  addDepartmentFail,
  startEditDepartment,
  editDepartmentSuccess,
  editDepartmentFail,
  startDeleteDepartment,
  deleteDepartmentSuccess,
  deleteDepartmentFail,
} = departmentSlice.actions;

export default departmentSlice.reducer;
