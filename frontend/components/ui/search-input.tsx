import {
  View,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { styled } from "nativewind";
import { Search, X } from "lucide-react-native";
import { AppText } from "@/components/common/app-text";
import { useThemeColor } from "@/hooks/useThemeColor.hook";

const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface SearchInputProps extends TextInputProps {
  label?: string;
  onClear?: () => void;
}

export function SearchInput({
  label,
  onClear,
  placeholder = "Search",
  className,
  value,
  ...props
}: SearchInputProps) {
  const colors = useThemeColor();
  const showClear = !!value;

  return (
    <View className="gap-2">
      {label ? (
        <AppText className="text-sm font-medium">{label}</AppText>
      ) : null}

      <View className="flex-row items-center rounded-2xl border border-border bg-input px-4 shadow-sm">
        <Search size={18} color={colors.mutedForeground} />

        <StyledTextInput
          className={"flex-1 py-3 pl-3 text-foreground "}
          placeholder={placeholder}
          placeholderTextColor={colors.mutedForeground}
          underlineColorAndroid="transparent"
          {...props}
          value={value}
        />

        {showClear ? (
          <StyledTouchableOpacity
            onPress={onClear}
            className="rounded-full p-2"
            activeOpacity={0.7}
          >
            <X size={18} color={colors.mutedForeground} />
          </StyledTouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}
