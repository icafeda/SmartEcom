import { Platform, StatusBar, StyleSheet, View, ViewStyle } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { AppColors } from "../../styles/colors";
import { FC, ReactNode } from "react";

interface AppSaveViewProps {
  children?: ReactNode; // Kiểu dữ liệu cho children (có thể là component, string, v.v.)
  style?: ViewStyle; // Kiểu chuẩn cho style của React Native View
}

const AppSaveView: FC<AppSaveViewProps> = ({ children, style }) => {

const insets = useSafeAreaInsets();
    
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: AppColors.white,
        paddingTop:
          Platform.OS === "ios"
            ? Math.min(insets.top, 2) // không vượt quá 32px
            : insets.top * 0.2,
      }}
      edges={["top"]}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={AppColors.white}
        translucent={false}
      />
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
};

export default AppSaveView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});


