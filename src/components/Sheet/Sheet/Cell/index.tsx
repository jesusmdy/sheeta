'use client';
import useCell from '@/app/hooks/cell/useCell';
import { PositionInterface } from '@/app/store/sheet/sheetSlicer';
import { TableCell } from '@fluentui/react-components';
import { FC } from 'react';
import './index.scss';

const Cell: FC<{ position: PositionInterface }> = ({ position }) => {
  const { isCurrentPosition, enableCell, currentCell } = useCell(position);

  const handleInputSelect = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const selectionStart = target.selectionStart;
    const selectionEnd = target.selectionEnd;
    console.log(`Selection start: ${selectionStart}, Selection end: ${selectionEnd}`);
  };

  return (
    <TableCell
      className={
        `sheet-cell ${isCurrentPosition ? '--current' : ''}`
      }
      onClick={enableCell}
    >
      {
        isCurrentPosition && (
          <input
            autoFocus
            onSelect={handleInputSelect}
          />
        )
      }
      {
        !isCurrentPosition && (
          <div>{currentCell?.value}</div>
        )
      }
    </TableCell>
  );
};

export default Cell;