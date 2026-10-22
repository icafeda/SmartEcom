// src/constants/fonts.ts
import { useFonts } from "expo-font";

export function useCustomFonts() {
  const [fontsLoaded] = useFonts({
    "Nunito-Bold": require("../assets/fonts/Nunito-Bold.ttf"),
    "Nunito-Medium": require("../assets/fonts/Nunito-Medium.ttf"),
    // Sau này có thêm font gì bạn chỉ cần nhét vào đây:
    // "Nunito-Regular": require('../assets/fonts/Nunito-Regular.ttf'),
    // "Nunito-SemiBold": require('../assets/fonts/Nunito-SemiBold.ttf'),
  });

  return fontsLoaded;
}
