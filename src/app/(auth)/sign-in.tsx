import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { Link, Stack } from "expo-router";
import Colors from "@/src/constants/Colors";
import Button from "@/src/components/Button";
import { supabase } from "@/src/lib/supabase";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignIn = async () => {
    if (!validateInputs()) return;
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) Alert.alert("Error", error.message);

    setLoading(false);
  };

  const validateInputs = () => {
    setErrors("");
    if (!email) {
      setErrors("E-mail is required");
      return false;
    }

    if (!password) {
      setErrors("Password is required");
      return false;
    }

    return true;
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign In" }} />
      <Text style={styles.label}>E-mail</Text>
      <TextInput
        placeholder="kim@gmail.com"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholder=""
        secureTextEntry
      />
      <Text style={{ color: "red" }}>{errors}</Text>
      <Button onPress={onSignIn} disabled={loading} text={loading ? "Signing in..." : "Sign in"} />
      <Link href="/(auth)/sign-up" asChild>
        <Text style={styles.textButton}>Create an account</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

export default SignInScreen;
