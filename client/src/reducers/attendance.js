import { createSlice } from "@reduxjs/toolkit";
import {
  generateQRCodeForAttendance,
  getAttendanceList,
  getEmployeeAttendance,
  markAttendance,
  markAttendanceUsingQrCode,
} from "../services/attendance";

const initialState = {
  attendanceList: [],
  loading: false,
  error: null,
  qrcode: null,
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    removeQr: (state) => {
      console.log("Ruuned");
      state.qrcode = null;
      console.log(state.qrcode);
    },
  },
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
      })

      // Handling getEmployeeAttendance
      .addCase(getEmployeeAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployeeAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceList = action.payload;
      })
      .addCase(getEmployeeAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling generateQRCodeForAttendance
      .addCase(generateQRCodeForAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateQRCodeForAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.qrcode = action.payload;
      })
      .addCase(generateQRCodeForAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling markAttendanceUsingQrCode
      .addCase(markAttendanceUsingQrCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markAttendanceUsingQrCode.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(markAttendanceUsingQrCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { removeQr } = attendanceSlice.actions;

export default attendanceSlice.reducer;
