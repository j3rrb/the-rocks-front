import { configureStore } from '@reduxjs/toolkit'
import drawer from './slices/drawer'
import chart from './slices/chart'

export const store = configureStore({
  reducer: {
    drawer,
    chart
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch