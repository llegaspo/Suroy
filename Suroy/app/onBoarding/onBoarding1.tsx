import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
// Adjust path to where your font config is saved
import { getFontFamily } from "@/fonts/fontConfig";

const { width } = Dimensions.get("window");

// CONFIGURATION FOR THE CAROUSEL
const CARD_WIDTH = 260;
const SPACING = 20;
const SNAP_INTERVAL = CARD_WIDTH + SPACING; // The distance to scroll for one item
const SPACER_WIDTH = (width - SNAP_INTERVAL) / 2; // Centers the active card

// DATA FOR THE CARDS
const CARDS = [
  {
    id: 1,
    bg: "#ea580c",
    accent: "#ef4444",
    img: "https://placehold.co/193x370",
    width: 256,
  }, // Orange-600
  {
    id: 2,
    bg: "#fb923c",
    accent: "#fdba74",
    img: "https://placehold.co/170x367",
    width: 240,
  }, // Orange-400
  {
    id: 3,
    bg: "#e5e5e5",
    accent: "#fecdd3",
    img: "https://placehold.co/170x367",
    width: 240,
  }, // Neutral
];

// Reusable Background Shapes Component
const DecorativeShapes = ({ color }) => (
  <>
    <View
      style={[
        styles.shape,
        {
          width: 96,
          height: 160,
          left: 185.48,
          top: 160.34,
          backgroundColor: color,
        },
      ]}
    />
    <View
      style={[
        styles.shape,
        {
          width: 80,
          height: 160,
          left: 272.45,
          top: 160.61,
          backgroundColor: color,
        },
      ]}
    />
    <View
      style={[
        styles.shape,
        {
          width: 28,
          height: 28,
          left: 221.1,
          top: 196.06,
          backgroundColor: color,
        },
      ]}
    />

    <View
      style={[
        styles.shape,
        {
          width: 96,
          height: 160,
          left: -77.58,
          top: 160.34,
          backgroundColor: color,
        },
      ]}
    />
    <View
      style={[
        styles.shape,
        {
          width: 80,
          height: 160,
          left: 9.39,
          top: 160.61,
          backgroundColor: color,
        },
      ]}
    />
    <View
      style={[
        styles.shape,
        {
          width: 28,
          height: 28,
          left: -41.96,
          top: 196.06,
          backgroundColor: color,
        },
      ]}
    />

    <View
      style={[
        styles.shape,
        {
          width: 96,
          height: 160,
          left: -35.55,
          top: -17.61,
          backgroundColor: color,
        },
      ]}
    />
    <View
      style={[
        styles.shape,
        {
          width: 80,
          height: 160,
          left: 51.43,
          top: -17.33,
          backgroundColor: color,
        },
      ]}
    />
    <View
      style={[
        styles.shape,
        {
          width: 28,
          height: 28,
          left: 0.08,
          top: 18.12,
          backgroundColor: color,
        },
      ]}
    />

    <View
      style={[
        styles.shape,
        {
          width: 96,
          height: 160,
          left: 144.45,
          top: -17.61,
          backgroundColor: color,
        },
      ]}
    />
    <View
      style={[
        styles.shape,
        {
          width: 80,
          height: 160,
          left: 231.42,
          top: -17.34,
          backgroundColor: color,
        },
      ]}
    />
    <View
      style={[
        styles.shape,
        {
          width: 28,
          height: 28,
          left: 180.07,
          top: 18.11,
          backgroundColor: color,
        },
      ]}
    />
  </>
);

