import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AppText from "../texts/AppText";
import { AppColors } from "../../styles/colors";
import { s, vs } from "react-native-size-matters";
import { AppFonts } from "../../constants/fontAlias";
import { MaterialIcons } from "@expo/vector-icons";

const ProfileSelectionButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.textContainer}>
        <AppText>{title}</AppText>
      </View>
      <MaterialIcons
        name="arrow-forward-ios"
        size={s(14)}
        color={AppColors.medGray}
      />
      <View></View>
    </TouchableOpacity>
  );
};

export default ProfileSelectionButton;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderBottomColor: AppColors.lightGray,
    paddingBottom: vs(10),
    marginTop: vs(10),
    flexDirection: "row",
    borderBottomWidth: s(1),
  },
  textTitle: {
    fontSize: s(16),
    fontFamily: AppFonts.Medium,
    color: AppColors.primary,
  },
  textContainer: {
    flex: 5,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginHorizontal: s(8),
  },
});
