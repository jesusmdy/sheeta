import { CellOptionsInterface, PositionInterface, addCell, defaultCell, selectCells, selectPosition, setColumnPosition, setRowPosition, updateCell } from '@/app/store/sheet/sheetSlicer';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useCell = (
  position: PositionInterface
) => {
  const dispatch = useDispatch();
  const currentPosition = useSelector(selectPosition);

  const enableCell = () => {
    dispatch(setColumnPosition(position.column));
    dispatch(setRowPosition(position.row));
  };

  const cells = useSelector(selectCells);

  const currentCell = useMemo(
    () => {
      return cells.find((v) => v.position.row === position.row && v.position.column === position.column);
    },
    [position, cells]
  );

  const isCurrentPosition = useMemo(
    () => currentPosition.row === position.row && currentPosition.column === position.column,
    [currentPosition, position]
  );

  const addCellOptions = (value: string) => {

    const cell = {
      ...defaultCell,
      position,
      value
    };

    dispatch(
      addCell(cell)
    );

  };

  const updateCellOptions = (value: CellOptionsInterface) => {
    if (currentCell) {
      dispatch(
        updateCell(value)
      )
    } else {
      addCellOptions(value.value);
      updateCellOptions(value);
    }
  };

  return {
    cells,
    currentCell,
    isCurrentPosition,
    enableCell,
    addCellOptions,
    updateCellOptions
  };
};

export default useCell;