export default function EmbarkScreen() {
  const fontsLoaded = true;
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      {/* --- PROGRESS BAR --- */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarTrack} />
        <View style={styles.progressBarFill} />
      </View>

      {/* --- ANIMATED CAROUSEL --- */}
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast" // Makes it stop quickly
        snapToInterval={SNAP_INTERVAL} // Forces it to stop on a specific card
        snapToAlignment="start" // Aligns the snap to the start of the view (plus our padding)
        contentContainerStyle={{
          paddingHorizontal: SPACER_WIDTH, // Centers the first and last items
          paddingTop: 140, // General Top Offset
          paddingBottom: 50,
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16} // Ensures smooth animation updates
      >
        {CARDS.map((item, index) => {
          // Interpolation Logic
          const inputRange = [
            (index - 1) * SNAP_INTERVAL,
            index * SNAP_INTERVAL,
            (index + 1) * SNAP_INTERVAL,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -30, 0], // Move UP by 30px when focused
            extrapolate: "clamp",
          });

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1.0, 0.9], // Scale UP to 1.0 when focused, 0.9 otherwise
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 1, 0.7], // Fade out side cards slightly
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={item.id}
              style={[
                styles.cardWrapper,
                {
                  width: CARD_WIDTH,
                  marginRight: SPACING,
                  transform: [{ translateY }, { scale }],
                  opacity,
                },
              ]}
            >
              {/* Actual Card Content */}
              <View style={[styles.cardInner, { backgroundColor: item.bg }]}>
                <DecorativeShapes color={item.accent} />
                <View style={styles.imageWrapper}>
                  <Image
                    source={{ uri: item.img }}
                    style={[
                      styles.image,
                      // Add white border only to first card to match design
                      index === 0 && { borderWidth: 1, borderColor: "white" },
                    ]}
                  />
                </View>
              </View>
            </Animated.View>
          );
        })}
      </Animated.ScrollView>

      {/* --- TEXT CONTENT --- */}
      <Text
        style={[
          styles.title,
          { fontFamily: getFontFamily("SFDisplay", "medium", fontsLoaded) },
        ]}
      >
        Embark on a Travel
      </Text>

      <Text
        style={[
          styles.description,
          { fontFamily: getFontFamily("SFText", "regular", fontsLoaded) },
        ]}
      >
        Connect with like-minded explorers for unforgettable adventures with
        trip cards.
      </Text>

      {/* --- BUTTON --- */}
      <TouchableOpacity style={styles.button}>
        <Text
          style={[
            styles.buttonText,
            { fontFamily: getFontFamily("SFText", "medium", fontsLoaded) },
          ]}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f5",
    position: "relative",
    overflow: "hidden",
  },

  // --- Progress Bar ---
  progressBarContainer: {
    position: "absolute",
    top: 63,
    left: 33.85,
    height: 10,
    width: 320,
    zIndex: 10,
  },
  progressBarTrack: {
    position: "absolute",
    width: 320,
    height: 8,
    backgroundColor: "white",
    borderRadius: 36,
  },
  progressBarFill: {
    position: "absolute",
    left: 1,
    top: 2,
    width: 176,
    height: 5,
    backgroundColor: "#818cf8",
    borderRadius: 36,
  },

  // --- Card Styling ---
  cardWrapper: {
    height: 320,
    justifyContent: "center", // Centers the inner card vertically in the wrapper
    alignItems: "center",
  },
  cardInner: {
    width: "100%",
    height: 320, // Explicit height
    borderRadius: 24,
    overflow: "hidden",
    position: "relative",
    // Card Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  shape: {
    position: "absolute",
  },
  imageWrapper: {
    position: "absolute",
    left: 35,
    top: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.36,
    shadowRadius: 15,
    elevation: 10,
  },
  image: {
    width: 190,
    height: 370,
    borderRadius: 20,
  },

  // --- Typography ---
  title: {
    position: "absolute",
    left: 95,
    top: 520, // Adjusted slightly for layout flow
    fontSize: 20,
    color: "#172554",
    lineHeight: 24,
  },
  description: {
    position: "absolute",
    left: 46.81,
    top: 555, // Adjusted
    width: 288,
    textAlign: "center",
    fontSize: 12,
    color: "#475569",
    lineHeight: 20,
  },

  // --- Button ---
  button: {
    position: "absolute",
    left: 26.85,
    bottom: 50, // Pinned to bottom relative to screen usually better, but using top per design
    top: 718,
    width: 320,
    height: 64,
    backgroundColor: "#0e7490",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  buttonText: {
    color: "#f4f4f5",
    fontSize: 16,
    lineHeight: 16,
  },
});
