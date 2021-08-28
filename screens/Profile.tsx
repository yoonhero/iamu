import React from "react";
import { View, Text } from "react-native";

const Profile = ({ navigation }: { navigation: any }) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Text>Yoonhero</Text>
    </View>
  );
};

export default Profile;
