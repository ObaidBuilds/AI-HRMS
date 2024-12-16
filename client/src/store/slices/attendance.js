import { createSlice } from "@reduxjs/toolkit";
import { getAttendanceList, markAttendance } from "../../services/attendance";

const initialState = {
  attendanceList: [],
  loading: false,
  error: null,
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling get attendance list
      .addCase(getAttendanceList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAttendanceList.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceList = action.payload;
      })
      .addCase(getAttendanceList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling mark attendance
      .addCase(markAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markAttendance.fulfilled, (state) => {
        state.loading = false;
        state.attendanceList = [];
      })
      .addCase(markAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default attendanceSlice.reducer;
