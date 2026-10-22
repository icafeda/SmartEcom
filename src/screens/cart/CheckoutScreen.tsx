import { StyleSheet, View } from "react-native";
import AppSaveView from "../../components/views/AppSaveView";
import {
  commonStyles,
  sharedPaddingHorizontal,
} from "../../styles/SharedStyles";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import AppButton from "../../components/buttons/AppButton";
import AppTextInputController from "../../components/inputs/AppTextInputController";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { shippingFees, taxes } from "../../constants/constants";
import { addDoc, collection, doc } from "firebase/firestore";
import { setUserData } from "../../stores/reducers/userSlice";
import { db } from "../../configs/firebase";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";

interface ICheckoutForm {
  fullName: string;
  phoneNumber: string;
  detailedAddress: string;
}

interface UserProfile {
  uid: string;
}

const schema = yup
  .object({
    fullName: yup
      .string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters."),
    phoneNumber: yup
      .string()
      .required("Phone number is required.")
      .matches(/^[0-9]+$/, "Must be only digits.")
      .min(10, "Phone number must be at least 10 digits"),
    detailedAddress: yup
      .string()
      .required()
      .min(
        15,
        " Please provide a detailed address with at least 15 characters.",
      ),
  })
  .required();

const CheckoutScreen = () => {
  const { control, handleSubmit } = useForm<ICheckoutForm>({
    resolver: yupResolver(schema),
  });

  //gọi store
  const { userData } = useSelector((state: RootState) => state.userSlice)
  const { items } = useSelector((state: RootState) => state.cartSlice)

  const navigation = useNavigation();
  const totalProductsPricesSum = items.reduce((acc, item) => acc + item.sum, 0);
  const totalPrice = totalProductsPricesSum + shippingFees + taxes

  const saveOrder: SubmitHandler<ICheckoutForm> = async (formData) => {
    try {
      if (!userData?.uid) {
        showMessage({ type: "danger", message: "User not found!" });
        return;
      }
      const orderBody = {
        ...formData,
        items,
        totalProductsPricesSum,
        createdAt: new Date(),
        totalPrice:totalPrice,
      };

      const userOrderRef = collection(doc(db, "users", userData.uid), "orders");
      await addDoc(userOrderRef, orderBody)

      const orderRef = collection(db, "orders")
      await addDoc(orderRef, orderBody)
        
        showMessage({
  type: "success",
  message: "Order Places Successful",
});
      navigation.goBack();

    } catch (error) {
      console.error("Error saving order", error)
      showMessage({ type: "danger" , message: "Error Happen"})
    }
  };

  return (
    <AppSaveView>
      <View style={{ paddingHorizontal: sharedPaddingHorizontal }}>
        <View style={styles.inputsContainer}>
          <AppTextInputController
            name={"fullName"}
            control={control}
            placeholder="Full Name"
          />
          <AppTextInputController
            name={"phoneNumber"}
            control={control}
            placeholder="Phone Number"
          />
          <AppTextInputController
            name={"detailedAddress"}
            control={control}
            placeholder="Detailed Addres"
          />
        </View>
      </View>

      <View style={styles.bottomButtonContainer}>
        <AppButton title="Confirm" onPress={handleSubmit(saveOrder)} />
      </View>
    </AppSaveView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  inputsContainer: {
    ...commonStyles.shadow,
    padding: s(8),
    borderRadius: s(8),
    backgroundColor: AppColors.white,
  },
  bottomButtonContainer: {
    paddingHorizontal: sharedPaddingHorizontal,
    position: "absolute",
    width: "100%",
    bottom: vs(15),
    borderTopWidth: 1,
    borderColor: AppColors.lightGray,
    paddingTop: vs(10),
  },
});
