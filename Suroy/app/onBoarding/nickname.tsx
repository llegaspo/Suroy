import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function AskNickname() {
  const [nickname, setNickname] = useState("");

  return (
    <View>
      <Text>What should we call you?</Text>
      <TextInput
        placeholder="nickname"
        value={nickname}
        onChangeText={setNickname}
      />
      <TouchableOpacity>
        <Text>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
