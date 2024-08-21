import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem, Product, Tables } from "../types";
import { randomUUID } from "expo-crypto";
import { useInsertOrder } from "../api/orders";
import { router } from "expo-router";
import { useInsertOrderItems } from "../api/order-items";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
  checkout: () => void;
};

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const { mutate: insertOrder, isPending: isInsertingOrder } = useInsertOrder();
  const { mutate: insertOrderItems, isPending: isInsertingOrderItems } = useInsertOrderItems();

  const addItem = (product: Product, size: CartItem["size"]) => {
    // if already in cart, increase quantity
    const existingItem = items.find((item) => item.product === product && item.size === size);

    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };

    setItems([...items, newCartItem]);
  };

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    //Loop through items and update quantity, while maintaining state immutability
    const updatedItems = items
      .map((item) =>
        item.id !== itemId
          ? item
          : {
              ...item,
              quantity: item.quantity + amount,
            }
      )
      .filter((item) => item.quantity > 0); //remove items from cart with quantity 0

    setItems(updatedItems);
  };

  const clearCart = () => {
    setItems([]);
  };

  //calculate total price of all items in cart and round to 2 decimal places
  const total = parseFloat(
    items.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2)
  );

  const checkout = () => {
    console.log("checkout");
    insertOrder(
      { total },
      {
        onSuccess: () => {
          saveOrderItems;
        },
      }
    );
  };

  const saveOrderItems = (order: Tables<"orders">) => {
    console.log("order-items", items);
    // create order items from cart items
    const orderItems = items.map((cartItem) => ({
      order_id: order.id,
      product_id: cartItem.product_id,
      quantity: cartItem.quantity,
      size: cartItem.size,
    }));

    insertOrderItems(orderItems, {
      onSuccess() {
        clearCart();
        router.push(`/(user)/orders/${order.id}`);
      },
    });
  };

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, total, checkout }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
