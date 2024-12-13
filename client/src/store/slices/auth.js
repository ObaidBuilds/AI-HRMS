import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  admin: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.admin = action.payload; 
    },
    loginError: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.admin = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.admin = null;
    },
  },
});

export const { loginStart, loginSuccess, loginError, logout } = authSlice.actions;

export default authSlice.reducer;
