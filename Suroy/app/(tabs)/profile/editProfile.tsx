import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditProfileScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [name, setName] = useState("War");
  const [email, setEmail] = useState("warrenstravel@gmail.com");
  const [answer1, setAnswer1] = useState(
    "Teleport to Santorini, Greece: The picturesque landscapes, crystal-clear blue waters, and charming white-washed buildings make it a dream destination",
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn}>
          <Text style={styles.headerBackText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerName}>John Doe</Text>
          <Text style={styles.headerStatus}>40% Complete</Text>
        </View>

        <TouchableOpacity style={styles.headerBtn}>
          <Text style={styles.headerDoneText}>Done</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* --- VISIBILITY CARD --- */}
        <View style={styles.visibilityCard}>
          <View style={styles.visTextContainer}>
            <Text style={styles.visTitle}>Profile Visibility</Text>
            <Text style={styles.visSubtitle}>
              Your profile is currently visible to all Suroy users
            </Text>
          </View>
          <View style={styles.visToggleContainer}>
            <Switch
              trackColor={{ false: "#767577", true: "#4ADE80" }} // green-400
              thumbColor={"#f4f3f4"}
              onValueChange={setIsVisible}
              value={isVisible}
            />
          </View>
        </View>

        {/* --- PROFILE PICTURE --- */}
        <View style={styles.section}>
          <Text style={styles.label}>Profile Picture</Text>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarWrapper}>
              <Image
                source={{ uri: "https://placehold.co/236x355/png" }}
                style={styles.avatar}
              />
              {/* Dark Overlay */}
              <View style={styles.avatarOverlay} />
            </View>

            {/* Camera Icon Button */}
            <TouchableOpacity style={styles.cameraBtn}>
              <Ionicons name="camera" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* --- FORM FIELDS --- */}
        <View style={styles.section}>
          <Text style={styles.label}>Name</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>
        </View>

        {/* --- PICTURES GRID --- */}
        <View style={styles.section}>
          <Text style={styles.label}>Pictures</Text>
          <View style={styles.grid}>
            {/* Photo 1 */}
            <View style={styles.gridItem}>
              <Image
                source={{ uri: "https://placehold.co/274x118/png" }}
                style={styles.gridImage}
              />
              <Text style={styles.imgCaption} numberOfLines={1}>
                🏖️ Suits, Sand, and...
              </Text>
              <TouchableOpacity style={styles.deleteBtn}>
                <Ionicons name="trash" size={12} color="#DC2626" />
              </TouchableOpacity>
            </View>

            {/* Photo 2 */}
            <View style={styles.gridItem}>
              <Image
                source={{ uri: "https://placehold.co/231x154/png" }}
                style={styles.gridImage}
              />
              <TouchableOpacity style={styles.deleteBtn}>
                <Ionicons name="trash" size={12} color="#DC2626" />
              </TouchableOpacity>
            </View>

            {/* Photo 3 */}
            <View style={styles.gridItem}>
              <Image
                source={{ uri: "https://placehold.co/188x282/png" }}
                style={styles.gridImage}
              />
              <TouchableOpacity style={styles.deleteBtn}>
                <Ionicons name="trash" size={12} color="#DC2626" />
              </TouchableOpacity>
            </View>

            {/* Add Photo Button */}
            <TouchableOpacity style={[styles.gridItem, styles.addPhotoBtn]}>
              <Ionicons name="add" size={32} color="#D6D3D1" />
            </TouchableOpacity>
          </View>
        </View>

        {/* --- PROFILE ANSWERS --- */}
        <View style={styles.section}>
          <Text style={styles.label}>Profile Answers</Text>

          {/* Answer Card 1 (Filled) */}
          <View style={styles.answerCard}>
            <View style={styles.answerHeader}>
              <Text style={styles.promptText}>Teleport for a day, where?</Text>
              <TouchableOpacity style={styles.editPromptIcon}>
                <Ionicons name="pencil" size={12} color="#FB923C" />
              </TouchableOpacity>
            </View>
            <Text style={styles.answerText}>{answer1}</Text>
          </View>

          {/* Answer Card 2 (Empty) */}
          <TouchableOpacity style={styles.answerCard}>
            <View style={styles.answerHeader}>
              <Text style={styles.emptyPromptText}>Tap to select a prompt</Text>
              <View style={styles.editPromptIcon}>
                <Ionicons name="add" size={14} color="#FFF" />
              </View>
            </View>
            <Text style={styles.emptyAnswerText}>and answer it</Text>
          </TouchableOpacity>

          {/* Answer Card 3 (Empty) */}
          <TouchableOpacity style={styles.answerCard}>
            <View style={styles.answerHeader}>
              <Text style={styles.emptyPromptText}>Tap to select a prompt</Text>
              <View style={styles.editPromptIcon}>
                <Ionicons name="add" size={14} color="#FFF" />
              </View>
            </View>
            <Text style={styles.emptyAnswerText}>and answer it</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom padding for scrolling */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F5", // zinc-100
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#F4F4F5",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerBtn: {
    padding: 5,
  },
  headerBackText: {
    fontSize: 16,
    color: "#172554", // blue-950
    textDecorationLine: "underline",
    fontWeight: "500",
  },
  headerDoneText: {
    fontSize: 16,
    color: "#172554",
    textDecorationLine: "underline",
    fontWeight: "500",
  },
  headerTitleContainer: {
    alignItems: "center",
  },
  headerName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#172554",
  },
  headerStatus: {
    fontSize: 16,
    color: "#EF4444", // red-500
    fontWeight: "500",
  },

  // Visibility Card
  visibilityCard: {
    backgroundColor: "#F3F4F6", // gray-100
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
    marginTop: 10,
    shadowColor: "#030096",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 27,
    elevation: 2,
  },
  visTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  visTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#172554",
    marginBottom: 4,
  },
  visSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    lineHeight: 16,
  },
  visToggleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  // Section Global
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#475569", // slate-600
    marginBottom: 12,
    marginLeft: 4,
  },

  // Avatar
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    alignSelf: "flex-start", // Keeps it left aligned like design
    marginLeft: 10,
  },
  avatarWrapper: {
    width: 112, // w-28
    height: 112,
    borderRadius: 56,
    borderWidth: 4,
    borderColor: "#EF4444", // red-500
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  avatarOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  cameraBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFF",
  },

  // Inputs
  inputContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "transparent", // The design had Field-Color which implies white/input bg
    overflow: "hidden",
    height: 56, // h-14
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  input: {
    fontSize: 16,
    color: "#475569",
    fontWeight: "500",
  },

  // Grid
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  gridItem: {
    width: "48%", // Approx half width
    aspectRatio: 1,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    overflow: "hidden",
    position: "relative",
    marginBottom: 12,
  },
  gridImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imgCaption: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    fontSize: 12,
    color: "#475569",
    backgroundColor: "rgba(255,255,255,0.8)",
    paddingHorizontal: 4,
    borderRadius: 4,
    overflow: "hidden",
  },
  deleteBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    backgroundColor: "#FDA4AF", // rose-300
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#F4F4F5",
  },
  addPhotoBtn: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D6D3D1", // stone-300
  },

  // Profile Answers
  answerCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#D6D3D1",
  },
  answerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  promptText: {
    fontSize: 16,
    color: "#172554", // blue-950
    flex: 1,
    marginRight: 10,
  },
  emptyPromptText: {
    fontSize: 16,
    color: "#475569",
    fontWeight: "500",
  },
  editPromptIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FDE68A", // very light orange
    alignItems: "center",
    justifyContent: "center",
  },
  answerText: {
    fontSize: 12,
    color: "#475569",
    lineHeight: 18,
  },
  emptyAnswerText: {
    fontSize: 12,
    color: "#6B7280",
  },
});
