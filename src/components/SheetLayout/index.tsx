'use client';
import { FC } from 'react';
import SheetProjectHeader from '../Sheet/SheetProjectHeader';
import CellEditorToolbar from '../Sheet/Sheet/CellEditor';
import TheSheet from '../Sheet/Sheet';
import './index.scss';

const SheetLayout: FC = () => {
  return (
    <div className="sheet-layout">
      <SheetProjectHeader />
      <CellEditorToolbar />
      <TheSheet />
    </div>
  );
};

export default SheetLayout;