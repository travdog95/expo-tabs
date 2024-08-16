import {
  StyleSheet,
  View,
  FlatList,
  Pressable,
  useColorScheme,
  ActivityIndicator,
  Text,
} from "react-native";
import { Link, Stack } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import ProductListItem from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";
import { useProductList } from "@/src/api/products";

export default function MenuScreen() {
  const colorScheme = useColorScheme();
  // Fetch the list of products from the database.
  const { data: products, error, isLoading } = useProductList();

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
          title: "Menu",
          headerRight: () => (
            <Link href="/(admin)/menu/create" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="plus-square-o"
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
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: 10, padding: 5 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgrey",
  },
});
