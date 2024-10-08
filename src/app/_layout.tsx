import { useColorScheme } from "react-native";
import { Stack } from "expo-router";
import AuthProvider from "@/src/providers/AuthProvider";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import CartProvider from "@/src//providers/CartProvider";
import QueryProvider from "@/src/providers/QueryProvider";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <QueryProvider>
          <CartProvider>
            <Stack>
              <Stack.Screen name="(admin)" options={{ headerShown: false }} />
              <Stack.Screen name="(user)" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="cart" options={{ presentation: "modal" }} />
            </Stack>
          </CartProvider>
        </QueryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
