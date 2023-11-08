import useCell from '@/app/hooks/cell/useCell';
import useSheet from '@/app/hooks/sheet/useSheet';
import { InlineStyleRangeInterface } from '@/app/store/sheet/sheetSlicer';
import { InlineEditorContext } from '@/providers/editor';
import { INLINE_STYLE_MAP, InlineStyleMap } from '@/utils/text';
import { ToolbarButton } from '@fluentui/react-components';
import { ColorBackground20Regular, TextAlignLeft16Regular, TextBold16Regular, TextColor16Regular, TextFontSize16Regular, TextItalic16Regular, TextStrikethrough16Regular } from '@fluentui/react-icons';
import _ from 'lodash';
import { FC, Fragment, useContext } from 'react';

const InlineStyleHandler: FC<{ style: InlineStyleMap }> = ({ style }) => {
  const { position } = useSheet();
  const { addCellInlineStyleRangeOption, hasInlineStyleRange, updateCellInlineStyleRangeOption } = useCell(position);
  const { currentRange } = useContext(InlineEditorContext);
  const handleClick = () => {
    const range = {
      offset: currentRange.offset,
      length: currentRange.length,
      style: style.style,
    };
    const hasRange = hasInlineStyleRange(range as InlineStyleRangeInterface);
    if (hasRange) {
      updateCellInlineStyleRangeOption(range as InlineStyleRangeInterface);
    } else {
      addCellInlineStyleRangeOption(range as InlineStyleRangeInterface);
    }
  };
  return (
    <ToolbarButton
      icon={<style.icon />}
      onClick={handleClick}
    />
  )
};

const InlineStyles: FC = () => {
  return (
    <Fragment>
      {
        _.map(
          INLINE_STYLE_MAP,
          (style, key) => (
            <Fragment key={key}>
              <InlineStyleHandler style={style} />
            </Fragment>
          )
        )
      }
    </Fragment>
  )
};

const OptionsEditor: FC = () => {
  return (
    <>
      <InlineStyles />
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