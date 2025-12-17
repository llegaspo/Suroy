import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";

const { width, height } = Dimensions.get("window");

const TripSetupScreen = () => {
  // State to manage selection (simulating the active "Currently traveling" state in your HTML)
  const [selectedOption, setSelectedOption] = useState("Currently traveling");

  const options = [
    { id: 1, label: "🌏  Currently traveling" },
    { id: 2, label: "✈️  Leaving on a trip soon" },
    { id: 3, label: "✏️  Planning a future trip" },
    { id: 4, label: "🔎  Just exploring for now" },
    { id: 5, label: "👥  Looking for travel buddies" },
    { id: 6, label: "🚞  Open to spontaneous trips" },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* --- Background --- */}
      <Image
        source={{ uri: "https://placehold.co/514x913" }}
        style={styles.backgroundImage}
        blurRadius={4} // Simulating blur-sm
      />
      <View style={styles.darkOverlay} />

      {/* --- Header Elements --- */}

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton}>
        <View style={styles.backArrow} />
      </TouchableOpacity>

      {/* Profile Setup Badge */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Profile Setup</Text>
      </View>

      {/* Step Counter (Medal/Ribbon) */}
      <View style={styles.ribbonContainer}>
        {/* Ribbon Tail 1 */}
        <View style={styles.ribbonTailOne} />
        {/* Ribbon Tail 2 */}
        <View style={styles.ribbonTailTwo} />
        {/* Circle */}
        <View style={styles.stepCircle} />
        {/* Text */}
        <View style={styles.stepTextContainer}>
          <Text style={styles.stepNumberActive}>2</Text>
          <Text style={styles.stepSlash}>/</Text>
          <Text style={styles.stepNumberTotal}>3</Text>
        </View>
      </View>

      {/* Title Section */}
      <View style={styles.headerTextContainer}>
        <Text style={styles.title}>What are you up to?</Text>
        <Text style={styles.subtitle}>
          Current travel status to help match similar travelers status
        </Text>
      </View>

      {/* --- Bottom Sheet --- */}
      <View style={styles.bottomSheet}>
        {/* Drag Handle Container */}
        <View style={styles.sheetHeader}>
          {/* Using Border to simulate outline logic from HTML */}
          <View style={styles.dragHandle} />
        </View>

        {/* Options List */}
        <View style={styles.optionsContainer}>
          {options.map((opt, index) => {
            // Calculate top position based on index to match absolute HTML logic
            // (70px start + 76px gap per item)
            const topPos = 70 + index * 76;
            const isSelected = selectedOption === opt.label;

            return (
              <TouchableOpacity
                key={opt.id}
                style={[styles.optionCard, { top: topPos }]}
                onPress={() => setSelectedOption(opt.label)}
                activeOpacity={0.9}
              >
                {/* Checkbox Logic */}
                <View style={styles.checkboxContainer}>
                  {isSelected ? (
                    <View style={styles.checkboxSelected}>
                      <View style={styles.checkboxCheckmark} />
                    </View>
                  ) : (
                    <View style={styles.checkboxUnselected} />
                  )}
                </View>

                {/* Text */}
                <Text style={styles.optionText}>{opt.label}</Text>
              </TouchableOpacity>
            );
          })}

          {/* Note Text */}
          <Text style={styles.helperText}>
            Multiple options can be selected
          </Text>
        </View>

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    overflow: "hidden",
  },

  // Background
  backgroundImage: {
    width: 514,
    height: 913,
    position: "absolute",
    left: -31,
    top: -54,
    resizeMode: "cover",
  },
  darkOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 854,
    backgroundColor: "rgba(23, 23, 23, 0.5)", // neutral-900/50
  },

  // Back Button
  backButton: {
    position: "absolute",
    left: 14,
    top: 51,
    width: 56, // w-14 (14 * 4)
    height: 56,
    backgroundColor: "#E5E7EB", // Field-Color approx
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  backArrow: {
    width: 10,
    height: 16,
    backgroundColor: "#172554", // blue-950
    transform: [{ rotate: "180deg" }], // origin-top-left -rotate-180 logic
    // Using a simple rectangle here, ideally use an Icon or SVG
  },

  // Badge
  badge: {
    position: "absolute",
    left: 84,
    top: 53,
    width: 128, // w-32
    height: 56, // h-14
    backgroundColor: "#06b6d4", // cyan-500
    borderRadius: 10,
    justifyContent: "center",
    paddingLeft: 20,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 5,
    zIndex: 10,
  },
  badgeText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "System",
  },

  // Ribbon / Counter
  ribbonContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: 200,
    zIndex: 10,
  },
  ribbonTailOne: {
    position: "absolute",
    left: 273,
    top: 70,
    width: 56,
    height: 44,
    backgroundColor: "#ef4444", // red-500
    transform: [{ rotate: "-39.1deg" }],
  },
  ribbonTailTwo: {
    position: "absolute",
    left: 341,
    top: 103,
    width: 56,
    height: 44,
    backgroundColor: "#ef4444", // red-500
    transform: [{ rotate: "-140.9deg" }],
  },
  stepCircle: {
    position: "absolute",
    left: 291,
    top: 49,
    width: 64, // w-16
    height: 64,
    backgroundColor: "white",
    borderRadius: 32,
  },
  stepTextContainer: {
    position: "absolute",
    left: 303,
    top: 63,
    flexDirection: "row",
    alignItems: "center",
  },
  stepNumberActive: {
    color: "#ef4444",
    fontSize: 24,
    fontWeight: "bold",
  },
  stepSlash: {
    color: "#083344", // cyan-950
    fontSize: 24,
    marginHorizontal: 4,
  },
  stepNumberTotal: {
    color: "#ef4444",
    fontSize: 24,
    fontWeight: "bold",
  },

  // Text Content
  headerTextContainer: {
    position: "absolute",
    top: 151,
    left: 16,
    zIndex: 5,
  },
  title: {
    fontSize: 30, // 3xl approx
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(25, 7, 7, 0.25)",
    textShadowOffset: { width: 0, height: 8 },
    textShadowRadius: 30,
    marginBottom: 20, // push subtitle down
  },
  subtitle: {
    position: "absolute",
    top: 20, // 171 - 151
    left: 4, // 20 - 16
    width: 320,
    fontSize: 12,
    color: "#64748b", // slate-500
    lineHeight: 14,
  },

  // Bottom Sheet
  bottomSheet: {
    position: "absolute",
    top: 239,
    left: 0,
    width: "100%", // w-96 roughly, assuming full width
    height: 635,
    alignItems: "center",
  },
  sheetHeader: {
    width: "100%",
    height: 609,
    backgroundColor: "white",
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
    position: "absolute",
    top: 0,
    overflow: "hidden",
  },
  dragHandle: {
    position: "absolute",
    left: 146,
    top: 22,
    width: 96, // w-24
    height: 4, // height 0 with outline 4 in css
    backgroundColor: "#083344", // cyan-950
    borderRadius: 2,
  },

  // Options Area
  optionsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 519,
  },
  helperText: {
    position: "absolute",
    top: 20,
    left: 14,
    width: 320,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "300",
    color: "#334155", // slate-700
  },

  // Option Card
  optionCard: {
    position: "absolute",
    left: 13,
    width: 320, // w-80
    height: 64, // h-16
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 11,
    elevation: 3,
    borderColor: "#bbf7d0", // green-200
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    position: "absolute",
    left: 61, // 74 - 13 (parent padding)
    fontSize: 16,
    fontWeight: "bold",
    color: "#334155", // slate-700
  },

  // Checkboxes
  checkboxContainer: {
    position: "absolute",
    left: 22, // 35 - 13
    top: 20,
  },
  checkboxUnselected: {
    width: 20, // w-5 approx
    height: 20,
    borderWidth: 2,
    borderColor: "#bbf7d0", // green-200 (outline-green-200)
    borderRadius: 4,
  },
  checkboxSelected: {
    width: 20, // w-4 + rounded-5px
    height: 20,
    backgroundColor: "#3b82f6", // blue-500
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    // Outline simulation
    borderWidth: 2,
    borderColor: "#3b82f6",
  },
  checkboxCheckmark: {
    width: 12,
    height: 10,
    backgroundColor: "white", // Simulating the inner dot/check
    borderRadius: 2,
  },

  // Continue Button
  continueButton: {
    position: "absolute",
    left: 19,
    top: 535,
    width: 320, // w-80
    height: 40, // h-10
    backgroundColor: "#fb923c", // orange-400
    borderRadius: 12,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 11,
    elevation: 4,
    borderWidth: 2,
    borderColor: "#f4f4f5", // zinc-100
    justifyContent: "center",
    alignItems: "center",
  },
  continueButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "System",
  },
});

export default TripSetupScreen;
