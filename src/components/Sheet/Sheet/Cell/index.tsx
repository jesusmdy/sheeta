'use client';
import useCell from '@/app/hooks/cell/useCell';
import { PositionInterface } from '@/app/store/sheet/sheetSlicer';
import { TableCell } from '@fluentui/react-components';
import { CSSProperties, FC, Fragment, createElement, useContext, useMemo, useState } from 'react';
import './index.scss';
import { InlineEditorContext } from '@/providers/editor';
import _, { ceil } from 'lodash';
import { getStyle } from '@/utils/text';

const Renderer: FC<{ position: PositionInterface }> = ({ position }) => {
  const { currentCell, currentInlineStyleRanges } = useCell(position);

  const CellElement = useMemo(() => {
    if (!currentCell) return null;
    const parts = _.map(
      currentInlineStyleRanges,
      (range, index) => {
        const text = currentCell.value.slice(range.offset, range.offset + range.length);
        const style = getStyle(range.style);
        return (
          <Fragment key={index}>
            <span
              style={
                {
                  ...style,
                }
              }
            >
              {text}
            </span>
          </Fragment>
        );
      }
    );
    return createElement(
      'div',
      {},
      ...parts
    );

  }, [currentCell?.value, currentInlineStyleRanges]);

  return (
    <div>
      {CellElement}
    </div>
  );
};

const Cell: FC<{ position: PositionInterface }> = ({ position }) => {
  const { isCurrentPosition, enableCell, currentCell } = useCell(position);
  const { setCurrentRange } = useContext(InlineEditorContext);
  
  const { updateCellOptions, addCellOptions } = useCell(position);

  const [value, setValue] = useState(currentCell?.value ?? '');

  useMemo(() => {
    setValue(currentCell?.value ?? '');
  }, [currentCell?.value]);

  const onBlur = () => {
    if (currentCell) {
      updateCellOptions(
        {
          ...currentCell,
          value
        }
      );
    } else {
      addCellOptions(value);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleInputSelect = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const selectionStart = target.selectionStart;
    const selectionEnd = target.selectionEnd;
    setCurrentRange({
      offset: selectionStart,
      length: selectionEnd,
    });
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
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />
        )
      }
      {
        !isCurrentPosition && <Renderer position={position} />
      }
    </TableCell>
  );
};

export default Cell;
