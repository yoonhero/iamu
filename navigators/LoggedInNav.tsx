import React from "react";
import TabsNav from "./TabsNav";
import { createStackNavigator } from "@react-navigation/stack";
import SharedStackNav from "./SharedStackNav";
import Video from "../screens/Video";
import Profile from "../screens/Profile";
import Videos from "../screens/Videos";

const Stack = createStackNavigator();

export default function LoggedInNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Video'
        options={{
          headerShown: false,
        }}
        component={Video}
      />
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='Videos' component={Videos} />
    </Stack.Navigator>
  );
}
