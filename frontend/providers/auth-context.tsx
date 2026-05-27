import {
  getRefreshToken,
  removeRefreshToken,
  saveRefreshToken,
  getAccessToken,
  saveAccessToken,
  clearTokens,
} from "@/features/auth/services/auth-storage";
import { User } from "@/features/auth/types/auth.types";
import { createContext, useContext, useEffect, useState } from "react";
import {
  me,
  refreshToken as refreshTokenApi,
} from "@/features/auth/api/auth-api";
import { ActivityIndicator, View } from "react-native";

type AuthState = {
  user: User | null;
  status: "loading" | "authenticated" | "unauthenticated";
  setAuth: (
    user: User,
    accessToken: string,
    refreshToken: string,
  ) => Promise<void>;
  clearAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");

  async function authInit() {
    try {
      const refreshToken = await getRefreshToken();

      if (!refreshToken) {
        setStatus("unauthenticated");
        return;
      }

      const response = await refreshTokenApi(refreshToken);
      const { accessToken: newAccessToken } = response.data;

      await saveAccessToken(newAccessToken); // ← save to SecureStore

      const userData = await me(); // ← no need to pass token manually
      setUser(userData.data);
      setStatus("authenticated");
    } catch (error) {
      console.log("authInit error:", error);
      await clearTokens();
      setStatus("unauthenticated");
    }
  }

  async function setAuth(
    user: User,
    accessToken: string,
    refreshToken: string,
  ) {
    await saveAccessToken(accessToken); // ← save to SecureStore
    await saveRefreshToken(refreshToken);
    setUser(user);
    setStatus("authenticated");
  }

  async function clearAuth() {
    await clearTokens(); // ← clears both tokens
    setUser(null);
    setStatus("unauthenticated");
  }

  useEffect(() => {
    authInit();
  }, []);

  if (status === "loading") {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ user, status, setAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
