import { View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/common/card";
import { AppText } from "@/components/common/app-text";
import { AppInput } from "@/components/ui/app-input";
import { AppButton } from "@/components/ui/app-button";
import { useRegister } from "../hooks/useRegister.hook";
import { RegisterFormValues, registerSchema } from "../lib/auth.validations";
import { Link } from "expo-router";

export default function RegisterForm() {
  const { mutate, isPending } = useRegister();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <Card className="gap-6">
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <AppInput
            label="Name"
            placeholder="Your full name"
            autoCapitalize="words"
            error={errors.name?.message}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

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

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <AppInput
            label="Confirm Password"
            placeholder="••••••••"
            secureTextEntry={true}
            error={errors.confirmPassword?.message}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <AppButton
        loading={isPending}
        onPress={handleSubmit(({ confirmPassword, ...data }) => mutate(data))}
      >
        Create account
      </AppButton>

      <View className="items-center">
        <AppText className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link className="text-primary-foreground" href={`/login`}>
            Login
          </Link>
        </AppText>
      </View>
    </Card>
  );
}
