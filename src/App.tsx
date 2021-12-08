import 'react-native-gesture-handler';
import React from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import Toast from 'react-native-toast-message';

import { fonts } from './styles/fonts';
import { AppProvider } from './contexts';
import { Routes } from './routes';

export default function App() {
  const [isFontsLoad] = useFonts({
    ...fonts,
  });

  if (!isFontsLoad) return <AppLoading />;

  return (
    <AppProvider>
      <Routes />
      <Toast />
    </AppProvider>
  );
}
