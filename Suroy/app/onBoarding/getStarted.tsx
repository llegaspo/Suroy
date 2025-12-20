import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function SuroyScreen() {
  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        // Make sure to switch this to your local require() image for best quality!
        source={{
          uri: "https://drive.google.com/uc?export=view&id=1umlPYXvh8pAm6UpvL0y-A0gPL-9Ju52n",
        }}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* Gradient Overlay */}
      <LinearGradient
        colors={["transparent", "rgba(244, 244, 245, 0.6)", "#f4f4f5"]}
        style={styles.gradientOverlay}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Title Section - NOW CENTERED */}
      <View style={styles.topContent}>
        <Text style={styles.titleText}>Suroy</Text>
        <Text style={styles.subtitleText}>
          Reimagine Travel Experience in Cebu
        </Text>
      </View>

      {/* Bottom Section - NOW CENTERED */}
      <View style={styles.bottomContent}>
        {/* Get Started Button */}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => router.push("./onBoarding1")}
        >
          <View style={styles.iconWrapper}>
            <AntDesign name="arrowright" size={24} color="#fb923c" />
          </View>
          <Text style={styles.buttonText}>Get started</Text>
        </TouchableOpacity>

        {/* Login Link */}
        <View style={styles.loginLinkContainer}>
          <Text style={styles.textGray}>Already joined?</Text>
          <TouchableOpacity onPress={() => router.replace("./signIn")}>
            <Text style={styles.textDarkBlue}> Sign in</Text>
          </TouchableOpacity>
        </View>

        {/* Footer / Terms */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            <Text style={styles.footerTextNormal}>
              By tapping Get started, you agree with our{" "}
            </Text>
            <Text style={styles.footerTextBold}>Terms.</Text>
            <Text style={styles.footerTextNormal}>
              {"\n"}See how we process data in our{" "}
            </Text>
            <Text style={styles.footerTextBold}>Privacy Policy.</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f5",
  },
  backgroundImage: {
    position: "absolute",
    width: width,
    height: height + 50,
    top: 0,
    left: 0,
  },
  gradientOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "50%",
  },

  // -- Top Content (Centered) --
  topContent: {
    position: "absolute",
    top: "50%", // Adjusted to look balanced
    width: "100%", // Ensures it spans full width for centering
    alignItems: "center", // Horizontal centering
  },
  titleText: {
    fontSize: 48,
    fontWeight: "300",
    color: "#083344",
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
    marginBottom: 8,
    textAlign: "center", // Text centering
  },
  subtitleText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0c4a6e",
    textAlign: "center", // Text centering
    maxWidth: "80%", // Prevents it from touching edges on small screens
  },

  // -- Bottom Content (Centered) --
  bottomContent: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    alignItems: "center",
  },

  // -- Button Styles (Centered Internally) --
  buttonContainer: {
    width: 320,
    height: 64,
    backgroundColor: "#fb923c",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Centers the Icon+Text group inside the button
    marginBottom: 24,
    shadowColor: "#fb923c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16, // Space between icon and text
    // Removed absolute positioning here to let flexbox handle it
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  // -- Login Link Styles --
  loginLinkContainer: {
    flexDirection: "row",
    marginBottom: 32,
  },
  textGray: {
    color: "#64748b",
    fontSize: 16,
    fontWeight: "500",
  },
  textDarkBlue: {
    color: "#083344",
    fontSize: 16,
    fontWeight: "700",
  },

  // -- Footer Styles --
  footerContainer: {
    width: 280,
  },
  footerText: {
    textAlign: "center",
    lineHeight: 20,
  },
  footerTextNormal: {
    color: "#083344",
    fontSize: 12,
    fontWeight: "400",
  },
  footerTextBold: {
    color: "#172554",
    fontSize: 12,
    fontWeight: "600",
  },
});
