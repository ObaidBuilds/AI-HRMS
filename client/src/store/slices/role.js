import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: [],
  loading: false,
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    // Fetch Roles
    startFetchRoles(state) {
      state.loading = true;
    },
    setRoles(state, action) {
      state.roles = action.payload;
      state.loading = false;
    },
    failFetchingRoles(state) {
      state.loading = false;
    },

    // Add Role
    startAddRole(state) {
      state.loading = true;
    },
    addRoleSuccess(state, action) {
      state.roles.push(action.payload);
      state.loading = false;
    },
    addRoleFail(state) {
      state.loading = false;
    },

    // Edit Role
    startEditRole(state) {
      state.loading = true;
    },
    editRoleSuccess(state, action) {
      const index = state.roles.findIndex(
        (role) => role.id === action.payload.id
      );
      if (index !== -1) {
        state.roles[index] = {
          ...state.roles[index],
          ...action.payload,
        };
      }
      state.loading = false;
    },
    editRoleFail(state) {
      state.loading = false;
    },

    // Delete Role
    startDeleteRole(state) {
      state.loading = true;
    },
    deleteRoleSuccess(state, action) {
      state.roles = state.roles.filter((role) => role.id !== action.payload.id);
      state.loading = false;
    },
    deleteRoleFail(state) {
      state.loading = false;
    },
  },
});

export const {
  startFetchRoles,
  setRoles,
  failFetchingRoles,
  startAddRole,
  addRoleSuccess,
  addRoleFail,
  startEditRole,
  editRoleSuccess,
  editRoleFail,
  startDeleteRole,
  deleteRoleSuccess,
  deleteRoleFail,
} = roleSlice.actions;

export default roleSlice.reducer;
