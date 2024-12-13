import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/auth";
import roleReducer from "./slices/role";
import employeeReducer from "./slices/employee";
import departmentReducer from "./slices/department";
import insightReducer from "./slices/inshights";

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
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
