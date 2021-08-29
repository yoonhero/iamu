import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import VerNhorScrollVideo from "../screens/VerNHorScroll";
import Profile from "../screens/Profile";
import Ver2ColumnsVideos from "../screens/Ver2Columns";

const Stack = createStackNavigator();

export default function LoggedInNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerBackTitleVisible: false,
        headerStyle: {
          borderBottomColor: "rgba(255, 255, 255, 0.3)",
          shadowColor: "rgba(255, 255, 255, 0.3)",
          backgroundColor: "black",
        },
      }}>
      <Stack.Screen
        name='Video'
        options={{
          headerShown: false,
        }}
        component={VerNhorScrollVideo}
      />
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='Videos' component={Ver2ColumnsVideos} />
    </Stack.Navigator>
  );
}
