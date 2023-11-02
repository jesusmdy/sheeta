'use client';
import { FC, Fragment, PropsWithChildren, createContext, useMemo, useState } from 'react';
import { EditorState } from 'draft-js';

export const InlineEditorContext = createContext<{
  editorState: any;
  setEditorState: any;
}>({
  editorState: null,
  setEditorState: null,
});

const InlineEditorProvider: FC<PropsWithChildren> = ({ children }) => {

  const [editorState, setEditorState] = useState<any>(
    () => EditorState.createEmpty()
  );

  const valueToProvide = useMemo(
    () => ({
      editorState,
      setEditorState,
    }),
    [editorState]
  );

  return (
    <InlineEditorContext.Provider value={valueToProvide}>
      <Fragment>{children}</Fragment>
    </InlineEditorContext.Provider>
  );
};

export default InlineEditorProvider;