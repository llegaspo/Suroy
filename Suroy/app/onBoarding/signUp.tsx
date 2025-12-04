import React, { useState } from "react";
import { Text, TouchableOpacity, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { router } from "expo-router";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      router.replace("./signIn");
    } catch (e: any) {
      console.log(e);
      alert("Sign In Failed: " + e.message);
    }
  };

  return (
    <SafeAreaView>
      <Text>Login</Text>
      <TextInput placeholder="email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={signUp}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace("./signIn")}>
        <Text>Already have an account?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
