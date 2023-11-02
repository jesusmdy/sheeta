'use client';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';
import { FC, ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../app/store';
import InlineEditorProvider from './editor';

const MainProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <FluentProvider theme={teamsLightTheme}>
        <InlineEditorProvider>
          {children}
        </InlineEditorProvider>
      </FluentProvider>
    </ReduxProvider>
  );
};

export default MainProvider;