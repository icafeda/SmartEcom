import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import MainAppBottomTabs from "./MainAppBottomTabs";
import CheckoutScreen from "../screens/cart/CheckoutScreen";
import MyOrderScreen from "../screens/cart/MyOrderScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setIsSignIn, setUserData } from "../stores/reducers/userSlice";
import { useEffect, useState } from "react";
import { RootState } from "../stores/store";
import { ActivityIndicator, View } from "react-native";
import { AppColors } from "../styles/colors";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../configs/firebase";

const Stack = createStackNavigator();

export default function MainAppStack() {
  const dispatch = useDispatch();
  const { userData, isSignIn } = useSelector((state: RootState) => state.userSlice);
  // Bên trong MainAppStack:
  
  const isUserLoggedIn = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem("USER_DATA");
      console.log(storedUserData);

      if (storedUserData) {
        dispatch(setUserData(JSON.parse(storedUserData)));
      } else {
        dispatch(setIsSignIn(false))
      }
    } catch (error) {
      console.error("Error reading stored user", error);
      dispatch(setIsSignIn(false))
    } 
  };

  useEffect(() => {
    isUserLoggedIn();
  }, [dispatch]);

  useEffect(() => {
    onAuthStateChanged(auth, (userData) => {
      if (userData) {
    console.log ("User is Signed In")
      } else {
        console.log ("User is Signed Out")
  }
})
  },[])

  if (isSignIn) {
    return <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1
    }}>
      <ActivityIndicator size={"large"} color={ AppColors.primary} />
  </View>
}

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={userData ? "MainAppBottomTabs" : "AuthStack"}
    >
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="MainAppBottomTabs" component={MainAppBottomTabs} />
      <Stack.Screen
        name="CheckoutScreen"
        component={CheckoutScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="MyOrderScreen"
        component={MyOrderScreen}
        options={{ headerShown: true, title: "My Orders" }}
      />
    </Stack.Navigator>
  );
}
