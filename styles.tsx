import React from "react";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  video: {
    height: height,
    width: width,
  },
  header: {
    width: width,
    height: 100,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    top: 0,
  },
  text: {
    color: "#fff",
    fontSize: 17,
    marginRight: 15,
  },
  mainContainer: {
    height: "40%",
    flexDirection: "row",
    width: width,
    position: "absolute",
    bottom: 20,
  },
  innerLeft: {
    width: "80%",
    height: "100%",
  },
  innerRight: {
    width: "20%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  profile: {
    height: 50,
    width: 50,
    alignItems: "center",
    marginBottom: 25,
  },
  btn: {
    backgroundColor: "#ff5b77",
    width: 20,
    height: 20,
    borderRadius: 10,
    elevation: 5,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: -10,
  },
  dataContainer: {
    height: "100%",
    justifyContent: "flex-end",
    width: "100%",
    position: "absolute",
    bottom: 0,
    padding: 15,
  },
  title: {
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    color: "#e5e5e5",
    fontSize: 16,
    fontWeight: "500",
  },
});
