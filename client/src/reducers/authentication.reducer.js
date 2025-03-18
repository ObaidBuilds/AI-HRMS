import { createSlice } from "@reduxjs/toolkit";
import {
  forgetPassword,
  login,
  logout,
  resetPassword,
  updatePassword,
} from "../services/authentication.service";

const initialState = {
  user: JSON.parse(localStorage.getItem("loggedInUser")) || null,
  loading: false,
  loginError: null,
  forgetPasswordError: null,
  updatePasswordError: null,
  resetPasswordError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling login
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.loginError = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.loginError = action.payload;
      })

      // Handling Forget Password
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.forgetPasswordError = null;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.forgetPasswordError = action.payload;
      })

      // Handling updatePassword
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
        state.updatePasswordError = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.updatePasswordError = action.payload;
      })

      // Handling resetPassword
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.resetPasswordError = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.resetPasswordError = action.payload;
      })

      // Handling logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        localStorage.removeItem("loggedInUser");
        localStorage.getItem("remember")
          ? localStorage.removeItem("session")
          : sessionStorage.removeItem("session");
        localStorage.removeItem("remember");
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
