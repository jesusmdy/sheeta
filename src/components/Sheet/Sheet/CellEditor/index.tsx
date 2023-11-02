'use client';
import useSheet from '@/app/hooks/sheet/useSheet';
import { Divider, Field, Input, InputOnChangeData, Tag, Toolbar, ToolbarButton } from '@fluentui/react-components';
import { FC, useMemo, useState } from 'react';
import useCell from '@/app/hooks/cell/useCell';
import useCellUiOptions from '@/app/hooks/ui/useCellUiOptions';
import './index.scss';
import OptionsEditor from './Tabs/StartTab';

const ValueEditor: FC = () => {
  const { position } = useSheet();
  const { currentCell, updateCellOptions, addCellOptions } = useCell(position);

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

  const onChange = (e: unknown, data: InputOnChangeData) => {
    setValue(data.value);
  };
  

  return (
    <Field className="field">
      <Input
        placeholder="Value"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </Field>
  )
};

const CellEditorToolbar: FC = () => {
  const { position } = useSheet();
  const { activeTab } = useCellUiOptions();

  const tabs: Record<string, FC> = {
    start: OptionsEditor,
  };

  const CurrentTabElement = tabs[activeTab] ?? tabs.start;

  return (
    <div className="editor-toolbars">
      <Toolbar className="toolbar options">
        <CurrentTabElement />
      </Toolbar>
      <Toolbar className="toolbar">
        <Tag appearance="brand">{`${position.column}${position.row}`}</Tag>
        <ValueEditor />
      </Toolbar>
      <Divider />
    </div>
  );
};

export default CellEditorToolbar;