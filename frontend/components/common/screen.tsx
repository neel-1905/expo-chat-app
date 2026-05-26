import { SafeAreaView } from "react-native-safe-area-context";
import { ViewProps } from "react-native";
import { styled } from "nativewind";

const StyledSafeAreaView = styled(SafeAreaView);

export function Screen({
  children,
  className,
}: ViewProps & { className?: string }) {
  return (
    <StyledSafeAreaView
      className={`will-change-variable flex-1 bg-background pt-8 pl-5 pr-5 pb-8 ${className ?? ""}`}
    >
      {children}
    </StyledSafeAreaView>
  );
}
