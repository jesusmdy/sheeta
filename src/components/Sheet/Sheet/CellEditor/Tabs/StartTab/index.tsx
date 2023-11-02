import { InlineEditorContext } from '@/providers/editor';
import { ToolbarButton } from '@fluentui/react-components';
import { ColorBackground20Regular, TextAlignLeft16Regular, TextBold16Regular, TextColor16Regular, TextFontSize16Regular, TextItalic16Regular, TextStrikethrough16Regular } from '@fluentui/react-icons';
import { RichUtils } from 'draft-js';
import { FC, useContext } from 'react';

const OptionsEditor: FC = () => {
  const handleClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <>
      <ToolbarButton
        onClick={handleClick}
        icon={<TextBold16Regular />}
      />
      <ToolbarButton
        icon={<TextItalic16Regular />}
      />
      <ToolbarButton
        icon={<TextStrikethrough16Regular />}
      />
      <ToolbarButton
        icon={<TextColor16Regular />}
      />
      <ToolbarButton
        icon={<ColorBackground20Regular />}
      />
      <ToolbarButton
        icon={<TextAlignLeft16Regular />}
      />
      <ToolbarButton
        icon={<TextFontSize16Regular />}
      />
    </>
  );
};

export default OptionsEditor;