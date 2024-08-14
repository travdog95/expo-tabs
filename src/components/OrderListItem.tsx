import React from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";
import { Order } from "@/src/types";
import { Link, useSegments } from "expo-router";
import dayjs from "dayjs";

type OrderListItemProps = {
  order: Order;
};

const OrdertListItem = ({ order }: OrderListItemProps) => {
  const segments = useSegments();
  // calculate hours since order
  const hoursSinceOrder = dayjs().diff(dayjs(order.created_at), "hour");

  return (
    <Link href={`/${segments[0]}/orders/${order.id}`} asChild>
      <Pressable style={styles.container}>
        <View>
          <Text style={styles.orderNumber}>Order #{order.id}</Text>
          <Text style={styles.age}>{hoursSinceOrder} hours ago</Text>
        </View>
        <Text style={styles.status}>{order.status}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  status: {
    fontWeight: "600",
    alignSelf: "center",
  },
  orderNumber: {
    fontWeight: "bold",
  },
  age: {
    color: "gray",
  },
});

export default OrdertListItem;
