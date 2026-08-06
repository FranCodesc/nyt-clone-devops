import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./sliceNews"

export const store = configureStore({
  reducer: {
    news: newsReducer,
  },
});

export type AppDispatch = typeof store.dispatch

