import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import authReducer from "./slices/auth";
import roleReducer from "./slices/role";
import employeeReducer from "./slices/employee";
import departmentReducer from "./slices/department";
import insightReducer from "./slices/inshights";
import attendanceReducer from "./slices/attendance";
import leaveReducer from "./slices/leave";
import feedbackReducer from "./slices/feedback";

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
