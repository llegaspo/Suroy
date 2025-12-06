import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// Adjust this import path based on your folder structure
import { getFontFamily } from "@/fonts/fontConfig";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

export default function SuroyScreen() {
  // Since your Initialize screen handles the waiting, we assume fonts are loaded here.
  const fontsLoaded = true;

  const handleSignIn = () => router.replace("./signIn");

  return (
    <View style={styles.container}>
      {/* --- BACKGROUND MASONRY GRID --- */}

      {/* Column 1 */}
      <View
        style={[styles.cardContainer, { left: 10.85, top: -164, height: 80 }]}
      >
        <View style={[styles.cardBg, { height: 80 }]} />
      </View>

      <View
        style={[styles.cardContainer, { left: 10.85, top: -69, height: 192 }]}
      >
        <View style={[styles.cardBg, { height: 192 }]} />
        <Image
          style={{
            width: 128,
            height: 160,
            top: 28,
            left: 0,
            position: "absolute",
          }}
          source={{ uri: "https://placehold.co/120x158" }}
        />
      </View>

      <View
        style={[styles.cardContainer, { left: 10.85, top: 320, height: 192 }]}
      >
        <View style={[styles.cardBg, { height: 192 }]} />
        <Image
          style={{ width: 128, height: 192, left: -9, position: "absolute" }}
          source={{ uri: "https://placehold.co/135x196" }}
        />
      </View>

      <View
        style={[styles.cardContainer, { left: 10.85, top: 129, height: 176 }]}
      >
        <View style={[styles.cardBg, { height: 176 }]} />
        <Image
          style={{
            width: 256,
            height: 192,
            left: -131,
            top: -10,
            position: "absolute",
          }}
          source={{ uri: "https://placehold.co/262x192" }}
        />
      </View>

      {/* Column 2 */}
      <View
        style={[
          styles.cardBg,
          {
            width: 112,
            height: 160,
            left: 137.72,
            top: -195,
            position: "absolute",
            borderRadius: 16,
          },
        ]}
      />

      <View
        style={[styles.cardContainer, { left: 137.72, top: -30, height: 160 }]}
      >
        <View style={[styles.cardBg, { height: 160 }]} />
        <Image
          style={{
            width: 128,
            height: 160,
            top: -7,
            left: 0,
            position: "absolute",
          }}
          source={{ uri: "https://placehold.co/124x167" }}
        />
      </View>

      <View
        style={[styles.cardContainer, { left: 137.72, top: 450, height: 160 }]}
      >
        <View style={[styles.cardBg, { height: 160 }]} />
        <Image
          style={{
            width: 128,
            height: 160,
            top: -7,
            left: 0,
            position: "absolute",
          }}
          source={{ uri: "https://placehold.co/124x167" }}
        />
      </View>

      <View
        style={[styles.cardContainer, { left: 137.72, top: 257, height: 176 }]}
      >
        <View style={[styles.cardBg, { height: 176 }]} />
        <Image
          style={{
            width: 256,
            height: 176,
            left: -80,
            top: 0,
            position: "absolute",
          }}
          source={{ uri: "https://placehold.co/262x184" }}
        />
      </View>

      <View
        style={[styles.cardContainer, { left: 137.72, top: 135, height: 112 }]}
      >
        <View style={[styles.cardBg, { height: 112 }]} />
        <Image
          style={{
            width: 176,
            height: 128,
            left: -28,
            top: -7,
            position: "absolute",
          }}
          source={{ uri: "https://placehold.co/170x123" }}
        />
      </View>

      {/* Column 3 */}
      <View
        style={[
          styles.cardBg,
          {
            width: 112,
            height: 112,
            left: 264.59,
            top: -164,
            position: "absolute",
            borderRadius: 16,
          },
        ]}
      />

      <View
        style={[styles.cardContainer, { left: 264.59, top: -36, height: 240 }]}
      >
        <View style={[styles.cardBg, { height: 240 }]} />
        <Image
          style={{
            width: 128,
            height: 240,
            left: -5,
            top: -9,
            position: "absolute",
          }}
          source={{ uri: "https://placehold.co/133x248" }}
        />
      </View>

      <View
        style={[
          styles.cardContainer,
          { left: 265.07, top: 214.78, height: 144 },
        ]}
      >
        <Image
          style={{ width: 112, height: 144, borderRadius: 16 }}
          source={{ uri: "https://placehold.co/113x147" }}
        />
      </View>

      <View
        style={[styles.cardContainer, { left: 267, top: 389.72, height: 144 }]}
      >
        <Image
          style={{
            width: 240,
            height: 144,
            left: -24,
            top: 0,
            position: "absolute",
          }}
          source={{ uri: "https://placehold.co/243x147" }}
        />
      </View>

      {/* --- GRADIENT OVERLAY --- */}
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        colors={[
          "rgba(244, 244, 245, 0.75)",
          "rgba(244, 244, 245, 0.25)",
          "rgba(244, 244, 245, 0.95)",
        ]}
        style={styles.gradient}
      />

      {/* --- FLOATING ICON --- */}
      <View style={styles.floatingIconCard}>
        <View style={styles.indigoRect} />
        <View style={styles.orangeDot} />
      </View>

      {/* --- TEXT CONTENT --- */}
      <Text style={styles.titleText}>Suroy</Text>

      <Text style={styles.subtitleText}>
        Reimagine Travel Experience in Cebu
      </Text>

      {/* --- ACTION BUTTON --- */}
      <TouchableOpacity
        onPress={() => router.navigate("./onBoarding1")}
        style={styles.actionButton}
      >
        <View style={styles.buttonIconWrapper}>
          <View style={styles.buttonIconInner} />
        </View>
        <Text style={styles.buttonText}>Get started</Text>
      </TouchableOpacity>

      {/* --- FOOTER LINKS --- */}
      <View style={styles.signInRow}>
        <Text style={styles.textGray}>Already joined? </Text>
        <TouchableOpacity onPress={handleSignIn}>
          <Text style={styles.textSlate}>Sign in</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.termsText}>
        <Text style={styles.textSlateSmall}>
          By tapping Get started, you agree with our{" "}
        </Text>
        <Text style={styles.textBlueSmall}>Terms.{"\n"}</Text>
        <Text style={styles.textSlateSmall}>
          See how we process data in our{" "}
        </Text>
        <Text style={styles.textBlueSmall}>Privacy Policy.</Text>
      </Text>

      {/* --- HOME INDICATOR --- */}
      <View style={styles.homeIndicatorWrapper}>
        <View style={styles.homeIndicator} />
      </View>
    </View>
  );
}

