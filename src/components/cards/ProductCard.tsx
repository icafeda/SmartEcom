import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import { commonStyles } from "../../styles/SharedStyles";
import AppText from "../texts/AppText";
import { AppFonts } from "../../constants/fontAlias";
import { Ionicons } from "@expo/vector-icons";

import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";

export interface IProductCard {
  id: number | string;
  onAddToCartPress: () => void;
  title: string;
  price: string | number;
  imageURL: string;
  qty?: number;
}

const ProductCard: FC<IProductCard> = ({
  id,
  imageURL,
  title,
  price,
  onAddToCartPress,
}) => {
  const { items } = useSelector((state: RootState) => state.cartSlice);
  const existingItem = items.find((item) => item.id === id);
  const productQty = existingItem ? existingItem.qty : 0;


  return (
    <View style={styles.container}>
      {/* Image UI */}
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: imageURL,
          }}
        />
      </View>

      {/* Show Orderred Number */}
      <View style={styles.cartWrapContainer}>
        <View style={styles.addToCartButton}>
          {/* Cart Icon */}
          <TouchableOpacity onPress={onAddToCartPress}>
            <Ionicons name="cart" size={s(17)} color={AppColors.white} />
          </TouchableOpacity>
        </View>

        {productQty > 0 && (
          <View style={styles.badgeContainer} pointerEvents="none">
            <AppText style={{ fontSize: 10, color: AppColors.white }}>
              {productQty}
            </AppText>
          </View>
        )}
      </View>
      {/* Details */}

      <View style={styles.detailsContainer}>
        <AppText style={styles.titleText}>{title}</AppText>
        <AppText style={styles.priceText}>{price}</AppText>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: s(160),
    height: vs(190),
    backgroundColor: AppColors.white,
    borderRadius: s(10),
    ...commonStyles.shadow,
  },
  imageContainer: {
    overflow: "hidden",
    borderTopLeftRadius: s(10),
    borderTopRightRadius: s(10),
    height: vs(130),
    width: "100%",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  detailsContainer: {
    flex: 1,
    paddingTop: s(8),
    paddingBottom: vs(15),
    paddingHorizontal: s(10),
  },

  titleText: {
    fontSize: s(14),
    fontFamily: AppFonts.Medium,
    color: AppColors.primary,
  },
  priceText: {
    fontSize: s(14),
    fontFamily: AppFonts.Bold,
    color: AppColors.primary,
    marginTop: vs(3),
  },
  addToCartButton: {
    height: s(32),
    width: s(32),
    position: "absolute",
    left: s(5),
    top: s(10),
    borderRadius: s(16),
    backgroundColor: AppColors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  cartWrapContainer: {
    position: "absolute",
    left: s(8),
    top: s(8),
    zIndex: 1,
  },
  badgeContainer: {
    position: "absolute",
    left: s(25),
    top: s(4),
    height: s(16),
    minWidth: s(20),
    paddingHorizontal: s(3),
    borderRadius: s(8),
    borderColor: AppColors.white,
    borderWidth: 1,
    backgroundColor: AppColors.secondColor,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
});
