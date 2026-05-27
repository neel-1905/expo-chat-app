// components/ui/app-toast.tsx
import { View } from "react-native";
import { styled } from "nativewind";
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react-native";
import { AppText } from "@/components/common/app-text";
import { BaseToastProps, ToastConfig } from "react-native-toast-message";

const StyledView = styled(View);

const toastStyles = {
  success: { border: "border-success", icon: CheckCircle, color: "#22C55E" },
  error: { border: "border-danger", icon: XCircle, color: "#EF4444" },
  warning: { border: "border-warning", icon: AlertTriangle, color: "#F59E0B" },
  info: { border: "border-accent", icon: Info, color: "#0EA5E9" },
};

function AppToast({
  text1,
  text2,
  type = "info",
}: BaseToastProps & { type?: keyof typeof toastStyles }) {
  const { border, icon: Icon, color } = toastStyles[type];

  return (
    <StyledView
      className={`will-change-variable mx-4 bg-card border-l-4 ${border} rounded-xl px-4 py-3 shadow-md flex-row items-start gap-3`}
    >
      <Icon size={20} color={color} style={{ marginTop: 2 }} />
      <View className="flex-1">
        {text1 && <AppText className="font-semibold">{text1}</AppText>}
        {text2 && (
          <AppText className="text-sm text-muted-foreground">{text2}</AppText>
        )}
      </View>
    </StyledView>
  );
}

export const toastConfig: ToastConfig = {
  success: (props) => <AppToast {...props} type="success" />,
  error: (props) => <AppToast {...props} type="error" />,
  warning: (props) => <AppToast {...props} type="warning" />,
  info: (props) => <AppToast {...props} type="info" />,
};
