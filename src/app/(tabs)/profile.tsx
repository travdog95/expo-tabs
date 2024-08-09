import { View, TextInput, Alert, Button } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";

export default function ProfileScreen() {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    if (!user) {
      return;
    }
    const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single();

    if (error) {
      Alert.alert("Failed to fetch profile");
    }

    setUsername(data.username);
    setBio(data.bio);
  };

  const updateProfile = async () => {
    if (!user) {
      return;
    }

    const updatedProfile = {
      id: user.id,
      username,
      bio,
    };

    const { data, error } = await supabase.from("profiles").update(updatedProfile);

    if (error) {
      Alert.alert("Failed to update profile");
    }
  };

  return (
    <View>
      {/* Form */}
      <View>
        <TextInput placeholder="Username" value={username} onChangeText={setUsername} />

        <TextInput
          placeholder="Bio"
          value={bio}
          onChangeText={setBio}
          multiline
          numberOfLines={3}
        />
      </View>

      {/* Button */}
      <View>
        <Button title="Update profile" onPress={updateProfile} />
        <Button title="Sign out" onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  );
}
