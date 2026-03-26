import { createSlice } from "@reduxjs/toolkit";
import {
  markAttendance,
  getAttendanceList,
  getEmployeeAttendance,
  markAttendanceUsingQrCode,
  generateQRCodeForAttendance,
  getEmployeeAttendanceByDepartment,
  getEmployeeMonthlyAttendanceByDepartment,
} from "../services/attendance.service.js";

const initialState = {
  attendanceList: [],
  attendanceRecord: [],
  loading: false,
  error: null,
  qrcode: null,
  fetch: true,
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    removeQr: (state) => {
      state.qrcode = null;
    },
    setFetchFlag: (state, action) => {
      state.fetch = action.payload;
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
        state.fetch = true;
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
        state.fetch = false;
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
        state.fetch = true;
      })
      .addCase(markAttendanceUsingQrCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling getEmployeeAttendanceByDepartment
      .addCase(getEmployeeAttendanceByDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployeeAttendanceByDepartment.fulfilled, (state, action) => {
        state.attendanceRecord = action.payload;
        state.loading = false;
      })
      .addCase(getEmployeeAttendanceByDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling getEmployeeMonthlyAttendanceByDepartment
      .addCase(getEmployeeMonthlyAttendanceByDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getEmployeeMonthlyAttendanceByDepartment.fulfilled,
        (state, action) => {
          state.attendanceRecord = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        getEmployeeMonthlyAttendanceByDepartment.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { removeQr, setFetchFlag } = attendanceSlice.actions;
export default attendanceSlice.reducer;
