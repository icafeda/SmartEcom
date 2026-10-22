import { StyleSheet, View } from "react-native";
import { useState } from "react";

import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import AppText from "../texts/AppText";
import AppButton from "../buttons/AppButton";
import { s } from "react-native-size-matters";
import RadioWithTitle from "../inputs/RadioWithTitle";
import { useTranslation } from "react-i18next";
import { languagesArr } from "../../localization/languagesList";

const LanguageBottomSheet = () => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(
    i18n.resolvedLanguage ?? i18n.language,
  );

  return (
    <ActionSheet id="LANG_SHEET" legacyGestures>
      <View style={styles.container}>
        <AppText>{t("change_language")}</AppText>
        {languagesArr.map(({ code, label }) => (
          <RadioWithTitle
            key={code}
            title={label}
            selected={selectedLanguage === code}
            onPress={() => setSelectedLanguage(code)}
          />
        ))}

        <AppButton
          title={t("confirm")}
          onPress={() => {
            void i18n.changeLanguage(selectedLanguage);
            SheetManager.hideAll("LANG_SHEET");
          }}
        />
      </View>
    </ActionSheet>
  );
};

export default LanguageBottomSheet;

const styles = StyleSheet.create({
  container: {
    padding: s(16),
  },
});
