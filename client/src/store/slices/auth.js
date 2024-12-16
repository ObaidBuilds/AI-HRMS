import { createSlice } from "@reduxjs/toolkit";
import { loginAdmin, logoutAdmin } from "../../services/auth";

const initialState = {
  admin: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.admin = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling login
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.admin = null;
        state.error = action.payload;
      })

      // Handling logout
      .addCase(logoutAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = null;
        sessionStorage.removeItem("session");
      })
      .addCase(logoutAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
