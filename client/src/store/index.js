import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import authReducer from "../reducers/auth";
import roleReducer from "../reducers/role";
import employeeReducer from "../reducers/employee";
import departmentReducer from "../reducers/department";
import insightReducer from "../reducers/inshights";
import attendanceReducer from "../reducers/attendance";
import leaveReducer from "../reducers/leave";
import feedbackReducer from "../reducers/feedback";
import complaintReducer from "../reducers/complaint";
import updateReducer from "../reducers/update";

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
