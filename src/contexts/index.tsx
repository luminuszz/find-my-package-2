import React from 'react';
import { RecoilRoot } from 'recoil';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { QueryClientProvider } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';

import { theme } from '../styles/theme';
import { reactQueryClient } from '../services/react-query';

export const AppProvider: React.FC = ({ children }) => (
  <RecoilRoot>
    <QueryClientProvider client={reactQueryClient}>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="light-content" />
        <NavigationContainer>{children}</NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  </RecoilRoot>
);
