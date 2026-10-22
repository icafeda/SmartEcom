import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import AppSaveView from "../../components/views/AppSaveView";
import { sharedPaddingHorizontal } from "../../styles/SharedStyles";
import { IMAGES } from "../../constants/images-paths";
import { s, vs } from "react-native-size-matters";
import AppInputText from "../../components/inputs/AppInputText";
import AppText from "../../components/texts/AppText";
import AppButton from "../../components/buttons/AppButton";
import { AppColors } from "../../styles/colors";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/types";

//1. Form controller Imports
import AppTextInputController from "../../components/inputs/AppTextInputController";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../configs/firebase";
import { showMessage } from "react-native-flash-message";
import { useDispatch } from "react-redux";
import { setUserData } from "../../stores/reducers/userSlice";

//2. Make schema
const schema = yup
  .object({
    userName: yup
      .string()
      .required("User name is required.")
      .min(3, "Usernam must be at least 5 characters."),
    email: yup
      .string()
      .email("Please enter a valid email.")
      .required("Email is required."),
    password: yup
      .string()
      .required("Password is required.")
      .min(6, "Password must be at least 6 characters."),
  })
  .required();

//3. Define the type
type FormData = yup.InferType<typeof schema>;

const SignUpScreen = () => {
  const [errorMessage, setErrorMessage] = useState("");
  //4. init the useForm hook

  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const onSignUpPress = async (data: FormData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      navigation.navigate("MainAppBottomTabs");
      dispatch(
        setUserData({
          uid: userCredential.user.uid,
          // email: userCredential.user.email ?? undefined,
          // fullName: data.userName,
        }),
      );
      // return userCredential.user;
    } catch (error: any) {
      console.log(error.code);
      let messageText = "An error occured during sign-up";
      if (
        error.code === "auth/email-already-in-use" ||
        error.code === "auth/invalid-email"
      ) {
        messageText = "Email is already in use or in valid-email.";
      } else if (error.code === "auth/weak-password") {
        messageText = "Password is too weak or in valid.";
      }

      setErrorMessage(messageText);

      showMessage({
        type: "danger",
        message: errorMessage,
      });
    }
  };

  return (
    <AppSaveView style={styles.container}>
      <Image source={IMAGES.appLogo} style={styles.logo} />

      <AppTextInputController<FormData>
        control={control}
        name="userName"
        placeholder="User Name"
      />
      <AppTextInputController<FormData>
        control={control}
        name="email"
        placeholder="Email"
        keyboardType="email-address"
      />
      <AppTextInputController<FormData>
        control={control}
        name="password"
        placeholder="Password"
        secureEntry
      />

      <AppText style={styles.appName}>Smart E-Commerce</AppText>

      <AppButton
        title="Create New Account"
        onPress={handleSubmit(onSignUpPress)}
      />

      {errorMessage && (
        <AppText style={{ color: AppColors.redColor, marginBottom: 10 }}>
          {errorMessage}
        </AppText>
      )}
      
      <AppButton
        title="Go To Sign In"
        style={styles.signInButton}
        textColor={AppColors.primary}
        onPress={() => navigation.navigate("SignInScreen")}
      />
    </AppSaveView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: sharedPaddingHorizontal,
  },
  logo: {
    height: s(150),
    width: s(150),
    marginBottom: vs(30),
  },
  appName: {
    fontSize: s(16),
    marginBottom: vs(15),
  },
  signInButton: {
    backgroundColor: AppColors.white,
    borderWidth: s(1),
    marginTop: vs(15),
    borderColor: AppColors.primary,
  },
});
