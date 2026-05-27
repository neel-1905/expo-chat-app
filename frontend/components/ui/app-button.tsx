import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { styled } from "nativewind";
import { AppText } from "@/components/common/app-text";
import { LoaderCircle } from "lucide-react-native";

const StyledTouchableOpacity = styled(TouchableOpacity);

interface AppButtonProps extends TouchableOpacityProps {
  label: string;
  loading?: boolean;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

const variantStyles = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  outline: "bg-transparent border border-primary",
};

const labelStyles = {
  primary: "text-primary-foreground",
  secondary: "text-secondary-foreground",
  outline: "text-primary",
};

const sizeStyles = {
  sm: "py-2 px-3 rounded-lg",
  md: "py-3 px-4 rounded-xl",
  lg: "py-4 px-6 rounded-xl",
};

const labelSizeStyles = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export function AppButton({
  label,
  loading,
  variant = "primary",
  size = "md",
  disabled,
  ...props
}: AppButtonProps) {
  return (
    <StyledTouchableOpacity
      className={`will-change-variable items-center ${variantStyles[variant]} ${sizeStyles[size]} ${disabled || loading ? "opacity-50" : ""}`}
      disabled={disabled || loading}
      {...props}
    >
      <AppText
        className={`font-semibold ${labelStyles[variant]} ${labelSizeStyles[size]}`}
      >
        {loading ? <LoaderCircle className="animate-spin" /> : label}
      </AppText>
    </StyledTouchableOpacity>
  );
}
