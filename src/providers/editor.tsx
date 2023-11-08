'use client';
import { FC, Fragment, PropsWithChildren, createContext, useMemo, useState } from 'react';
import { EditorState } from 'draft-js';

export interface Range {
  offset: number;
  length: number;
};

export const InlineEditorContext = createContext<{
  editorState: any;
  setEditorState: any;
  currentRange: Range;
  setCurrentRange: any;
}>({
  editorState: null,
  setEditorState: null,
  currentRange: {
    offset: 0,
    length: 0,
  },
  setCurrentRange: null,
});

const InlineEditorProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentRange, setCurrentRange] = useState<Range>({
    offset: 0,
    length: 0,
  });

  const [editorState, setEditorState] = useState<any>(
    () => EditorState.createEmpty()
  );

  const valueToProvide = useMemo(
    () => ({
      editorState,
      setEditorState,
      currentRange,
      setCurrentRange,
    }),
    [editorState, currentRange]
  );

  return (
    <InlineEditorContext.Provider value={valueToProvide}>
      <Fragment>{children}</Fragment>
    </InlineEditorContext.Provider>
  );
};

export default InlineEditorProvider;