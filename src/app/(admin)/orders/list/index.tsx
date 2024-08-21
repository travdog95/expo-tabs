import { StyleSheet, View, FlatList, ActivityIndicator, Text } from "react-native";
import { Stack } from "expo-router";
import OrderListItem from "@/src/components/OrderListItem";
import { useAdminOrderList } from "@/src/api/orders";

export default function OrdersScreen() {
  const { data: orders, isLoading, error } = useAdminOrderList({ archived: false });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to get orders</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Active" }} />
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
