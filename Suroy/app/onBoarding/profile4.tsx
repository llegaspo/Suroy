import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native";

const { width, height } = Dimensions.get("window");

const CompletionScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* --- Background --- */}
      <Image
        source={{ uri: "https://placehold.co/514x913" }}
        style={styles.backgroundImage}
        blurRadius={4} // blur-sm
      />
      <View style={styles.darkOverlay} />

      {/* --- Header Content --- */}
      <Text style={styles.brandTitle}>Suroy</Text>
      <Text style={styles.brandSubtitle}>
        Reimagine Travel Experience in Cebu
      </Text>

      {/* --- Back Button --- */}
      <TouchableOpacity style={styles.backButton}>
        <View style={styles.backArrow} />
      </TouchableOpacity>

      {/* --- Success Medal/Badge --- */}
      <View style={styles.medalContainer}>
        {/* Ribbon 1: -39.10deg */}
        <View style={[styles.ribbon, styles.ribbon1]} />
        {/* Ribbon 2: -140.90deg */}
        <View style={[styles.ribbon, styles.ribbon2]} />
        {/* Ribbon 3: 140.90deg */}
        <View style={[styles.ribbon, styles.ribbon3]} />
        {/* Ribbon 4: 39.10deg */}
        <View style={[styles.ribbon, styles.ribbon4]} />

        {/* White Circle */}
        <View style={styles.medalCircle} />

        {/* "Done!" Text */}
        <Text style={styles.medalText}>Done!</Text>
      </View>

      {/* --- Main Center Content --- */}

      {/* Avatar */}
      <Image
        source={{ uri: "https://placehold.co/198x194" }}
        style={styles.avatar}
      />

      {/* Text: Profile Complete */}
      <Text style={styles.profileCompleteText}>
        You’re profile is now complete.
      </Text>

      {/* Text: Great! Ready... */}
      <Text style={styles.successHeadline}>
        Great! You’re ready to start your Suroy!
      </Text>

      {/* --- Footer Actions --- */}

      {/* Button */}
      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startButtonText}>Start Exploring</Text>
      </TouchableOpacity>

      {/* Disclaimer */}
      <Text style={styles.disclaimerText}>
        You can update your preferences any time
      </Text>
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
    backgroundColor: "rgba(23, 23, 23, 0.5)", // neutral-900/50
  },

  // Branding
  brandTitle: {
    position: "absolute",
    left: 120,
    top: 126,
    color: "white",
    fontSize: 48, // text-5xl
    fontWeight: "300", // font-light
    fontFamily: "System", // 'Unbounded'
  },
  brandSubtitle: {
    position: "absolute",
    left: 72,
    top: 193,
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "System", // 'Hanken_Grotesk'
  },

  // Back Button
  backButton: {
    position: "absolute",
    left: 14,
    top: 51,
    width: 56, // w-14
    height: 56, // h-14
    backgroundColor: "#E5E7EB", // Field-Color
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  backArrow: {
    width: 10, // w-2.5
    height: 16, // h-4
    backgroundColor: "#172554", // blue-950
    transform: [{ rotate: "-180deg" }], // origin-top-left -rotate-180
    // Visual adjustment to center it within the touchable since we aren't using absolute inside absolute for the arrow itself
  },

  // Medal Components
  medalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
  },
  ribbon: {
    position: "absolute",
    width: 56, // w-14
    height: 44, // h-11
    backgroundColor: "#ef4444", // red-500
  },
  ribbon1: {
    left: 273.62,
    top: 70.5,
    transform: [{ rotate: "-39.10deg" }],
  },
  ribbon2: {
    left: 341.73,
    top: 104.41,
    transform: [{ rotate: "-140.90deg" }],
  },
  ribbon3: {
    left: 369.13,
    top: 89.24,
    transform: [{ rotate: "140.90deg" }],
  },
  ribbon4: {
    left: 300.99,
    top: 56.85,
    transform: [{ rotate: "39.10deg" }],
  },
  medalCircle: {
    position: "absolute",
    left: 291.27,
    top: 49.27,
    width: 64, // w-16
    height: 64, // h-16
    backgroundColor: "white",
    borderRadius: 32,
  },
  medalText: {
    position: "absolute",
    left: 297,
    top: 66,
    color: "#ef4444", // red-500
    fontSize: 20, // text-xl
    fontWeight: "bold",
    fontFamily: "System", // 'Hanken_Grotesk'
  },

  // Center Content
  avatar: {
    position: "absolute",
    left: 93,
    top: 239,
    width: 192, // w-48
    height: 192, // h-48
    borderRadius: 96,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    // Shadow simulation
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 11,
  },
  profileCompleteText: {
    position: "absolute",
    left: 60,
    top: 453,
    width: 256, // w-64
    color: "white",
    fontSize: 20, // text-xl
    fontWeight: "bold",
    textAlign: "center", // text-center
    fontFamily: "System",
    textShadowColor: "rgba(25, 7, 7, 0.25)",
    textShadowOffset: { width: 0, height: 8 },
    textShadowRadius: 30,
  },
  successHeadline: {
    position: "absolute",
    left: 65,
    top: 538,
    width: 288, // w-72
    color: "white",
    fontSize: 30, // text-3xl
    fontWeight: "bold",
    fontFamily: "System",
    textShadowColor: "rgba(25, 7, 7, 0.25)",
    textShadowOffset: { width: 0, height: 8 },
    textShadowRadius: 30,
  },

  // Footer Actions
  startButton: {
    position: "absolute",
    left: 18,
    top: 659,
    width: 320, // w-80
    height: 80, // h-20
    backgroundColor: "#fb923c", // orange-400
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0)", // implicit border in HTML
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 11,
    elevation: 4,
  },
  startButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "System",
  },
  disclaimerText: {
    position: "absolute",
    left: 86,
    top: 765,
    width: 288, // w-72
    color: "white",
    fontSize: 12, // text-xs
    fontWeight: "300", // font-light
    textAlign: "center",
    fontFamily: "System",
  },
});

export default CompletionScreen;
