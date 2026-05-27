import * as SecureStore from "expo-secure-store";

const REFRESH_TOKEN_KEY = "refresh_token";
const ACCESS_TOKEN_KEY = "accessToken";

export async function saveRefreshToken(token: string) {
  await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
}

export async function getRefreshToken() {
  return SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
}

export async function removeRefreshToken() {
  return SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
}

export async function saveAccessToken(token: string) {
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
}

export async function getAccessToken() {
  return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
}

export async function removeAccessToken() {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
}

export async function clearTokens() {
  await Promise.all([
    SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
    SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY),
  ]);
}
