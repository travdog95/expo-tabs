import { View, Text, StyleSheet, Image } from "react-native";
import Colors from "@/src/constants/Colors";
// import { Tables } from '../types';
// import { defaultPizzaImage } from './ProductListItem';

// type OrderItemListItemProps = {
//   item: { products: Tables<'products'> } & Tables<'order_items'>;
// };

// const OrderItemListItem = ({ item }: OrderItemListItemProps) => {
const OrderItemListItem = ({ item }: any) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.products.image }} style={styles.image} />

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.products.name}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>${item.products.price.toFixed(2)}</Text>
          <Text>Size: {item.size}</Text>
        </View>
      </View>
      <View style={styles.quantitySelector}>
        <Text style={styles.quantity}>{item.quantity}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 75,
    aspectRatio: 1,
    alignSelf: "center",
    marginRight: 10,
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: "row",
    gap: 5,
  },
  quantitySelector: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  quantity: {
    fontWeight: "500",
    fontSize: 18,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
});

export default OrderItemListItem;
