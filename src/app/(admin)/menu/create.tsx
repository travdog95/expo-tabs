import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Image, Alert } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import Button from "@/src/components/Button";
import { defaultPizzaImage } from "@/src/components/CartListItem";
import Colors from "@/src/constants/Colors";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const { id } = useLocalSearchParams();
  const isUpdating = !!id;

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };
  const onCreate = () => {
    if (!validateInputs()) return;

    console.log("Creating product...");
    resetFields();
  };

  const onUpdate = () => {
    if (!validateInputs()) return;

    console.log("Updating product...");
    resetFields();
  };

  const resetFields = () => {
    setName("");
    setPrice("");
  };

  const validateInputs = () => {
    setErrors("");
    if (!name) {
      setErrors("Name is required");
      return false;
    }

    if (!price) {
      setErrors("Price is required");
      return false;
    }

    if (isNaN(parseFloat(price))) {
      setErrors("Price is not a number");
      return false;
    }

    return true;
  };

  const onDelete = () => {
    console.log("Deleting product...");
  };

  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this product?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "Delete", style: "destructive", onPress: onDelete },
    ]);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    // if (!image?.startsWith('file://')) {
    //   return;
    // }
    // const base64 = await FileSystem.readAsStringAsync(image, {
    //   encoding: 'base64',
    // });
    // const filePath = `${randomUUID()}.png`;
    // const contentType = 'image/png';
    // const { data, error } = await supabase.storage
    //   .from('product-images')
    //   .upload(filePath, decode(base64), { contentType });
    // console.log(error);
    // if (data) {
    //   return data.path;
    // }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: isUpdating ? "Update Create" : "Create Product" }} />
      <Image source={{ uri: image || defaultPizzaImage }} style={styles.image} />
      <Text onPress={pickImage} style={styles.textButton}>
        Select Image
      </Text>

      <Text style={styles.label}>Name</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        placeholder="9.99"
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Text style={{ color: "red" }}>{errors}</Text>
      <Button text={isUpdating ? "Update" : "Create"} onPress={onSubmit} />
      {isUpdating && (
        <Text style={styles.textButton} onPress={confirmDelete}>
          Delete
        </Text>
      )}
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
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
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

export default CreateProductScreen;
