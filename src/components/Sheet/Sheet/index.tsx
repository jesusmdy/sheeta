'use client';
import useSheet from '@/app/hooks/sheet/useSheet';
import { DataGrid, Table, TableBody, TableCell, TableColumnDefinition, TableHeader, TableHeaderCell, TableRow, createTableColumn } from '@fluentui/react-components';
import _ from 'lodash';
import { FC, useMemo } from 'react';
import Cell from './Cell';
import './index.scss';

const RowHeaderCell: FC<{ row: number }> = ({ row }) => {
  const { position } = useSheet();

  const isCurrentRowSelected = useMemo(
    () => {
      return position.row === row;
    },
    [position.row, row]
  );

  return (
    <TableCell
      className={`row-header-cell ${isCurrentRowSelected ? 'current' : ''}`}
    >
      {row}
    </TableCell>
  );
};

const SheetBody: FC = () => {
  const { rows, columns } = useSheet();
  return (
    <TableBody>
      {
        _.map(
          rows,
          (row) => (
            <TableRow key={row}>
              <RowHeaderCell row={row} />
              {
                _.map(
                  columns,
                  (column, index) => <Cell position={{ row, column }} key={`row-cell-${column}-${index}`} />
                )
              }
            </TableRow>
          )
        )
      }
    </TableBody>
  );
};

const cellStyle = {
  padding: 0,
};

const ColumnCell: FC<{ column: string }> = ({ column }) => {
  const { position } = useSheet();

  const currentColumn = useMemo(
    () => {
      return position.column === column;
    },
    [position.column, column]
  );

  return (
    <TableHeaderCell
      className={`column-header-cell ${currentColumn ? 'current' : ''}`}
      style={cellStyle}
      key={column}
    >
        {column}
    </TableHeaderCell>
  );
};

const CellHeaders: FC = () => {
  const { columns } = useSheet();
  return (
    <>
      {
        _.map(
          columns,
          (column) => (
            <ColumnCell key={`column-cell-${column}`} column={column} />
          )
        )
      }
    </>
  )
};

const TheSheet: FC = () => {
  return (
    <Table
      style={{
        overflow: 'auto',
      }}
    >
      <TableHeader className="sheet-header">
        <TableRow>
          <TableHeaderCell style={cellStyle} />
          <CellHeaders />
        </TableRow>
      </TableHeader>
      <SheetBody />
    </Table>
  );
};

export default TheSheet;