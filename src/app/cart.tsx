import { View, FlatList, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useCart } from "@/src/providers/CartProvider";
import CartListItem from "../components/CartListItem";

const CartScreen = () => {
  const { items } = useCart();

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default CartScreen;
