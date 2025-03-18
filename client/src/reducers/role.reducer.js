import { createSlice } from "@reduxjs/toolkit";
import { createRole, getRoles, updateRole } from "../services/role.service";

const initialState = {
  roles: [],
  loading: false,
  error: null,
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling the getRoles action
      .addCase(getRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.roles = action.payload;
        state.loading = false;
      })
      .addCase(getRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch roles";
      })

      // Handling the updateDepartment action
      .addCase(updateRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        const updatedRoles = [...state.roles];
        console.log(action.payload)
        const findIndex = updatedRoles.findIndex(
          (role) => role._id === action.payload._id
        );
        if (findIndex !== -1) {
          updatedRoles[findIndex] = action.payload;
          state.roles = updatedRoles;
        }
        state.loading = false;
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch heads";
      })

      // Handling the createRole action
      .addCase(createRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.roles = [...state.roles, action.payload];
        state.loading = false;
      })
      .addCase(createRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch heads";
      });
  },
});

export default roleSlice.reducer;
