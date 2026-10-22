import { FlatList, StyleSheet } from "react-native";
import AppSaveView from "../../components/views/AppSaveView";
import HomeHeader from "../../components/headers/HomeHeader";
import ProductCard from "../../components/cards/ProductCard";
import { s, vs } from "react-native-size-matters";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../stores/reducers/cartSlice";
import { useEffect, useState } from "react";
import { getProductsData } from "../../configs/dataServices";
import type { Product } from "../../configs/dataServices";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [products, setProduct] = useState<Product[]>([]);

  const fetchData = async () => {
    const data = await getProductsData();
    setProduct(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppSaveView>
      <HomeHeader />
      <FlatList
        numColumns={2}
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            id={item.id}
            imageURL={item.imageURL}
            title={item.title}
            price={item.price}
            onAddToCartPress={() => {
              dispatch(addItemToCart(item));
            }}
          />
        )}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: vs(10),
        }}
        contentContainerStyle={{
          paddingHorizontal: s(10),
        }}
      />
    </AppSaveView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
