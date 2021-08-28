import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import LoggedInNav from "./navigators/LoggedInNav";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <NavigationContainer>
      {isLoggedIn ? <LoggedInNav /> : <View>login</View>}
    </NavigationContainer>
  );
}
