import { StyleSheet, View, FlatList } from "react-native";
import products from "@/assets/data/products";
import ProductListItem from "@/src/components/ProductListItem";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
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
