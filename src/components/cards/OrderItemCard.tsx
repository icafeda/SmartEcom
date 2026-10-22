import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import { commonStyles } from "../../styles/SharedStyles";
import AppText from "../texts/AppText";
import { AppFonts } from "../../constants/fontAlias";
import type { Timestamp } from "firebase/firestore";


interface IOrderItemCardProps {
  totalPrice: number;
  totalProductsPricesSum: number;
  createdAt: Timestamp;
}


const OrderItemCard: FC<IOrderItemCardProps> = ({
  totalPrice,
  totalProductsPricesSum,
  createdAt,
}) => {
  return (
    <View style={styles.container}>
      <AppText style={{ fontFamily: AppFonts.Bold }}>ORDER DETAILS :</AppText>
      <View style={styles.separator} />
      <View style={styles.textPrice}>
        <AppText style={{ fontFamily: AppFonts.Bold }}>
          Total Price: $ {totalPrice}
        </AppText>
        <AppText
          style={{ color: AppColors.secondColor, fontFamily: AppFonts.Bold }}
        >
          Subtotal: {totalProductsPricesSum} $
        </AppText>
      </View>

      <View style={styles.textPrice}>
        <AppText style={{ fontFamily: AppFonts.Bold }}>
          Date: {createdAt.toDate().toLocaleDateString()}
        </AppText>
      </View>
    </View>
  );
};

export default OrderItemCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: AppColors.white,
    padding: vs(15),
    borderRadius: s(5),
    ...commonStyles.shadow,
    marginTop: 10
  },
  separator: {
    height: s(1),
    width: "100%",
    backgroundColor: AppColors.black,
    marginVertical: vs(7),
  },
  textPrice: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
