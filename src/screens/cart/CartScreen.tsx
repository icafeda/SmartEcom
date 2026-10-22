import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppSaveView from "../../components/views/AppSaveView";
import HomeHeader from "../../components/headers/HomeHeader";
import EmptyCart from "./EmptyCart";
import CartItem from "../../components/carts/CartItem";
import TotalsView from "../../components/carts/TotalsView";
import { products } from "../../data/products";
import { sharedPaddingHorizontal } from "../../styles/SharedStyles";
import AppButton from "../../components/buttons/AppButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { RootStackParamList } from "../../types/types";
import {
  decreaseQty,
  increaseQty,
  removeProductFromCart,
} from "../../stores/reducers/cartSlice";
import { shippingFees, taxes } from "../../constants/constants";

const CartScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const dispatch = useDispatch();

  const { items } = useSelector((state: RootState) => state.cartSlice);

 
  const totalProductsPricesSum = items.reduce((acc, item) => acc + item.sum, 0)
  const orderTotal = totalProductsPricesSum + shippingFees + taxes

  return (
    <AppSaveView>
      <HomeHeader />
      {items.length > 0 ? (
        <View style={{ paddingHorizontal: sharedPaddingHorizontal, flex: 1 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              return (
                <CartItem
                  id={item.id}
                  imageURL={item.imageURL}
                  title={item.title}
                  sum={item.sum}
                  qty={item.qty}
                  price={item.price}
                  onIncreasePress={() => dispatch(increaseQty(item.id))}
                  onDecreasePress={() => dispatch(decreaseQty(item.id))}
                  onDeletePress={() => dispatch(removeProductFromCart(item.id))}
                />
              );
            }}
            // ListFooterComponent={<TotalsView />}
          />

          <TotalsView
            itemPrice={totalProductsPricesSum}
            orderTotal={orderTotal}
          />

          <AppButton
            title="Continue"
            onPress={() => navigation.navigate("CheckoutScreen")}
          />
        </View>
      ) : (
        <EmptyCart />
      )}
    </AppSaveView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
