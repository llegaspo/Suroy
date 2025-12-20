import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

// 1. Configuration
const IMG_HEIGHT = 380; // Matches the visual space before the white sheet starts

export default function TripDetailsScreen() {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* --- BACKGROUND IMAGE (Fixed) --- */}
      <View style={styles.fixedBackground}>
        <Image
          source={{
            uri: "https://drive.google.com/uc?export=view&id=1CGG4-SdBEbuR2SZRMvI0uLbI_D_hyrNy",
          }}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        {/* Dark overlay for top bar visibility */}
        <View style={styles.overlayGradient} />

        {/* Top Navigation (Visual placeholder based on design) */}
        <SafeAreaView style={styles.topNav}>
          <TouchableOpacity style={styles.navIconContainer}>
            {/* Back Arrow shape */}
            <View style={styles.backArrow} />
          </TouchableOpacity>
          <View style={styles.dotsMenu}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </SafeAreaView>
      </View>

      {/* --- SCROLLABLE OVERLAY --- */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Transparent Spacer: Push content down so Image is visible */}
        <View style={{ height: IMG_HEIGHT - 40 }} />

        {/* --- MAIN WHITE SHEET --- */}
        <View style={styles.sheetContainer}>
          {/* Drag Handle */}
          <View style={styles.dragHandleContainer}>
            <View style={styles.dragHandle} />
          </View>

          {/* 1. TITLE & LOCATION */}
          <View style={styles.headerSection}>
            <Text style={styles.titleText}>Swim with Butanding</Text>
            <Text style={styles.locationText}>📍Oslob, Cebu, Philippines</Text>
          </View>

          {/* 2. TRIP TEMPO / CHARTS */}
          {/* <View style={styles.sectionContainer}> */}
          {/*   <Text style={styles.sectionLabel}> */}
          {/*     Great for travelers who are: */}
          {/*   </Text> */}
          {/*   <Text style={styles.sectionSubLabel}> */}
          {/*     Multiple options can be selected */}
          {/*   </Text> */}
          {/**/}
          {/* Chart Row */}
          {/*   <View style={styles.chartRow}> */}
          {/* 50% Balanced */}
          {/*     <View style={styles.chartItem}> */}
          {/*       <View style={styles.chartBox}> */}
          {/*         <View style={[styles.chartBar, { height: "50%" }]} /> */}
          {/*       </View> */}
          {/*       <Text style={styles.chartPercent}>50%</Text> */}
          {/*       <Text style={styles.chartType}>Balanced ✅</Text> */}
          {/*     </View> */}
          {/* 25% Active */}
          {/*     <View style={styles.chartItem}> */}
          {/*       <View style={styles.chartBox}> */}
          {/*         <View style={[styles.chartBar, { height: "25%" }]} /> */}
          {/*       </View> */}
          {/*       <Text style={styles.chartPercent}>25%</Text> */}
          {/*       <Text style={styles.chartType}>Active</Text> */}
          {/*     </View> */}
          {/* 25% Calm */}
          {/*     <View style={styles.chartItem}> */}
          {/*       <View style={styles.chartBox}> */}
          {/*         <View style={[styles.chartBar, { height: "25%" }]} /> */}
          {/*       </View> */}
          {/*       <Text style={styles.chartPercent}>25%</Text> */}
          {/*       <Text style={styles.chartType}>Calm</Text> */}
          {/*     </View> */}
          {/*   </View> */}
          {/*   <Text style={styles.tempoLabel}>Warren’s Trip Tempo</Text> */}
          {/* </View> */}
          {/**/}
          {/* 3. INFO CARDS (Best Time & Expectation) */}
          <View style={styles.cardContainer}>
            <Text style={styles.infoBody}>
              Dive into the waters of Oslob and get to experience swimming with
              Butanding or in English translation known as “Whale Shark”. These
              sharks are friendly and ultimately loves shrimp.
            </Text>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>Best Time to Visit:</Text>
              <Text style={styles.infoBody}>
                During the Dry Season (November to May)
              </Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>What to expect?</Text>
              <Text style={styles.infoBody}>
                An early start for an organized but crowded experience swimming
                with butanding, fed near shore daily, allowing close-up
                snorkeling/diving amidst many people and boats for about 30
                mins,
              </Text>
            </View>
          </View>

          {/* 4. TAGS */}
          <View style={styles.tagsContainer}>
            <Tag label="🐚 Beach Lover" />
            <Tag label="🖼️ Cultural Explorer" />
            <Tag label="🎯 Organized" />
          </View>

          {/* 5. DONE BUTTON */}
          <TouchableOpacity
            style={styles.doneButton}
            onPress={() => router.back()}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>

          {/* DIVIDER */}
          <View style={styles.divider} />
        </View>
      </ScrollView>
    </View>
  );
}

