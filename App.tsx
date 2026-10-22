// import { Button, StyleSheet, Text, View } from "react-native";
// import React, { useEffect, useState } from "react";

// import AsyncStorage from "@react-native-async-storage/async-storage";

// const App = () => {
//   const [totalExpenses, setTotalExpenses] = useState(0);

//   //Save data to local Storage
//   const storeTotalExpensesInLocalStorage = async (value: any) => {
//     try {
//       await AsyncStorage.setItem("totalExpense", value);
//     } catch (error) {}
//   };

//   //Get data from local storage
//   const getData = async () => {
//     try {
//       const value = await AsyncStorage.getItem("totalExpense");
//       if (value !== null) {
//         console.log(" Value = " + value);
//         setTotalExpenses(+value);
//       }
//     } catch (error) {}
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   // To Remove Data
//   const removeData = async () => {
//     try {
//       await AsyncStorage.removeItem("totalExpense");
//     } catch (error) {
      
//     }
//   }
//   //Function for button
//   const increaseTotalExpenses = async () => {
//     const newExpensesAfterUpdate = totalExpenses + 10;
//     setTotalExpenses(newExpensesAfterUpdate);
//     await storeTotalExpensesInLocalStorage(newExpensesAfterUpdate?.toString());
//   };

//   return (
//     <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
//       <Text style={{ fontSize: 20 }}>Expenses App</Text>
//       <Text style={{ fontSize: 20 }}>Total Expenses = {totalExpenses}</Text>
//       <Button
//         title="Increase Expemses with 10"
//         onPress={increaseTotalExpenses}
//       />

//       <Button title="Remove Data" onPress={removeData} />
//     </View>
//   );
// };

// export default App;

// const styles = StyleSheet.create({});

import { ActivityIndicator, Platform, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FlashMessage from "react-native-flash-message";
import { NavigationContainer } from "@react-navigation/native";
import MainAppStack from "./src/navigations/MainAppStack";
import { useFonts } from "expo-font";
import { useCustomFonts } from "./src/styles/fonts";
import { persistor, store } from "./src/stores/store";
import { Provider } from "react-redux";
import i18n from "./src/localization/i18n";
import { I18nextProvider } from "react-i18next";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  // Gọi custom hook để tải font
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return <ActivityIndicator size={"large"} style={styles.loader} />;
  }

  return (
    <>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <I18nextProvider i18n={i18n}>
              <NavigationContainer>
                <FlashMessage
                  position={"top"}
                  statusBarHeight={Platform.OS === "android" ? 30 : 30}
                />
                <MainAppStack />
              </NavigationContainer>
            </I18nextProvider>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
