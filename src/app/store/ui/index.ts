import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

export interface UiInterface {
  sheet: {
    cells: {
      options: {
        activeTab: string;
      }
    }
  }
}

const initialState: UiInterface = {
  sheet: {
    cells: {
      options: {
        activeTab: 'start',
      }
    }
  }
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.sheet.cells.options.activeTab = action.payload;
    }
  }
});

export const { setActiveTab } = uiSlice.actions;

export const selectActiveTab = (state: RootState) => state.ui.sheet.cells.options.activeTab;

export default uiSlice.reducer;

