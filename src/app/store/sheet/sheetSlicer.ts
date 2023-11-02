import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import _ from 'lodash';
import { INLINE_STYLES } from '@/utils/text';

const rows = _.range(1, 101);
const columns = _.range('A'.charCodeAt(0), 'Z'.charCodeAt(0) + 1);

export interface PositionInterface {
  row: number;
  column: string;
};

export interface InlineStyleRangeInterface {
  offset: number;
  length: number;
  style: keyof typeof INLINE_STYLES;
};

export interface CellOptionsInterface {
  position: PositionInterface,
  value: string,
  options: {
    fontWeight: string,
    fontStyle: string,
    textDecoration: string,
    textAlign: string,
    backgroundColor: string,
    color: string,
    fontSize: string,
  },
  inlineStyleRanges: InlineStyleRangeInterface[]
};
export const defaultCell = {
  options: {
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: 'none',
    textAlign: 'left',
    backgroundColor: '#fff',
    color: '#000',
    fontSize: '14px',
  }
};

interface SheetStateInterface {
  position: PositionInterface,
  rows: number[];
  columns: string[];
  cells: CellOptionsInterface[]
};

const initialState: SheetStateInterface = {
  position: {
    row: 1,
    column: 'A',
  },
  rows,
  columns: columns.map((c) => String.fromCharCode(c)),
  cells: [],
};

export const sheetSlice = createSlice({
  name: 'sheet',
  initialState,
  reducers: {
    setPosition: (state, action: PayloadAction<SheetStateInterface>) => {
      state.position = action.payload.position;
    },
    setRowPosition: (state, action: PayloadAction<number>) => {
      state.position.row = action.payload;
    },
    setColumnPosition: (state, action: PayloadAction<string>) => {
      state.position.column = action.payload;
    },
    setCells: (state, action: PayloadAction<CellOptionsInterface[]>) => {
      state.cells = action.payload;
    },
    addCell: (state, action: PayloadAction<CellOptionsInterface>) => {
      state.cells.push(action.payload);
    },
    removeCell: (state, action: PayloadAction<CellOptionsInterface>) => {
      state.cells = state.cells.filter((v) => v.position.row !== action.payload.position.row || v.position.column !== action.payload.position.column);
    },
    updateCell: (state, action: PayloadAction<CellOptionsInterface>) => {
      const index = state.cells.findIndex((v) => v.position.row === action.payload.position.row && v.position.column === action.payload.position.column);
      state.cells[index] = action.payload;
    },
  },
});

export const {
  setPosition, setColumnPosition, setRowPosition,
  setCells, addCell, removeCell, updateCell
} = sheetSlice.actions;

export const selectPosition = (state: RootState) => state.sheet.position;
export const selectRows = (state: RootState) => state.sheet.rows;
export const selectColumns = (state: RootState) => state.sheet.columns;
export const selectCells = (state: RootState) => state.sheet.cells;

export default sheetSlice.reducer;