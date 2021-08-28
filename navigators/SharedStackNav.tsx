import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text, Image } from "react-native";
import Video from "../screens/Video";
const Stack = createStackNavigator();

export default function SharedStackNav({ screenName }: { screenName: string }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: "black",
        headerStyle: {
          backgroundColor: "white",
          shadowColor: "rgba(255, 255, 255, 0.3)",
        },
      }}>
      {screenName === "Videos" ? (
        <Stack.Screen
          name='Videos'
          component={Video}
          options={{
            headerStyle: {
              backgroundColor: "black",
            },
            headerShown: false,
          }}
        />
      ) : null}
    </Stack.Navigator>
  );
}
