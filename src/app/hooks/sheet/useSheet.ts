import { selectColumns, selectPosition, selectRows, setPosition } from '@/app/store/sheet/sheetSlicer';
import { useDispatch, useSelector } from 'react-redux';
import {
  setColumnPosition as setStoreColumnPosition,
  setRowPosition as setStoreRowPosition,
} from '@/app/store/sheet/sheetSlicer';

const useSheet = () => {
  const dispatch = useDispatch();
  const position = useSelector(selectPosition);

  const rows = useSelector(selectRows);
  const columns = useSelector(selectColumns);

  const setColumnPosition = (column: string) => {
    dispatch(setStoreColumnPosition(column));
  };

  const setRowPosition = (row: number) => {
    dispatch(setStoreRowPosition(row));
  };

  return {
    position,
    setColumnPosition,
    setRowPosition,
    rows,
    columns,
  };
};

export default useSheet;