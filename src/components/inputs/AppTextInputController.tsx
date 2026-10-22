import { KeyboardTypeOptions, StyleSheet } from "react-native";
import React from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import AppInputText from "./AppInputText";
import { AppColors } from "../../styles/colors";
import AppText from "../texts/AppText";
import { s, vs } from "react-native-size-matters";


interface AppTextInputControllerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  rules?: RegisterOptions<T, Path<T>>;
  onChange?: (value: any) => void;
  placeholder?: string;
  secureEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
}

const AppTextInputController = <T extends FieldValues>({
  control,
  name,
  rules,
  onChange,
  placeholder,
  secureEntry,
  keyboardType,
}: AppTextInputControllerProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange: rhfOnChange, value },
        fieldState: { error },
      }) => (
        <>
          <AppInputText
            value={value}
            onChangeText={(text) => {
              rhfOnChange(text);
              if (onChange) onChange(text);
            }}
            placeholder={placeholder}
            secureTextEntry={secureEntry}
            keyboardType={keyboardType}
            style={error && styles.errorInput}
              />
              
             {error && <AppText style={styles.textError}>{error.message}</AppText>}
        </>
      )}
    />
  );
};

export default AppTextInputController;

const styles = StyleSheet.create({
  errorInput: {
    borderColor: AppColors.redColor,
  },
    textError: {
        color: AppColors.redColor,
        fontSize: s(12),
        textAlign: "center",
        marginBottom: vs(10),
        marginTop: -vs(6),

  }
});
