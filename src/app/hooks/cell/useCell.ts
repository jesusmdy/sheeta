import { CellOptionsInterface, InlineStyleRangeInterface, PositionInterface, addCell, addCellInlineStyleRange, defaultCell, selectCells, selectPosition, setColumnPosition, setRowPosition, updateCell, updateCellInlineStyleRange } from '@/app/store/sheet/sheetSlicer';
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

  const currentInlineStyleRanges = useMemo(
    () => {
      return currentCell?.inlineStyleRanges || [];
    },
    [currentCell]
  );

  const hasInlineStyleRange = (inlineStyleRange: InlineStyleRangeInterface) => {
    return currentInlineStyleRanges.some(
      (v) => v.offset === inlineStyleRange.offset && v.length === inlineStyleRange.length && v.style === inlineStyleRange.style
    );
  }

  const addCellOptions = (value: string) => {

    const cell = {
      ...defaultCell,
      position,
      value
    };

    dispatch(
      addCell(cell as CellOptionsInterface)
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

  const addCellInlineStyleRangeOption = (inlineStyleRange: InlineStyleRangeInterface) => {
    if (currentCell) {
      dispatch(addCellInlineStyleRange({position, inlineStyleRange}));
    }
  }

  const updateCellInlineStyleRangeOption = (inlineStyleRange: InlineStyleRangeInterface) => {
    if (currentCell) {
      dispatch(updateCellInlineStyleRange({position, inlineStyleRange}));
    }
  }

  return {
    cells,
    currentCell,
    isCurrentPosition,
    currentInlineStyleRanges,
    enableCell,
    addCellOptions,
    updateCellOptions,
    addCellInlineStyleRangeOption,
    updateCellInlineStyleRangeOption,
    hasInlineStyleRange
  };
};

export default useCell;