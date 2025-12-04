import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

type payload = {
  displayText: string;
  onPressText: (route: string) => void;
  routeTo: string;
};
export default function ChoiceButton({
  displayText,
  onPressText,
  routeTo,
}: payload) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onPressText(routeTo)}>
      <Text>{displayText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    width: "100%",
    height: 64,
    backgroundColor: "000",
    borderRadius: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
  },
  textStyle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
