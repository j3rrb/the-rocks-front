import { configureStore } from "@reduxjs/toolkit";
import drawer from "./slices/drawer";
import { chartAPI } from "./apis/chart";

export const store = configureStore({
  reducer: {
    drawer,
    [chartAPI.reducerPath]: chartAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chartAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
