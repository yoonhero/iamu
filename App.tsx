import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import LoggedInNav from "./navigators/LoggedInNav";
import { StatusBar } from "expo-status-bar";
import AnimatedSplash from "react-native-animated-splash-screen";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const onFinish = () => setLoading(true);

  const preloadAssets = () => {
    const fontToLoad = [Ionicons.font];
    const fontPromises = fontToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [require("./assets/image/happy.png")];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    onFinish();
  };
  useEffect(() => {
    preloadAssets();
  }, []);

  return (
    <>
      <StatusBar style='inverted' />
      <AnimatedSplash
        translucent={true}
        isLoaded={loading}
        logoImage={require("./assets/image/happy.png")}
        backgroundColor={"#fff"}
        logoHeight={150}
        logoWidth={150}>
        <>
          <NavigationContainer>
            {isLoggedIn ? <LoggedInNav /> : <View>login</View>}
          </NavigationContainer>
        </>
      </AnimatedSplash>
    </>
  );
}
