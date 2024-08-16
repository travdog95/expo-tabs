import { StyleSheet, View, FlatList, ActivityIndicator, Text } from "react-native";
import ProductListItem from "@/src/components/ProductListItem";
import { Stack } from "expo-router";
import { useProductList } from "@/src/api/products";

export default function MenuScreen() {
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
      <Stack.Screen options={{ title: "Menu" }} />
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
