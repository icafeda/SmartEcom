import { StyleProp, StyleSheet, Text, TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import { s, vs } from 'react-native-size-matters';
import { AppColors } from '../../styles/colors';

interface AppInputTextProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps["keyboardType"];
  style?: StyleProp<TextStyle>;
}

const AppInputText: FC<AppInputTextProps> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  style,
}) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      style={[styles.input, style]}
      // 1. Thêm màu cho placeholder để hiển thị rõ trên Android
      placeholderTextColor={AppColors.medGray || "#999"}
      // 2. Thêm căn chỉnh dọc này để Android không bị mất chữ/placeholder
      textAlignVertical="center"
    />
  );
};

export default AppInputText

const styles = StyleSheet.create({
    input: {
        height: vs(40),
        borderRadius: s(25),
        borderWidth: s(1),
        borderColor: AppColors.borderColor,
        paddingHorizontal: s(15),
        fontSize: s(16),
        backgroundColor: AppColors.white,
        width: "100%",
        marginBottom: vs(10)

    }
})