// --- Helper Components ---
const Tag = ({ label }) => (
  <View style={styles.tagWrapper}>
    <Text style={styles.tagText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f5", // zinc-100
  },

  // Background Image Styles
  fixedBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height * 0.6, // Covers top 60% of screen
    zIndex: 0,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  overlayGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  topNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  navIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  backArrow: {
    width: 10,
    height: 10,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#172554",
    transform: [{ rotate: "45deg" }],
  },
  dotsMenu: {
    flexDirection: "row",
    gap: 4,
    padding: 8,
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 20,
  },
  dot: { width: 5, height: 5, backgroundColor: "#e5e5e5", borderRadius: 2.5 },

  // Scroll Layout
  scrollContent: {
    flexGrow: 1,
  },

  // The White Sheet
  sheetContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
    paddingHorizontal: 24,
    paddingBottom: 24,
    minHeight: height - IMG_HEIGHT + 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  dragHandleContainer: {
    alignItems: "center",
    paddingVertical: 12,
  },
  dragHandle: {
    width: 60,
    height: 4,
    backgroundColor: "#083344", // outline-cyan-950 thick outline from HTML
    borderRadius: 2,
    opacity: 0.2,
  },

  // 1. Header Section
  headerSection: {
    marginTop: 10,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#083344", // cyan-950
    marginBottom: 8,
    textAlign: "center",
  },
  locationText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#334155", // slate-700
    textAlign: "center",
  },

  // 2. Tempo/Charts Section
  sectionContainer: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#334155", // slate-700
    textAlign: "center",
  },
  sectionSubLabel: {
    fontSize: 16,
    fontWeight: "300",
    color: "#334155", // slate-700
    textAlign: "center",
    marginBottom: 16,
  },
  chartRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 8,
  },
  chartItem: {
    alignItems: "center",
    width: 60,
  },
  chartBox: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#bbf7d0", // green-200
    borderRadius: 8,
    justifyContent: "flex-end",
    overflow: "hidden",
    marginBottom: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chartBar: {
    width: "100%",
    backgroundColor: "#ef4444", // red-500
  },
  chartPercent: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#334155",
  },
  chartType: {
    fontSize: 10,
    color: "#334155",
  },
  tempoLabel: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "300",
    color: "#334155",
    marginTop: 8,
  },

  // 3. Info Cards
  cardContainer: {
    gap: 12,
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#bbf7d0", // border-green-200
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#334155",
    marginBottom: 2,
  },
  infoBody: {
    fontSize: 12,
    color: "#334155",
    lineHeight: 18,
    textAlign: "justify",
  },

  // 4. Tags
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 24,
  },
  tagWrapper: {
    backgroundColor: "#fecaca", // red-200
    borderWidth: 1,
    borderColor: "#fda4af", // rose-300
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  tagText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#083344", // cyan-950
  },

  // 5. Done Button
  doneButton: {
    backgroundColor: "#fb923c", // orange-400
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: "#f4f4f5", // zinc-100
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  doneButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },

  divider: {
    height: 1,
    backgroundColor: "#e5e5e5",
    marginBottom: 20,
  },

  // 6. Profile Answers
  answersHeader: {
    fontSize: 16,
    fontWeight: "500",
    color: "#475569", // slate-600
    marginBottom: 12,
  },
  answerCard: {
    backgroundColor: "#F8FAFC", // Field-Color
    borderWidth: 1,
    borderColor: "#d6d3d1", // stone-300
    borderRadius: 16,
    padding: 24,
    marginBottom: 12,
  },
  answerHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  questionText: {
    fontSize: 16,
    color: "#172554", // blue-950
  },
  orangeDotWrapper: {
    width: 24,
    height: 24,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  orangeDot: {
    width: 14,
    height: 14,
    backgroundColor: "#fb923c",
    borderRadius: 7,
  },
  answerBodyText: {
    fontSize: 12,
    color: "#475569", // slate-600
    lineHeight: 16,
  },

  // Prompt Cards
  promptCard: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#d6d3d1",
    borderRadius: 16,
    padding: 24,
    marginBottom: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  promptTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#475569", // slate-600
  },
  promptSubtitle: {
    width: "100%",
    fontSize: 12,
    color: "#6b7280", // gray-500
    marginTop: 4,
  },
});
