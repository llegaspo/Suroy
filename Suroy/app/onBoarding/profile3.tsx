import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";

const { width } = Dimensions.get("window");

const TravelStyleScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* --- Background --- */}
      <Image
        source={{ uri: "https://placehold.co/514x913" }}
        style={styles.backgroundImage}
        blurRadius={4}
      />
      <View style={styles.darkOverlay} />

      {/* --- Header Elements --- */}

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton}>
        <View style={styles.backArrow} />
      </TouchableOpacity>

      {/* "Profile Setup" Badge */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Profile Setup</Text>
      </View>

      {/* Step Counter (Ribbon Medal) */}
      <View style={styles.medalContainer}>
        {/* Ribbon Tails */}
        <View style={[styles.ribbon, styles.ribbonLeft]} />
        <View style={[styles.ribbon, styles.ribbonRight]} />
        <View style={[styles.ribbon, styles.ribbonCenter]} />

        {/* Circle */}
        <View style={styles.medalCircle} />

        {/* Text */}
        <View style={styles.medalTextContainer}>
          <Text style={styles.medalNumberActive}>3</Text>
          <Text style={styles.medalSlash}>/</Text>
          <Text style={styles.medalNumberTotal}>3</Text>
        </View>
      </View>

      {/* --- Main Title Area --- */}
      <View style={styles.titleContainer}>
        <Text style={styles.mainTitle}>What is your travel style?</Text>
        <Text style={styles.subTitle}>
          Share your travel vibe! We’ll help you find people who align with it
        </Text>
      </View>

      {/* --- Bottom Sheet --- */}
      <View style={styles.bottomSheetContainer}>
        <View style={styles.bottomSheetCard}>
          {/* Drag Handle */}
          <View style={styles.dragHandle} />

          {/* Section 1: Pick Your Vibe */}
          <Text style={[styles.sectionTitle, { top: 22 }]}>Pick Your Vibe</Text>
          <Text style={[styles.sectionSubtitle, { top: 38 }]}>
            This helps travelers understand your vibe
          </Text>

          <VibeChip label="🌿 Calm" x={23} y={80} />
          <VibeChip label="🔥 Energetic" x={110} y={80} isSelected />
          <VibeChip label="🧭 Adventurous" x={223} y={80} />
          <VibeChip label="🎯 Organized" x={23} y={128} />
          <VibeChip label="🌊 Spontaneous" x={137} y={128} />
          <VibeChip label="📷 Creative" x={270} y={120} isSelected />

          {/* Section 2: Interest Travel Style */}
          <Text style={[styles.sectionTitle, { top: 160 }]}>
            Interest Travel Style
          </Text>
          <Text style={[styles.sectionSubtitle, { top: 179 }]}>
            Select what feels most like your travel style
          </Text>

          <VibeChip label="🌃 Nightlife Enjoyer" x={19} y={225} />
          <VibeChip label="🖼️ Cultural Explorer" x={179} y={225} isSelected />
          <VibeChip label="🐚 Beach Lover" x={19} y={265} />
          <VibeChip label="🎒 Backpacker" x={152} y={265} />
          <VibeChip label="⛰️ Hiker" x={282} y={265} />
          <VibeChip label="🥥 Food Enthusiast" x={20} y={305} isSelected />
          <VibeChip label="🏝️ Island Hopper" x={182} y={305} />

          {/* Section 3: Trip Tempo */}
          <Text style={[styles.sectionTitle, { top: 349 }]}>Trip Tempo</Text>
          <Text style={[styles.sectionSubtitle, { top: 366 }]}>
            How do you like your trips? Choose your pace
          </Text>

          {/* Abstract Tempo Icons (Red Shapes) */}
          {/* Left Icon */}
          <View
            style={{
              position: "absolute",
              left: 19,
              top: 412,
              width: 24,
              height: 24,
            }}
          >
            <View
              style={{
                width: 20,
                height: 16,
                backgroundColor: "#ef4444",
                marginLeft: 2,
                marginTop: 3,
              }}
            />
          </View>
          {/* Middle Icon */}
          <View
            style={{
              position: "absolute",
              left: 182,
              top: 410,
              width: 24,
              height: 24,
            }}
          >
            <View
              style={{
                width: 20,
                height: 14,
                backgroundColor: "#ef4444",
                left: 1,
                top: 6,
                position: "absolute",
              }}
            />
            <View
              style={{
                width: 8,
                height: 8,
                borderColor: "#ef4444",
                borderWidth: 2,
                left: 13,
                top: 5,
                position: "absolute",
              }}
            />
          </View>
          {/* Right Icon */}
          <View
            style={{
              position: "absolute",
              left: 341,
              top: 412,
              width: 24,
              height: 24,
            }}
          >
            <View
              style={{
                width: 4,
                height: 4,
                backgroundColor: "#ef4444",
                left: 15,
                top: 2,
                position: "absolute",
              }}
            />
            <View
              style={{
                width: 20,
                height: 16,
                backgroundColor: "#ef4444",
                left: 3,
                top: 6,
                position: "absolute",
              }}
            />
          </View>

          {/* Slider Visual */}
          <View style={styles.sliderContainer}>
            {/* Left Bar (Cyan) */}
            <View style={styles.sliderLeftBar} />
            {/* Center Gap/Marker */}
            <View style={styles.sliderGap} />
            {/* Right Bar (Blue/Transparent) */}
            <View style={styles.sliderRightBar}>
              <View style={styles.sliderRightFill} />
              <View style={styles.sliderKnob} />
            </View>
          </View>

          {/* Tempo Labels */}
          <Text style={[styles.tempoLabel, { left: 25 }]}>Relaxed</Text>
          <Text style={[styles.tempoLabel, { left: 166 }]}>Balanced</Text>
          <Text style={[styles.tempoLabel, { left: 319 }]}>Active</Text>

          {/* Done Button */}
          <TouchableOpacity style={styles.doneButton}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// --- Reusable Chip Component ---
const VibeChip = ({
  label,
  x,
  y,
  isSelected,
}: {
  label: string;
  x: number;
  y: number;
  isSelected?: boolean;
}) => (
  <View
    style={[
      styles.chipContainer,
      { left: x, top: y },
      isSelected && styles.chipSelected,
    ]}
  >
    <Text style={styles.chipText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  // Background
  backgroundImage: {
    position: "absolute",
    left: -31,
    top: -54,
    width: 514,
    height: 913,
    resizeMode: "cover",
  },
  darkOverlay: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: 854,
    backgroundColor: "rgba(23, 23, 23, 0.5)",
  },

  // Header
  backButton: {
    position: "absolute",
    left: 14,
    top: 51,
    width: 56,
    height: 56,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  backArrow: {
    width: 10,
    height: 16,
    backgroundColor: "#172554",
    transform: [{ rotate: "180deg" }],
  },
  badge: {
    position: "absolute",
    left: 84,
    top: 53,
    width: 128,
    height: 56,
    backgroundColor: "#06b6d4",
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
  },

  // Medal / Step Counter
  medalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: 200,
    zIndex: 10,
  },
  ribbon: {
    position: "absolute",
    width: 56,
    height: 44,
    backgroundColor: "#ef4444",
  },
  ribbonLeft: {
    left: 273,
    top: 70,
    transform: [{ rotate: "-39.1deg" }],
  },
  ribbonRight: {
    left: 341,
    top: 104,
    transform: [{ rotate: "-140.9deg" }],
  },
  ribbonCenter: {
    left: 369,
    top: 89,
    transform: [{ rotate: "140.9deg" }],
  },
  medalCircle: {
    position: "absolute",
    left: 291,
    top: 49,
    width: 64,
    height: 64,
    backgroundColor: "white",
    borderRadius: 32,
  },
  medalTextContainer: {
    position: "absolute",
    left: 303,
    top: 63,
    flexDirection: "row",
    alignItems: "center",
  },
  medalNumberActive: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ef4444",
  },
  medalSlash: {
    fontSize: 24,
    marginHorizontal: 4,
    color: "#083344",
  },
  medalNumberTotal: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ef4444",
  },

  // Title
  titleContainer: {
    position: "absolute",
    top: 151,
    left: 16,
    zIndex: 5,
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(25, 7, 7, 0.25)",
    textShadowOffset: { width: 0, height: 8 },
    textShadowRadius: 30,
    marginBottom: 20,
  },
  subTitle: {
    position: "absolute",
    top: 20,
    left: 4,
    width: 320,
    fontSize: 12,
    color: "#64748b",
  },

  // Bottom Sheet
  bottomSheetContainer: {
    position: "absolute",
    top: 232,
    left: 0,
    width: "100%",
    height: 642,
    alignItems: "center",
  },
  bottomSheetCard: {
    width: "100%", // w-96 effectively
    height: 609,
    backgroundColor: "white",
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
    overflow: "hidden",
  },
  dragHandle: {
    position: "absolute",
    left: 146,
    top: 22,
    width: 96,
    height: 0,
    borderTopWidth: 4,
    borderColor: "#083344",
  },

  // Section Headers
  sectionTitle: {
    position: "absolute",
    left: 19,
    width: 320,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#334155",
  },
  sectionSubtitle: {
    position: "absolute",
    left: 19,
    width: 320,
    textAlign: "center",
    fontSize: 12,
    color: "#334155",
    fontWeight: "300",
  },

  // Chips
  chipContainer: {
    position: "absolute",
    backgroundColor: "#fecaca", // red-200
    borderRadius: 100,
    height: 32, // h-12 in css is 48px usually, but padding visually looks smaller in text.
    // HTML wrapper is h-12 (48px), inner div has px-3 py-1.5.
    // Let's rely on padding.
    paddingHorizontal: 12,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  chipSelected: {
    borderWidth: 1,
    borderColor: "#ef4444",
  },
  chipText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#083344", // cyan-950
  },

  // Slider
  sliderContainer: {
    position: "absolute",
    left: 23,
    top: 440,
    width: 320,
    height: 28,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  sliderLeftBar: {
    flex: 1,
    height: 16,
    backgroundColor: "#06b6d4", // cyan-500
    borderTopLeftRadius: 16,
    borderTopRightRadius: 2,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 2,
  },
  sliderGap: {
    width: 4,
    height: 16, // self-stretch relative
    backgroundColor: "#06b6d4",
    borderRadius: 2,
  },
  sliderRightBar: {
    flex: 1,
    height: 16,
    position: "relative",
  },
  sliderRightFill: {
    width: "100%",
    height: "100%",
    backgroundColor: "#60a5fa", // blue-400
    opacity: 0.7,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 16,
  },
  sliderKnob: {
    position: "absolute",
    left: 155 - 160, // Relative to this container?
    // HTML says left-[155px] inside the flex-1 container.
    // The container is roughly 157px wide.
    // Let's place it at the far right.
    right: 0,
    top: 6,
    width: 4,
    height: 4,
    backgroundColor: "#1E1E1E", // Schemes-On-Secondary (approx black/dark)
    borderRadius: 2,
  },

  // Tempo Labels
  tempoLabel: {
    position: "absolute",
    top: 465,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#334155",
  },

  // Done Button
  doneButton: {
    position: "absolute",
    left: 19,
    top: 535,
    width: 320,
    height: 40,
    backgroundColor: "#fb923c", // orange-400
    borderRadius: 12,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 11,
    elevation: 4,
    borderWidth: 2,
    borderColor: "#f4f4f5",
    justifyContent: "center",
    alignItems: "center",
  },
  doneButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default TravelStyleScreen;