// NOTE: We pass 'true' to getFontFamily assuming this screen is only reached
// after your Initialize screen has successfully loaded fonts.

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f5",
    position: "relative",
    overflow: "hidden",
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
  },
  gradient: {
    position: "absolute",
    width: "100%",
    height: 695,
    top: -8,
    left: 0,
  },
  // Masonry Helpers
  cardContainer: {
    position: "absolute",
    width: 112,
    borderRadius: 16,
    overflow: "hidden",
  },
  cardBg: {
    width: 112,
    backgroundColor: "#d6d3d1",
    borderRadius: 16,
    position: "absolute",
    top: 0,
    left: 0,
  },
  // Floating Icon
  floatingIconCard: {
    width: 112,
    height: 112,
    left: 142.35,
    top: 368,
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 24,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  indigoRect: {
    width: 40,
    height: 64,
    left: 34.5,
    top: 24,
    position: "absolute",
    backgroundColor: "#818cf8",
  },
  orangeDot: {
    width: 12,
    height: 12,
    left: 48.2,
    top: 37.75,
    position: "absolute",
    backgroundColor: "#fb923c",
  },
  // Text
  titleText: {
    position: "absolute",
    left: 120,
    top: 482,
    fontSize: 48,
    color: "#0e7490",
    // Using SFDisplay Light to replace "Unbounded Light"
    fontFamily: getFontFamily("SFDisplay", "light", true),
  },
  subtitleText: {
    position: "absolute",
    left: 69,
    top: 545,
    fontSize: 16,
    color: "#475569",
    lineHeight: 16,
    // Using SFText Medium to replace "Inter Medium"
    fontFamily: getFontFamily("SFText", "medium", true),
  },
  // Button
  actionButton: {
    position: "absolute",
    left: 31.5,
    top: 603,
    width: 320,
    height: 64,
    backgroundColor: "#0e7490",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 104,
  },
  buttonIconWrapper: {
    width: 24,
    height: 24,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonIconInner: {
    width: 16,
    height: 16,
    borderColor: "#f4f4f5",
    borderWidth: 1.5,
    borderRadius: 2,
  },
  buttonText: {
    color: "#f4f4f5",
    fontSize: 16,
    // Using SFText Medium
    fontFamily: getFontFamily("SFText", "medium", true),
  },
  // Footer
  signInRow: {
    position: "absolute",
    left: 115,
    top: 680,
    flexDirection: "row",
  },
  termsText: {
    position: "absolute",
    left: 53.5,
    top: 753,
    textAlign: "center",
    width: 280,
  },
  textGray: {
    color: "#6b7280",
    fontSize: 16,
    fontFamily: getFontFamily("SFText", "medium", true),
  },
  textSlate: {
    color: "#475569",
    fontSize: 16,
    fontFamily: getFontFamily("SFText", "medium", true),
  },
  textSlateSmall: {
    color: "#475569",
    fontSize: 12,
    lineHeight: 20,
    fontFamily: getFontFamily("SFText", "regular", true),
  },
  textBlueSmall: {
    color: "#172554",
    fontSize: 12,
    lineHeight: 20,
    fontFamily: getFontFamily("SFText", "medium", true),
  },
  // Home Indicator
  homeIndicatorWrapper: {
    position: "absolute",
    left: 136,
    top: 820,
    width: 112,
    height: 8,
  },
  homeIndicator: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    borderRadius: 100,
  },
});
