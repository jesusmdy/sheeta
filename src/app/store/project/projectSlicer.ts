import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

export interface ProjectState {
  name: string;
  // lastUpdate: Date;
}

const initialState: ProjectState = {
  name: 'Untitled',
  // lastUpdate: new Date(),
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      // state.lastUpdate = new Date();
    },
  },
});

export const { setName } = projectSlice.actions;
export const selectProject = (state: RootState) => state.project;
export default projectSlice.reducer;