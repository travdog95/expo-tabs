import { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useCart } from "@/src/providers/CartProvider";
import { PizzaSize } from "@/src/types";
import Colors from "@/src/constants/Colors";
import { useProduct } from "@/src/api/products";
import { defaultPizzaImage } from "@/src/components/CartListItem";

const SIZES: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseInt(typeof idString === "string" ? idString : idString[0]);

  const { data: product, error, isLoading } = useProduct(id);

  const router = useRouter();
  const colorScheme = useColorScheme();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>("L");
  const { addItem } = useCart();

  const addToCart = () => {
    if (!product) return;

    addItem(product, selectedSize);
    router.push("/cart");
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to load products.</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: product!.name,
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Image source={{ uri: product!.image || defaultPizzaImage }} style={styles.image} />
      <Text style={styles.title}>{product!.name}</Text>
      <Text style={styles.price}>${product!.price}</Text>
      {/* <Button text="Add to Cart" onPress={addToCart} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  title: {
    fontSize: 24,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProductDetailsScreen;
