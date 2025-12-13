import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";

import {
  addTripCard,
  getTripCard,
  updateTripCard,
  deleteTripCard,
  tripCardContent,
} from "@/service/routes/tripCard";

export default function TripTester() {
  const [trips, setTrips] = useState<tripCardContent[]>([]);
  const [newTripText, setNewTripText] = useState("");
  const [loading, setLoading] = useState(false);

  const loadTrips = async () => {
    setLoading(true);
    try {
      const data = await getTripCard();
      setTrips(data);
    } catch (error: any) {
      console.error("Error fetching trips:", error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial load on component mount
  useEffect(() => {
    loadTrips();
  }, []);

  // --- 2. Add Data (Create) ---
  const handleAddTrip = async () => {
    if (!newTripText.trim()) return;

    try {
      await addTripCard(newTripText);
      setNewTripText(""); // Clear input
      await loadTrips(); // Refresh list
    } catch (error: any) {
      Alert.alert("Error adding trip", error.message);
    }
  };

  // --- 3. Update Data (Update) ---
  const handleToggleComplete = async (id: string, currentStatus: boolean) => {
    try {
      // Toggles the 'isComplete' boolean
      await updateTripCard(id, { isComplete: !currentStatus });
      await loadTrips(); // Refresh list to see changes
    } catch (error: any) {
      Alert.alert("Error updating trip", error.message);
    }
  };

  // --- 4. Delete Data (Delete) ---
  const handleDeleteTrip = async (id: string) => {
    try {
      await deleteTripCard(id);
      await loadTrips(); // Refresh list
    } catch (error: any) {
      Alert.alert("Error deleting trip", error.message);
    }
  };

  // --- RENDER ITEM ---
  const renderTripItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text
          style={[styles.tripText, item.isComplete && styles.completedText]}
        >
          {item.content}
        </Text>
        <Text style={styles.dateText}>
          {/* Handle Firestore Timestamp or JS Date */}
          Added:{" "}
          {item.createdAt?.toDate
            ? item.createdAt.toDate().toLocaleDateString()
            : new Date().toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.actions}>
        {/* Toggle Complete Button */}
        <TouchableOpacity
          onPress={() => handleToggleComplete(item.id, item.isComplete)}
          style={[styles.btn, styles.btnComplete]}
        >
          <Text style={styles.btnText}>
            {item.isComplete ? "Undo" : "Done"}
          </Text>
        </TouchableOpacity>

        {/* Delete Button */}
        <TouchableOpacity
          onPress={() => handleDeleteTrip(item.id)}
          style={[styles.btn, styles.btnDelete]}
        >
          <Text style={styles.btnText}>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Trip Card Tester</Text>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Where do you want to go?"
          value={newTripText}
          onChangeText={setNewTripText}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTrip}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Loading Indicator or List */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#007AFF"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={trips}
          keyExtractor={(item) => item.id}
          renderItem={renderTripItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No trips found.</Text>
          }
        />
      )}
    </View>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#F5F5F5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDD",
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: "center",
  },
  addButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  list: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
  },
  tripText: {
    fontSize: 16,
    color: "#333",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#AAA",
  },
  dateText: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  btnComplete: {
    backgroundColor: "#34C759",
  },
  btnDelete: {
    backgroundColor: "#FF3B30",
  },
  btnText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
  },
});
