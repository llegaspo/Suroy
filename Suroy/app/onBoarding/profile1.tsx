import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function TravelerProfileSetup() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* --- Background Image & Overlay --- */}
      <Image
        source={{ uri: "https://placehold.co/514x913" }}
        style={styles.backgroundImage}
        blurRadius={4} // Simulates blur-sm
        resizeMode="cover"
      />
      <View style={styles.darkOverlay} />

      {/* --- Header Elements --- */}

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton}>
        {/* Chevron Icon Shape */}
        <View style={styles.chevronIcon} />
      </TouchableOpacity>

      {/* Profile Setup Badge */}
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>Profile Setup</Text>
      </View>

      {/* Step Counter (Top Right) */}
      <View style={styles.stepCounterContainer}>
        {/* Red Ribbon */}
        <View style={styles.redRibbon} />
        {/* White Circle */}
        <View style={styles.stepCircle} />

        {/* Numbers */}
        <View style={styles.stepTextContainer}>
          <Text style={styles.stepNumberActive}>1</Text>
          <Text style={styles.stepSlash}>/</Text>
          <Text style={styles.stepNumberTotal}>3</Text>
        </View>
      </View>

      {/* --- Main Content --- */}

      {/* Title */}
      <Text style={styles.mainTitle}>Setup your Traveler Profile</Text>

      {/* Avatar Section */}
      <View style={styles.avatarContainer}>
        {/* Main Circle */}
        <View style={styles.avatarCircle} />

        {/* Avatar Abstract Shapes (Person) */}
        <View style={styles.avatarShapeContainer}>
          <View style={styles.avatarHead} />
          <View style={styles.avatarBody} />
        </View>

        {/* Edit Button (Small Circle) */}
        <TouchableOpacity style={styles.editButton}>
          <View style={styles.editIconShape} />
        </TouchableOpacity>
      </View>

      {/* --- Bottom Sheet / Form --- */}
      <View style={styles.bottomSheet}>
        {/* Drag Handle / Top Decoration */}
        <View style={styles.dragHandleContainer}>
          <View style={styles.dragHandle} />
        </View>

        <View style={styles.formContent}>
          {/* Field 1: Display Name */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Display Name</Text>
            <View style={styles.inputBox}>
              <Text style={styles.placeholderText}>
                How should other travelers see you?
              </Text>
            </View>
          </View>

          {/* Field 2: Home Location */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Home Location</Text>
            <View style={styles.inputBox}>
              <Text style={styles.placeholderText}>Where are you based?</Text>
            </View>
          </View>

          {/* Field 3: About Me */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>About Me</Text>
            <View style={[styles.inputBox, styles.textArea]}>
              <Text style={styles.placeholderText}>
                Share something about yourself!
              </Text>
            </View>
          </View>

          {/* Continue Button */}
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

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
  },
  darkOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(23, 23, 23, 0.5)", // neutral-900/50
  },

  // Header - Back Button
  backButton: {
    width: 56,
    height: 56,
    position: "absolute",
    left: 14,
    top: 51,
    backgroundColor: "#E5E7EB", // Field-Color approximation
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  chevronIcon: {
    width: 10,
    height: 16,
    backgroundColor: "#172554", // blue-950
    transform: [{ rotate: "180deg" }], // Matches origin-top-left -rotate-180 logic
  },

  // Header - Badge
  badgeContainer: {
    position: "absolute",
    width: 128,
    height: 56,
    left: 84,
    top: 53,
    backgroundColor: "#06b6d4", // cyan-500
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 20,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 5,
  },
  badgeText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "System", // 'Inter' substitute
  },

  // Header - Step Counter
  stepCounterContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 100, // Estimation for container
    height: 100,
  },
  redRibbon: {
    position: "absolute",
    width: 56,
    height: 44,
    left: 273 - 220, // Adjusting coord relative to local container or screen
    // The HTML has left-[273px]. Assuming screen width 390 roughly.
    // Let's use absolute screen coordinates to match input exactly:
    left: 273,
    top: 70,
    backgroundColor: "#ef4444", // red-500
    transform: [{ rotate: "-39.1deg" }],
    transformOrigin: "top left",
  },
  stepCircle: {
    position: "absolute",
    width: 64,
    height: 64,
    left: 291,
    top: 49,
    backgroundColor: "white",
    borderRadius: 32,
  },
  stepTextContainer: {
    position: "absolute",
    top: 63,
    left: 303,
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

  // Content
  mainTitle: {
    position: "absolute",
    left: 29,
    top: 340,
    width: 300,
    color: "white",
    fontSize: 30, // 3xl approx
    fontWeight: "bold",
    fontFamily: "System", // Hanken Grotesk substitute
    textShadowColor: "rgba(25, 7, 7, 0.25)",
    textShadowOffset: { width: 0, height: 8 },
    textShadowRadius: 30,
  },

  // Avatar
  avatarContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0, // Behind the title? HTML z-order implies title is below avatar in code (so on top visually)
  },
  avatarCircle: {
    position: "absolute",
    width: 192, // w-48
    height: 192,
    left: 98,
    top: 136,
    backgroundColor: "white",
    borderRadius: 96,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 11,
  },
  avatarShapeContainer: {
    position: "absolute",
    width: 128,
    height: 128,
    left: 133,
    top: 164,
  },
  avatarHead: {
    position: "absolute",
    width: 40,
    height: 40,
    left: 42,
    top: 30,
    backgroundColor: "#042f2e", // teal-950
  },
  avatarBody: {
    position: "absolute",
    width: 112, // w-28
    height: 112,
    left: 6,
    top: 10, // Logic from HTML, might overlap head
    backgroundColor: "#042f2e", // teal-950
    zIndex: -1,
  },
  editButton: {
    position: "absolute",
    width: 64, // w-16
    height: 64,
    left: 205,
    top: 237,
    backgroundColor: "white",
    borderRadius: 32,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  editIconShape: {
    width: 44,
    height: 40,
    backgroundColor: "#042f2e", // teal-950
    borderRadius: 2,
  },

  // Bottom Sheet
  bottomSheet: {
    position: "absolute",
    left: 0,
    top: 402,
    width: "100%",
    height: 472,
    alignItems: "center",
  },
  dragHandleContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 472,
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
    height: 0, // Using border for height as per HTML outline logic
    borderTopWidth: 4,
    borderColor: "#083344", // cyan-950
  },
  formContent: {
    marginTop: 56, // top padding for content relative to sheet top
    width: "100%",
    alignItems: "center",
    gap: 16,
  },
  fieldGroup: {
    width: 320, // w-80
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#334155", // slate-700
    marginBottom: 6,
    textAlign: "center",
  },
  inputBox: {
    width: "100%",
    height: 64, // h-16
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#bbf7d0", // green-200
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 11,
    elevation: 3,
  },
  textArea: {
    height: 96, // h-24
  },
  placeholderText: {
    fontSize: 12,
    color: "#64748b", // slate-500
  },
  continueButton: {
    width: 320,
    height: 40,
    marginTop: 20,
    backgroundColor: "#fb923c", // orange-400
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#f4f4f5", // zinc-100
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 11,
    elevation: 3,
  },
  continueButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
