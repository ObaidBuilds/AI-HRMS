import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  insights: null,
};

const insightSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setInsights(state, action) {
      state.insights = action.payload;
    },
  },
});

export const {setInsights} = insightSlice.actions;

export default insightSlice.reducer;
