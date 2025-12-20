import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  MoreHorizontal,
  MapPin,
  CheckCircle2,
  PieChart,
  User,
  MessageCircle,
} from "lucide-react-native";

const { width, height } = Dimensions.get("window");

// --- Components ---

const Tag = ({ label, icon, color }) => (
  <View
    style={[
      styles.tagContainer,
      { borderColor: color, backgroundColor: color + "20" },
    ]}
  >
    <Text style={styles.tagIcon}>{icon}</Text>
    <Text style={styles.tagText}>{label}</Text>
  </View>
);

const InfoCard = ({ title, content }) => (
  <View style={styles.infoCard}>
    <Text style={styles.infoTitle}>{title} </Text>
    <Text style={styles.infoContent}>{content}</Text>
  </View>
);

const ProfileAnswer = ({ question, answer }) => (
  <View style={styles.answerCard}>
    <View style={styles.answerHeader}>
      <Text style={styles.answerQuestion}>{question}</Text>
      <View style={styles.orangeDot} />
    </View>
    <Text style={styles.answerText}>{answer}</Text>
  </View>
);

const TempoStat = ({ label, percent, color }) => (
  <View style={styles.tempoStat}>
    <Text style={[styles.tempoPercent, { color: "#334155" }]}>{percent}</Text>
    <Text style={styles.tempoLabel}>{label}</Text>
  </View>
);

// --- Main Screen ---

export default function TripDetailsScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Background Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: "https://placehold.co/1079x853" }}
          style={styles.backgroundImage}
        />
        <View style={styles.imageOverlay} />
      </View>

      {/* Header Buttons (Absolute) */}
      <SafeAreaView style={styles.headerContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <ArrowLeft size={24} color="#172554" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <MoreHorizontal size={24} color="#172554" />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Main Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Spacer to push content down */}
        <View style={{ height: 280 }} />

        {/* White Sheet */}
        <View style={styles.sheet}>
          {/* Handle Bar */}
          <View style={styles.handleBar} />

          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Swim with Butanding</Text>
            <View style={styles.locationRow}>
              <MapPin size={16} color="#334155" style={{ marginRight: 4 }} />
              <Text style={styles.locationText}>Oslob, Cebu, Philippines</Text>
            </View>
          </View>

          {/* Description / Tags */}
          <Text style={styles.sectionHeader}>Great for travelers who are:</Text>
          <View style={styles.tagsRow}>
            <Tag label="Beach Lover" icon="🐚" color="#fca5a5" />
            <Tag label="Cultural Explorer" icon="🖼️" color="#fda4af" />
            <Tag label="Organized" icon="🎯" color="#f43f5e" />
          </View>

          {/* Info Cards */}
          <View style={{ gap: 12, marginVertical: 20 }}>
            <InfoCard
              title="Best Time to Visit:"
              content="During the Dry Season (November to May)"
            />
            <InfoCard
              title="What to expect?"
              content="An early start for an organized but crowded experience swimming with butanding, fed near shore daily, allowing close-up snorkeling/diving amidst many people."
            />
          </View>

          {/* Trip Tempo (Simulated Chart Section) */}
          <View style={styles.tempoContainer}>
            <View style={styles.tempoHeaderRow}>
              <Text style={styles.tempoTitle}>Warren’s Trip Tempo</Text>
            </View>

            <View style={styles.tempoContent}>
              {/* Abstract Visual Representation of the Chart */}
              <View style={styles.chartVisual}>
                <View
                  style={[
                    styles.chartSlice,
                    { backgroundColor: "#ef4444", flex: 2 },
                  ]}
                />
                <View
                  style={[
                    styles.chartSlice,
                    { backgroundColor: "#fca5a5", flex: 1 },
                  ]}
                />
                <View
                  style={[
                    styles.chartSlice,
                    { backgroundColor: "#fee2e2", flex: 1 },
                  ]}
                />
              </View>

              <View style={styles.tempoStatsRow}>
                <TempoStat percent="50%" label="Balanced ✅" />
                <TempoStat percent="25%" label="Active" />
                <TempoStat percent="25%" label="Calm" />
              </View>
            </View>
          </View>

          {/* Done Button */}
          <TouchableOpacity style={styles.doneButton}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Answers Section */}
        <View style={styles.profileSection}>
          <Text style={styles.profileTitle}>Profile Answers</Text>

          <ProfileAnswer
            question="Teleport for a day, where?"
            answer="Teleport to Santorini, Greece: The picturesque landscapes, crystal-clear blue waters, and charming white-washed buildings make it a dream destination"
          />

          <TouchableOpacity style={styles.promptButton}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <Text style={styles.promptTitle}>Tap to select a prompt</Text>
              <View style={styles.orangeDotSmall} />
            </View>
            <Text style={styles.promptSubtitle}>and answer it</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.promptButton}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <Text style={styles.promptTitle}>Tap to select a prompt</Text>
              <View style={styles.orangeDotSmall} />
            </View>
            <Text style={styles.promptSubtitle}>and answer it</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

// --- Styles ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f5", // zinc-100
  },
  // Header / Background
  imageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: 400,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(244, 244, 245, 0.3)", // slight wash
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    zIndex: 10,
  },
  iconButton: {
    width: 44,
    height: 44,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Main Sheet
  scrollContent: {
    paddingBottom: 20,
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingBottom: 30,
    minHeight: 500,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: "#cbd5e1",
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 20,
  },
  titleSection: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#083344", // cyan-950
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 15,
    color: "#334155", // slate-700
    fontWeight: "500",
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 12,
  },

  // Tags
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  tagContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  tagIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  tagText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#083344",
  },

  // Info Cards
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1.5,
    borderColor: "#bbf7d0", // green-200
    shadowColor: "rgba(0,0,0,0.05)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 4,
  },
  infoContent: {
    fontSize: 13,
    color: "#475569",
    lineHeight: 18,
  },

  // Trip Tempo
  tempoContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: "#bbf7d0",
    marginBottom: 24,
  },
  tempoHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  tempoTitle: {
    fontSize: 12,
    color: "#64748b",
  },
  tempoContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  chartVisual: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    flexDirection: "row",
    marginRight: 16,
    borderWidth: 4,
    borderColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  chartSlice: {
    height: "100%",
  },
  tempoStatsRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 8,
  },
  tempoStat: {
    alignItems: "flex-start",
  },
  tempoPercent: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 2,
  },
  tempoLabel: {
    fontSize: 10,
    color: "#64748b",
  },

  // Done Button
  doneButton: {
    backgroundColor: "#fb923c", // orange-400
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#fb923c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  doneButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  // Profile Section
  profileSection: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  profileTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 16,
    marginLeft: 4,
  },
  answerCard: {
    backgroundColor: "#fff", // Field-Color
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#d6d3d1", // stone-300
  },
  answerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  answerQuestion: {
    fontSize: 15,
    color: "#172554", // blue-950
    fontWeight: "400",
  },
  orangeDot: {
    width: 14,
    height: 14,
    backgroundColor: "#fb923c",
    borderRadius: 2, // slightly rounded square from design
  },
  orangeDotSmall: {
    width: 10,
    height: 10,
    backgroundColor: "#fb923c",
    borderRadius: 2,
  },
  answerText: {
    fontSize: 12,
    color: "#475569", // slate-600
    lineHeight: 18,
  },
  promptButton: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#d6d3d1",
    justifyContent: "center",
    height: 80,
  },
  promptTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#475569",
  },
  promptSubtitle: {
    fontSize: 12,
    color: "#9ca3af", // gray-500
  },
});
