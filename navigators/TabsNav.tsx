import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import SharedStackNav from "./SharedStackNav";
import styled from "styled-components/native";

const Dot = styled.View`
  margin-top: 3px;
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background-color: #0095f6;
`;

const TabBarView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Tabs = createBottomTabNavigator();

//tabBarOptions={ {
//   activeTintColor: "#0077b6",
//   showLabel: false,
//   style: {
//     borderTopColor: "rgba(255, 255, 255, 0.3)",
//     backgroundColor: "white",
//   },
// } }>

export default function TabsNav() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name='Videos'
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "black",
          },
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarView>
              <Feather
                name='video'
                size={focused ? 24 : 20}
                color={color}
                focused={focused}
              />
              {focused ? <Dot /> : null}
            </TabBarView>
          ),
        }}>
        {() => <SharedStackNav screenName='Videos' />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
