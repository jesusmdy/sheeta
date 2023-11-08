import { TextBold16Regular, TextItalic16Regular, TextStrikethrough16Regular, TextUnderline16Regular } from "@fluentui/react-icons";
import { CSSProperties } from "react";

export const INLINE_STYLES = [
  'BOLD',
  'ITALIC',
  'UNDERLINE',
  'STRIKETHROUGH',
  'CODE',
  'SUBSCRIPT',
  'SUPERSCRIPT',
  'MARK',
  'KBD',
  'SAMP',
  'VARIABLE',
];

export interface InlineStyleMap {
  label: string;
  style: string;
  icon: any;
}

export const INLINE_STYLE_MAP: InlineStyleMap[] = [
  {
    label: 'Bold',
    style: INLINE_STYLES[0],
    icon: TextBold16Regular,
  },
  {
    label: 'Italic',
    style: INLINE_STYLES[1],
    icon: TextItalic16Regular,
  },
  {
    label: 'Underline',
    style: INLINE_STYLES[2],
    icon: TextUnderline16Regular,
  },
  {
    label: 'Strikethrough',
    style: INLINE_STYLES[3],
    icon: TextStrikethrough16Regular,
  }
];

export const getStyle = (style: keyof typeof INLINE_STYLES): CSSProperties => {
  switch (style as any) {
    case 'BOLD':
      return {
        fontWeight: 'bold',
      }
    case 'ITALIC':
      return {
        fontStyle: 'italic',
      }
    case 'UNDERLINE':
      return {
        textDecoration: 'underline',
      }
    case 'STRIKETHROUGH':
      return {
        textDecoration: 'line-through',
      }
    case 'CODE':
      return {
        fontFamily: 'monospace',
        backgroundColor: '#eee',
        padding: '3px',
        borderRadius: '3px',
      }
    default:
      return {};
  }
};