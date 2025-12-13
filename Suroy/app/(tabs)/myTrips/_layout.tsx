import { Stack } from "expo-router";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

// This is the main layout for the entire app.
// It sets up a Stack Navigator.
export default function MyTripsLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false, // This hides the header globally
        }}
      />
    </SafeAreaProvider>
  );
}
