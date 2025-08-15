import { createSlice } from "@reduxjs/toolkit";
import { getUpdates } from "../services/insights.service";

const initialState = {
  updates: [],
  loading: false,
  error: null,
};

const updateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling the getUpdates action
      .addCase(getUpdates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUpdates.fulfilled, (state, action) => {
        state.loading = false;
        state.updates = action.payload;
      })
      .addCase(getUpdates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default updateSlice.reducer;
