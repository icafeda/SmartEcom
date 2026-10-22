import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppSaveView from "../../components/views/AppSaveView";
import HomeHeader from "../../components/headers/HomeHeader";
import ProfileSelectionButton from "../../components/buttons/ProfileSelectionButton";
import { sharedPaddingHorizontal } from "../../styles/SharedStyles";
import AppText from "../../components/texts/AppText";
import { s, vs } from "react-native-size-matters";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/types";
import { SharedObjectType } from "expo";
import { SheetManager } from "react-native-actions-sheet";
import LanguageBottomSheet from "../../components/language/LanguageBottomSheet";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { t } = useTranslation();

  const handleLogout = async () => {
    // Add logout logic here
    await AsyncStorage.removeItem("USER_DATA")
    navigation.navigate("AuthStack")
  }




  return (
    <AppSaveView>
      <HomeHeader />
      <AppText variant="bold" style={{ fontSize: s(18), marginTop: vs(10) }}>
        {t("welcome", { userName: "Rhino" })}
      </AppText>
      <View style={{ paddingHorizontal: sharedPaddingHorizontal }}>
        <ProfileSelectionButton
          title={t("my_orders")}
          onPress={() => navigation.navigate("MyOrderScreen")}
        />
        <ProfileSelectionButton
          title={t("language")}
          onPress={() => {
            SheetManager.show("LANG_SHEET");
          }}
        />

        <LanguageBottomSheet />
        <ProfileSelectionButton title={t("logout")} onPress={handleLogout} />
      </View>
    </AppSaveView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
