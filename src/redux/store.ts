import { configureStore } from "@reduxjs/toolkit";
import drawer from "./slices/drawer";
import authSlice from "./slices/auth";
import { chartAPI } from "./apis/chart";

export const store = configureStore({
  reducer: {
    drawer,
    authSlice,
    [chartAPI.reducerPath]: chartAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chartAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
