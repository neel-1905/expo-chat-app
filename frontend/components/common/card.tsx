import { View, ViewProps } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);

export function Card({
  children,
  className,
  ...props
}: ViewProps & { className?: string }) {
  return (
    <StyledView
      className={`will-change-variable bg-card border border-border rounded-2xl p-6 ${className ?? ""}`}
      {...props}
    >
      {children}
    </StyledView>
  );
}
