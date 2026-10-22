import { FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import OrderItemCard from "../../components/cards/OrderItemCard";
import { s } from "react-native-size-matters";
import { fetchUserOrders } from "../../configs/dataServices";
import type { UserOrder } from "../../configs/dataServices";

const MyOrderScreen = () => {
  const [ordersList, setOrdersList] = useState<UserOrder[]>([]);
  const getOrders = async () => {
    try {
      const response = await fetchUserOrders();
      setOrdersList(response);
    } catch (error) {
      console.error("Could not load orders", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <FlatList
      numColumns={1}
      data={ordersList}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <OrderItemCard
          createdAt={item.createdAt}
          totalProductsPricesSum={item.totalProductsPricesSum}
          totalPrice={item.totalPrice}
        />
      )}
      contentContainerStyle={{
        paddingHorizontal: s(10),
      }}
    />
  );
};

export default MyOrderScreen;

const styles = StyleSheet.create({});
