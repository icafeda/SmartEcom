import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { s, vs } from "react-native-size-matters";
import AppText from "../texts/AppText";
import { AppColors } from "../../styles/colors";
import { shippingFees, taxes } from "../../constants/constants";

interface TotalsView {
    itemPrice: number
    orderTotal: number
}
const TotalsView: FC<TotalsView> = ({itemPrice, orderTotal}) => {
  return (
    <View>
      <View style={styles.row}>
        <AppText style={styles.textTitle}>Item Price:</AppText>
        <AppText style={styles.textPrice}>$ {itemPrice}</AppText>
      </View>
      <View style={styles.row}>
        <AppText style={styles.textTitle}>Taxes:</AppText>
              <AppText style={styles.textPrice}>$ { taxes }</AppText>
      </View>
      <View style={styles.row}>
        <AppText style={styles.textTitle}>Shiping Fee:</AppText>
              <AppText style={styles.textPrice}>$ { shippingFees }</AppText>
      </View>

      <View style={styles.separetor} />

      <View style={styles.row}>
        <AppText style={styles.textTitle}>Order Total:</AppText>
              <AppText style={styles.textPrice}>$ {orderTotal}</AppText>
      </View>
    </View>
  );
};

export default TotalsView;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: vs(10),
  },
  textTitle: {
    flex: 1,
    fontSize: s(16),
  },
  textPrice: {
    fontSize: s(16),
    color: AppColors.primary,
  },
    separetor: {
        height: s(1),
        width: "100%",
        backgroundColor: AppColors.lightGray,
        marginVertical: vs(5),
  }
});
