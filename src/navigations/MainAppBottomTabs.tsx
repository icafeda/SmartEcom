import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";
import CartScreen from "../screens/cart/CartScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import { AppColors } from "../styles/colors";
import { s, vs } from "react-native-size-matters";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function MainAppBottomTabs() {

    const insets = useSafeAreaInsets();
    const isAndroid = Platform.OS === "android";
    const hasThreeButtonNav = isAndroid && insets.bottom === 0;
    // Chiều cao BottomTab
    const tabBarHeight = hasThreeButtonNav
      ? s(30) + s(30) // Android 3-nút → nhô lên
      : Platform.OS === "ios"
        ? s(35) + insets.bottom // iOS → hạ thấp xuống
        : s(45) + insets.bottom; // Android gesture → sát mép
    // Padding dưới cho icon/text
    const paddingBottomValue = hasThreeButtonNav
      ? s(30)
      : Platform.OS === "ios"
        ? insets.bottom > 0
          ? insets.bottom - s(10)
          : s(8) // iOS → giảm padding
        : insets.bottom > 0
          ? insets.bottom
          : s(8);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: AppColors.tintColor,
        tabBarInactiveTintColor: "#999392",
        tabBarLabelStyle: {
          marginTop: vs(1),
          fontSize: s(10),
        },
        tabBarStyle: {
          backgroundColor: AppColors.white,
          height: tabBarHeight,
          paddingBottom: paddingBottomValue,
        },
      }}
    >
      <Tab.Screen
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={18} color={color} />
          ),
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          title: "Cart",
          tabBarIcon: ({ color}) => (
            <Feather name="shopping-cart" size={18} color={color} />
          ),
        }}
        name="Cart"
        component={CartScreen}
      />
      <Tab.Screen
        options={{
          title: "Profile",
          tabBarIcon: ({ color}) => (
            <AntDesign name="profile" size={18} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}


