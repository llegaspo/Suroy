import { Link, router } from "expo-router";
import React, { useState, useEffect } from "react";
import { loadFonts, getFontFamily } from "../fonts/fontConfig";
import { View, Text, StyleSheet } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Initialize() {
  const [isLoading, setIsLoading] = useState(true);
  const [fonts, setFonts] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const fontSuccess = await loadFonts();
        setFonts(fontSuccess);

        // const hasCompletedOnboarding = await AsyncStorage.getItem(
        //   "hasCompletedOnboarding",
        // );

        //current session exit => no onBoarding
        setTimeout(() => {
          if (true) {
            // router.replace("/onBoarding/getStarted");
            router.replace("/(tabs)/myTrips");
          } else {
            router.replace("/(first)/language");
          }
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error initializing app:", error);
        // router.replace("/(first)/language");
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text
          style={[
            styles.loadingText,
            { fontFamily: getFontFamily("SFRounded", "medium", fonts) },
          ]}
        >
          Loading Suroy...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.loadingText,
          { fontFamily: getFontFamily("SFRounded", "medium", fonts) },
        ]}
      >
        Initializing...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0FA3E3",
  },
  loadingText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "500",
  },
});
