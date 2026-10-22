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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../configs/firebase";
import { showMessage } from "react-native-flash-message";
import { setUserData } from "../../stores/reducers/userSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

//2. Make schema

const schema = yup
  .object({
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

const SignInScreen = () => {
  const [errorMessage, setErrorMessage] = useState("");
  //4. init the useForm hook

  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const onLoginPress = async (data: FormData) => {
    setErrorMessage("");

    try {
      // Luồng xử lý bao gồm
      //1. Đăng nhập vào firebase: Firebase xác thực email và mật khẩu. Nếu thành công, hàm trả về userCredential, trong đó có thông tin người dùng như user.uid và user.email. Firebase cũng cập nhật trạng thái đăng nhập hiện tại. Nếu thất bại, hàm ném lỗi và chuyển sang catch.
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      //2. Lưu thông tin cần thiết vào Redux: dispatch kích hoạt action setUserData; reducer trong userSlice.ts cập nhật state của Redux store với uid và email. Đây là bước lưu thông tin vào Redux, tách biệt với việc Firebase xác thực người dùng.Chuyển màn hình và báo đăng nhập thành công
      // const userDataObj = {
      //   uid: userCredential.user.uid
      // }
      dispatch(
        setUserData(
          { uid: userCredential.user.uid, }
          // email: userCredential.user.email ?? undefined,
        ),
      );
      //3. Chuyển màn hình và thông báo thành công: Đoạn này được đặt trong if (userCredential). Tuy nhiên, nếu signInWithEmailAndPassword chạy đến đây mà không ném lỗi thì userCredential đã có giá trị, nên điều kiện if này không cần thiết.
      if (userCredential) {
        navigation.navigate("MainAppBottomTabs");
        showMessage({
          type: "success",
          message: "Successful login",
        });
      }
    } catch (error: any) {
      console.log(error.code);
      let messageText = "An error occured during sign-in";
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password"
      ) {
        messageText = "Wrong email or password";
      }

      setErrorMessage(messageText);

      showMessage({
        type: "danger",
        message: errorMessage,
      });
    }
  };

  const { t } = useTranslation();

  return (
    <AppSaveView style={styles.container}>
      <Image source={IMAGES.appLogo} style={styles.logo} />

      {/* Thay thế AppInputText bằng AppTextInputController  */}
      <AppTextInputController<FormData>
        control={control}
        name="email"
        placeholder={t("email")}
        keyboardType="email-address"
      />
      <AppTextInputController<FormData>
        control={control}
        name="password"
        placeholder={t("password")}
        secureEntry
      />

      <AppText style={styles.appName}>Smart E-Commerce</AppText>

      {/* Thêm cảnh báp lỗi sau khi onPressLogin */}
      {errorMessage && (
        <AppText style={{ color: AppColors.redColor, marginBottom: 10 }}>
          {errorMessage}
        </AppText>
      )}
      {/* add handleSubmit function */}
      <AppButton title={t("signin_button")} onPress={handleSubmit(onLoginPress)} />
      <AppButton
        title={t("signup_button")}
        style={styles.registerButton}
        textColor={AppColors.primary}
        onPress={() => {
          navigation.navigate("SignUpScreen");
        }}
      />
    </AppSaveView>
  );
};

export default SignInScreen;

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
  registerButton: {
    backgroundColor: AppColors.white,
    borderWidth: s(1),
    marginTop: vs(15),
    borderColor: AppColors.primary,
  },
});
