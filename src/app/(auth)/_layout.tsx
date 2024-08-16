import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/src/providers/AuthProvider";

export default function AuthLayout() {
  const { session } = useAuth();

  // If the user is already logged in, redirect to the home page
  if (session) {
    return <Redirect href={"/"} />;
  }

  return <Stack />;
}
