import { useState } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { styled } from "nativewind";
import { Eye, EyeOff } from "lucide-react-native";
import { AppText } from "@/components/common/app-text";
import { useThemeColor } from "@/hooks/useThemeColor.hook";

const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
}

export function AppInput({
  label,
  error,
  hint,
  className,
  secureTextEntry, // ← destructure here
  ...props // ← now secureTextEntry is NOT in props
}: AppInputProps) {
  const [hidden, setHidden] = useState(true);
  const colors = useThemeColor();

  return (
    <View className="gap-1.5">
      {label && <AppText className="text-sm font-medium">{label}</AppText>}

      <View
        className={`flex-row items-center bg-input border rounded-xl px-4 ${error ? "border-danger" : "border-border"}`}
      >
        <StyledTextInput
          className={`will-change-variable flex-1 py-3 text-foreground ${className ?? ""}`}
          placeholderTextColor={colors.mutedForeground}
          secureTextEntry={secureTextEntry && hidden}
          {...props}
        />
        {secureTextEntry && (
          <StyledTouchableOpacity onPress={() => setHidden((v) => !v)}>
            {hidden ? (
              <Eye size={18} color={colors.mutedForeground} />
            ) : (
              <EyeOff size={18} color={colors.mutedForeground} />
            )}
          </StyledTouchableOpacity>
        )}
      </View>

      {hint && !error && (
        <AppText className="text-xs text-muted-foreground">{hint}</AppText>
      )}
      {error && <AppText className="text-xs text-danger">{error}</AppText>}
    </View>
  );
}
