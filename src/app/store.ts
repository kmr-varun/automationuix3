// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import automationReducer from './features/automationSlice';

const store = configureStore({
  reducer: {
    automation: automationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
