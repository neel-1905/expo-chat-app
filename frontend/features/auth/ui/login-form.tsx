import { View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/common/card";
import { AppText } from "@/components/common/app-text";
import { AppInput } from "@/components/ui/app-input";
import { AppButton } from "@/components/ui/app-button";
import { useLogin } from "../hooks/useLogin.hook";
import { LoginFormValues, loginSchema } from "../lib/auth.validations";
import { Link } from "expo-router";

export default function LoginForm() {
  const { mutate, isPending } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <Card className="gap-6">
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <AppInput
            label="Email"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email?.message}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <AppInput
            label="Password"
            placeholder="••••••••"
            secureTextEntry={true}
            error={errors.password?.message}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <AppButton
        label="Login"
        loading={isPending}
        onPress={handleSubmit((data) => mutate(data))}
      />

      <View className="items-center">
        <AppText className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link className="text-primary-foreground" href={`/register`}>
            Register
          </Link>
        </AppText>
      </View>
    </Card>
  );
}
