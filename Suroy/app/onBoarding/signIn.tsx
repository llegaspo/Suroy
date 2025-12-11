import React, { useState } from "react";
import { Text, TouchableOpacity, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      router.replace("../(tabs)/myTrips");
    } catch (e: any) {
      console.log(e);
      alert("Sign In Failed: " + e.message);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Login</Text>
      <TextInput placeholder="email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={signIn}>
        <Text>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.navigate("./signUp")}>
        <Text>Don't have an account?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
