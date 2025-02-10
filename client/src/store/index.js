import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authentication from "../reducers/authentication.reducer";
import role from "../reducers/role.reducer";
import employee from "../reducers/employee.reducer";
import department from "../reducers/department.reducer";
import insight from "../reducers/inshights.reducer";
import attendance from "../reducers/attendance.reducer";
import leave from "../reducers/leave.reducer";
import feedback from "../reducers/feedback.reducer";
import complaint from "../reducers/complaint.reducer";
import update from "../reducers/update.reducer";
import performance from "../reducers/performance.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authentication"],
};

const rootReducer = combineReducers({
  role,
  update,
  leave,
  insight,
  employee,
  feedback,
  complaint,
  department,
  attendance,
  performance,
  authentication,
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
