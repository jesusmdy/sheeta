import { configureStore } from '@reduxjs/toolkit';
import { sheetSlice } from './sheet/sheetSlicer';
import { projectSlice } from './project/projectSlicer';
import { uiSlice } from './ui';

export const store = configureStore({
  reducer: {
    sheet: sheetSlice.reducer,
    project: projectSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;