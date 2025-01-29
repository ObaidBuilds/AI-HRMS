import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import authReducer from "../reducers/authentication.reducer";
import roleReducer from "../reducers/role.reducer";
import employeeReducer from "../reducers/employee.reducer";
import departmentReducer from "../reducers/department.reducer";
import insightReducer from "../reducers/inshights.reducer";
import attendanceReducer from "../reducers/attendance.reducer";
import leaveReducer from "../reducers/leave.reducer";
import feedbackReducer from "../reducers/feedback.reducer";
import complaintReducer from "../reducers/complaint.reducer";
import updateReducer from "../reducers/update.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authentication"],
};

const rootReducer = combineReducers({
  role: roleReducer,
  insight: insightReducer,
  authentication: authReducer,
  employee: employeeReducer,
  department: departmentReducer,
  attendance: attendanceReducer,
  leave: leaveReducer,
  feedback: feedbackReducer,
  complaint: complaintReducer,
  update: updateReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: import.meta.env.VITE_ENV !== "production",
});

export const persistor = persistStore(store);

export default store;
