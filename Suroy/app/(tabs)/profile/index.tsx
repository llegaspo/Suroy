import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TripCard from "@/components/tripCard";

export default function Profile() {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text> Profile </Text>
      <TripCard
        date="November 29"
        destination="moalboal"
        budget="2000"
        estimatedTime="2 hours"
        activities="Beach"
        pastTrips="Aust"
        aiSuggestions={["yes", "ai me"]}
      />
    </SafeAreaView>
  );
}
