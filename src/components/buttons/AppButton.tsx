import React, { FC } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  StyleProp,
} from "react-native";
import { s, vs } from "react-native-size-matters";
import AppText from "../texts/AppText";
import { AppColors } from "../../styles/colors";

export interface AppButtonProps {
  title?: string;
  onPress?: () => void;

  backgroundColor?: string;
  textColor?: string;

  style?: ViewStyle | ViewStyle[];
  styleTitle?: StyleProp<any>;

  disabled?: boolean;
}

const AppButton: FC<AppButtonProps> = ({
  onPress,
  title = "",
  backgroundColor = AppColors.primary,
  textColor = AppColors.white,
  style,
  styleTitle,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: disabled ? AppColors.disabledGray : backgroundColor,
        },
        style,
      ]}
    >
      <AppText
        style={[styles.textTitle, { color: textColor }, styleTitle]}
        variant="bold"
      >
        {title}
      </AppText>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: vs(40),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: s(25),
    backgroundColor: "#000",
  },
  textTitle: {
    fontSize: s(16),
  },
});
