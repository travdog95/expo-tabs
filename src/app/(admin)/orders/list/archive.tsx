import { StyleSheet, View, FlatList } from "react-native";
import { Stack } from "expo-router";
import orders from "@/assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";

export default function OrdersScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Archive" }} />
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        numColumns={1}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: 5, padding: 5 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
  },
});
