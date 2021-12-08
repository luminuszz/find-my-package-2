import Toast from 'react-native-toast-message';

export function useToast() {
  return {
    success: (content: string, otherContent?: string) =>
      Toast.show({
        type: 'success',
        text1: content,
        text2: otherContent,
      }),

    error: (content: string, otherContent?: string) =>
      Toast.show({
        type: 'error',
        text1: content,
        text2: otherContent,
      }),

    info: (content: string, otherContent?: string) =>
      Toast.show({
        type: 'info',
        text1: content,
        text2: otherContent,
      }),
  };
}
