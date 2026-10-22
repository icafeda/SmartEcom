import { StyleSheet, View, Image, Pressable } from "react-native";
import { FC } from "react";
import { s, vs } from "react-native-size-matters";
import AppText from "../texts/AppText";
import { AppColors } from "../../styles/colors";
import { AppFonts } from "../../constants/fontAlias";
import {
  AntDesign,
  FontAwesome6,
  Fontisto,
} from "@expo/vector-icons";

interface CartItemProps {
  id: number | string;
  imageURL: string;
  title: string;
  price: string | number;
  qty: number;
  sum: number;
  onIncreasePress: () => void;
  onDecreasePress: () => void;
  onDeletePress: () => void;
}

const CartItem: FC<CartItemProps> = ({
  id,
  imageURL,
  title,
  price,
  qty,
  sum,
  onIncreasePress,
  onDecreasePress,
  onDeletePress,
}) => {

  return (
    <View style={styles.container}>
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageURL }} style={styles.image} />
      </View>
      {/* Details Container */}
      <View style={styles.detailsContainer}>
        <AppText style={styles.textTitle}>{title}</AppText>
        <AppText style={styles.textPrice}>Total: ${sum}</AppText>

        <View style={styles.qtyContainer}>
          <Pressable onPress={onIncreasePress} style={styles.iconButton}>
            <FontAwesome6 name="plus" size={14} color="black" />
          </Pressable>
          <AppText style={styles.textQty}>{qty}</AppText>
          <Pressable onPress={onDecreasePress} style={styles.iconButton}>
            <Fontisto name="minus-a" size={14} color="black" />
          </Pressable>
        </View>
      </View>

      {/* Delete Container */}
      <View style={styles.deleteContainer}>
        <Pressable onPress={onDeletePress} style={styles.deleteButton}>
          <AntDesign name="delete" size={s(14)} color={AppColors.redColor} />
          <AppText style={styles.textDelete}>Delete</AppText>
        </Pressable>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    borderBottomColor: AppColors.lightGray,
    borderBottomWidth: 1,
    paddingBottom: vs(4),
  },
  imageContainer: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    flex: 3.5,
  },
  deleteContainer: {
    flex: 1.5,
    justifyContent: "flex-end",
    paddingEnd: s(12),
  },
  image: {
    height: s(80),
    width: s(80),
    borderRadius: s(5),
  },
  textTitle: {
    fontSize: s(14),
    color: AppColors.primary,
    fontFamily: AppFonts.Medium,
    marginTop: vs(5),
  },
  textPrice: {
    fontSize: s(16),
    color: AppColors.primary,
    fontFamily: AppFonts.Bold,
    marginVertical: vs(5),
  },
  textDelete: {
    marginLeft: s(7),
    fontFamily: AppFonts.Medium,
    color: AppColors.medGray,
    fontSize: s(12),
    marginTop: s(3),
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: s(5),
    borderRadius: s(30),
    borderWidth: s(1),
    borderColor: AppColors.blueGray,
    width: s(80),
    paddingVertical: vs(5),
  },
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColors.lightGray,
    padding: s(5),
    height: s(20),
    width: s(20),
    borderRadius: s(10),
  },
  textQty: {
    flex: 1,
    textAlign: "center",
    color: AppColors.primary,
  },
});
