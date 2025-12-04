import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

type TripData = {
  date: string;
  destination: string;
  budget?: string;
  estimatedTime?: string;
  activities?: string;
  pastTrips?: string;
  aiSuggestions?: string[];
};

export default function TripCardForm() {
  const [trip, setTrip] = useState<TripData>({
    date: "",
    destination: "",
    budget: "",
    estimatedTime: "",
    activities: "",
    pastTrips: "",
    aiSuggestions: [],
  });

  const [submitted, setSubmitted] = useState(false);

  // Handle input change
  const handleChange = (key: keyof TripData, value: string) => {
    setTrip({ ...trip, [key]: value });
  };

  // Simulate AI suggestion
  const generateAISuggestions = () => {
    return ["Nearby Beach", "Historical Church"];
  };

  // Submit form
  const handleSubmit = () => {
    setTrip({ ...trip, aiSuggestions: generateAISuggestions() });
    setSubmitted(true);
  };

  // Reset form
  const handleEdit = () => setSubmitted(false);

  if (!submitted) {
    // FORM MODE
    return (
      <ScrollView style={styles.formContainer}>
        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          placeholder="17th of July"
          value={trip.date}
          onChangeText={(text) => handleChange("date", text)}
        />

        <Text style={styles.label}>Destination</Text>
        <TextInput
          style={styles.input}
          placeholder="Moalboal"
          value={trip.destination}
          onChangeText={(text) => handleChange("destination", text)}
        />

        <Text style={styles.label}>Budget</Text>
        <TextInput
          style={styles.input}
          placeholder="₱3000"
          value={trip.budget}
          onChangeText={(text) => handleChange("budget", text)}
        />

        <Text style={styles.label}>Estimated Time</Text>
        <TextInput
          style={styles.input}
          placeholder="3 hours"
          value={trip.estimatedTime}
          onChangeText={(text) => handleChange("estimatedTime", text)}
        />

        <Text style={styles.label}>Desired Activities / Sceneries</Text>
        <TextInput
          style={styles.input}
          placeholder="Snorkeling, Beach Hopping"
          value={trip.activities}
          onChangeText={(text) => handleChange("activities", text)}
        />

        <Text style={styles.label}>Past Trips Inspirations</Text>
        <TextInput
          style={styles.input}
          placeholder="Sandbar Beach, Australia"
          value={trip.pastTrips}
          onChangeText={(text) => handleChange("pastTrips", text)}
        />

        <Button title="Generate Trip Card" onPress={handleSubmit} />
      </ScrollView>
    );
  }

  // CARD MODE
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.date}>{trip.date}</Text>
        <Text style={styles.destination}>{trip.destination}</Text>
      </View>

      <View style={styles.infoRow}>
        {trip.budget ? <Text style={styles.info}>💰 {trip.budget}</Text> : null}
        {trip.estimatedTime ? (
          <Text style={styles.info}>⏱ {trip.estimatedTime}</Text>
        ) : null}
      </View>

      {trip.activities ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activities / Sceneries:</Text>
          <Text style={styles.sectionContent}>{trip.activities}</Text>
        </View>
      ) : null}

      {trip.pastTrips ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Inspired by Past Trips:</Text>
          <Text style={styles.sectionContent}>{trip.pastTrips}</Text>
        </View>
      ) : null}

      {trip.aiSuggestions && trip.aiSuggestions.length > 0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Suggested Destinations:</Text>
          {trip.aiSuggestions.map((s, idx) => (
            <Text key={idx} style={styles.sectionContent}>
              • {s}
            </Text>
          ))}
        </View>
      ) : null}

      <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Trip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontWeight: "600",
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: "#888",
  },
  destination: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  infoRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: "#555",
  },
  section: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
  },
  sectionContent: {
    fontSize: 14,
    color: "#666",
  },
  editButton: {
    marginTop: 12,
    backgroundColor: "#007bff",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
