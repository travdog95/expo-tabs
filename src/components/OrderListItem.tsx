import React from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import { Order } from "@/src/types";
import { Link, useSegments } from "expo-router";

type OrderListItemProps = {
  order: Order;
};

const ProductListItem = ({ order }: OrderListItemProps) => {
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/menu/${order.id}`} asChild>
      {/* <Pressable style={styles.container}>
        <Text style={styles.title}>{order.name}</Text>
        <Text style={styles.price}>${order.price.toFixed(2)}</Text>
      </Pressable> */}
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    maxWidth: "50%",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    marginVertical: 10,
  },
  price: {
    fontWeight: "bold",
    marginTop: "auto",
  },
});

export default ProductListItem;
