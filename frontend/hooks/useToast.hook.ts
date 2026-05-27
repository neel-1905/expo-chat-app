// hooks/useToast.hook.ts
import Toast from "react-native-toast-message";

export function useToast() {
  return {
    success: (text1: string, text2?: string) =>
      Toast.show({ type: "success", text1, text2 }),
    error: (text1: string, text2?: string) =>
      Toast.show({ type: "error", text1, text2 }),
    warning: (text1: string, text2?: string) =>
      Toast.show({ type: "warning", text1, text2 }),
    info: (text1: string, text2?: string) =>
      Toast.show({ type: "info", text1, text2 }),
  };
}
