import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import LoggedInNav from "./navigators/LoggedInNav";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <>
      <StatusBar style='inverted' />
      <NavigationContainer>
        {isLoggedIn ? <LoggedInNav /> : <View>login</View>}
      </NavigationContainer>
    </>
  );
}
