import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Platform,
} from "react-native";

const { width, height } = Dimensions.get("window");

const DiscoverScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainFrame}>
        {/* --- Background Map Image --- */}
        {/* Placed early to sit behind overlays, simplified positioning */}
        <Image
          source={{ uri: "https://placehold.co/362x645" }}
          style={styles.mapImage}
          resizeMode="cover"
        />

        {/* --- Header Section --- */}
        <View style={styles.headerContainer}>
          {/* Blur Background Simulation */}
          <View style={styles.headerBlur} />

          <Text style={styles.headerTitle}>Discover</Text>
          <Text style={styles.headerLocation}>📍 Cebu, Philippines 🇵🇭</Text>

          {/* Left Icon (Menu/Back) */}
          <View style={[styles.iconBox, styles.leftIconPos]}>
            <View style={styles.menuIconShape} />
          </View>

          {/* Right Icon (Notification) */}
          <View style={[styles.iconBox, styles.rightIconPos]}>
            <View style={styles.bellIconShape} />
            <View style={styles.notificationDot} />
          </View>
        </View>

        {/* --- Text Descriptions --- */}
        <Text style={styles.subHeaderTitle}>Nearby Users</Text>
        <Text style={styles.descriptionText}>
          Be spontaneous and meet with fellow users around you. Tap on Avatar to
          connect!
        </Text>

        {/* --- Map Avatars (Absolute Positioned) --- */}

        {/* Charlie */}
        <View style={[styles.avatarContainer, { left: 231, top: 248 }]}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarCircle}>
              <Image
                source={{ uri: "https://placehold.co/52x52" }}
                style={styles.avatarImgMain}
              />
              <Image
                source={{ uri: "https://placehold.co/52x52" }}
                style={styles.avatarImgSecondary}
              />
            </View>
          </View>
          <Text style={styles.avatarName}>Charlie</Text>
        </View>

        {/* Ayame */}
        <View style={[styles.avatarContainer, { left: 226, top: 382 }]}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarCircle}>
              <Image
                source={{ uri: "https://placehold.co/52x52" }}
                style={styles.avatarImgMain}
              />
            </View>
            <Image
              source={{ uri: "https://placehold.co/50x50" }}
              style={styles.avatarSmallBordered}
            />
          </View>
          <Text style={styles.avatarName}>Ayame</Text>
        </View>

        {/* Jed */}
        <View style={[styles.avatarContainer, { left: 56, top: 634 }]}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarCircle}>
              <Image
                source={{ uri: "https://placehold.co/52x52" }}
                style={styles.avatarImgMain}
              />
            </View>
          </View>
          <Text style={styles.avatarName}>Jed</Text>
        </View>

        {/* Mila */}
        <View style={[styles.avatarContainer, { left: 113, top: 564 }]}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarCircle}>
              <Image
                source={{ uri: "https://placehold.co/52x52" }}
                style={styles.avatarImgMain}
              />
            </View>
          </View>
          <Text style={styles.avatarName}>Mila</Text>
        </View>

        {/* Blue Location Dot */}
        <View style={styles.blueLocationDot} />

        {/* --- Bottom Sheet: Your Requests --- */}
        <View style={styles.requestSheet}>
          <View style={styles.chevronIcon}>
            <View style={styles.chevronShape} />
          </View>
          <Text style={styles.requestTitle}>Your Requests</Text>
        </View>

        {/* --- Bottom Navigation Bar --- */}
        <View style={styles.bottomNavBar}>
          {/* Active Indicator (orange bg) - Hardcoded position matching HTML */}
          <View style={styles.navActiveIndicator} />

          <View style={styles.navItemsRow}>
            <NavItem label="My Trips" color="#6B7280" />
            <NavItem label="Explore" color="#EF4444" active />
            <NavItem label="Discover" color="#6B7280" />
            <NavItem label="Inbox" color="#6B7280" />
            <NavItem label="Profile" color="#6B7280" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Helper Component for Nav Items
const NavItem = ({
  label,
  color,
  active,
}: {
  label: string;
  color: string;
  active?: boolean;
}) => (
  <View style={styles.navItemContainer}>
    <View style={styles.navIconBox}>
      <View style={[styles.navIconShape, { backgroundColor: color }]} />
    </View>
    <Text
      style={[
        styles.navText,
        { color: color, fontWeight: active ? "500" : "400" },
      ]}
    >
      {label}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F5", // zinc-100
  },
  mainFrame: {
    width: "100%",
    height: 844, // Fixed height from design, usually flex:1 is better
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#F4F4F5",
  },

  // Header
  headerContainer: {
    width: "100%",
    height: 112, // h-28
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
  },
  headerBlur: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(244, 244, 245, 0.8)", // zinc-100/80
  },
  headerTitle: {
    position: "absolute",
    left: 82,
    top: 52,
    fontSize: 24,
    fontWeight: "bold",
    color: "#172554", // cyan-950 (closest approximation)
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  headerLocation: {
    position: "absolute",
    left: 79,
    top: 88,
    fontSize: 16,
    color: "#334155", // slate-700
  },

  // Header Icons
  iconBox: {
    width: 56,
    height: 56,
    backgroundColor: "#E5E7EB", // Field-Color approx
    borderRadius: 10,
    overflow: "hidden",
    position: "absolute",
    top: 51,
  },
  leftIconPos: { left: 14 },
  rightIconPos: { right: 14 }, // Converted from left: 320 for better scaling

  // Icon Shapes (Simulating the CSS shapes)
  menuIconShape: {
    width: 10,
    height: 16,
    backgroundColor: "#172554",
    position: "absolute",
    top: 20,
    left: 23,
  },
  bellIconShape: {
    width: 16,
    height: 20,
    backgroundColor: "#172554",
    position: "absolute",
    top: 18,
    left: 20,
  },
  notificationDot: {
    width: 8,
    height: 8,
    backgroundColor: "#EF4444", // red-500
    borderRadius: 4,
    position: "absolute",
    top: 18,
    left: 30,
    borderWidth: 1,
    borderColor: "#FAFAFA",
  },

  // Descriptions
  subHeaderTitle: {
    position: "absolute",
    left: 16,
    top: 137,
    fontSize: 20,
    fontWeight: "500",
    color: "#172554",
  },
  descriptionText: {
    position: "absolute",
    left: 15,
    top: 165,
    width: 350,
    fontSize: 16,
    color: "#6B7280", // gray-500
    lineHeight: 20,
  },

  // Map
  mapImage: {
    width: 362, // w-96 roughly
    height: 645,
    borderRadius: 12,
    position: "absolute",
    left: 14,
    top: 219,
  },

  // Avatars
  avatarContainer: {
    position: "absolute",
    alignItems: "center",
    zIndex: 5,
  },
  avatarWrapper: {
    width: 56,
    height: 80, // roughly fitting the wrapper
    position: "relative",
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "white",
    overflow: "hidden",
    position: "absolute",
    top: 5,
    left: 5,
  },
  avatarImgMain: {
    width: 56,
    height: 56,
    position: "absolute",
    left: -2,
    top: -2,
  },
  avatarImgSecondary: {
    width: 48,
    height: 48,
    position: "absolute",
    opacity: 0.5,
  },
  avatarSmallBordered: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#F4F4F5",
    position: "absolute",
    left: 5,
    top: 6,
    zIndex: 2,
  },
  avatarName: {
    marginTop: -25, // Adjusting based on HTML visual flow
    fontSize: 12,
    fontWeight: "500",
    color: "black",
    textAlign: "center",
    backgroundColor: "rgba(255,255,255,0.7)", // Added readability bg
    paddingHorizontal: 4,
    borderRadius: 4,
  },

  // Blue Dot
  blueLocationDot: {
    width: 14,
    height: 14,
    backgroundColor: "#2563EB", // blue-600
    borderRadius: 7,
    position: "absolute",
    left: 213,
    top: 515,
    borderWidth: 1,
    borderColor: "white",
    shadowColor: "#0C79FE",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },

  // Bottom Sheet - Requests
  requestSheet: {
    width: "100%",
    height: 320, // h-80
    backgroundColor: "white",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    position: "absolute",
    top: 746,
    left: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.11,
    shadowRadius: 107,
    elevation: 20,
    zIndex: 20,
  },
  requestTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#172554",
    position: "absolute",
    left: 22,
    top: 40,
  },
  chevronIcon: {
    width: 36,
    height: 36,
    position: "absolute",
    left: 177,
    top: 36,
    transform: [{ rotate: "-90deg" }],
    justifyContent: "center",
    alignItems: "center",
  },
  chevronShape: {
    width: 16,
    height: 12,
    backgroundColor: "#F3F4F6", // gray-100
  },

  // Bottom Nav Bar
  bottomNavBar: {
    width: "100%",
    height: 96, // h-24
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    position: "absolute",
    bottom: 0, // Using bottom 0 instead of top fixed for better layout
    left: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.11,
    shadowRadius: 107,
    elevation: 20,
    zIndex: 30,
    overflow: "hidden",
  },
  navActiveIndicator: {
    width: 64,
    height: 112,
    backgroundColor: "#FFF7ED", // orange-50
    borderRadius: 8,
    position: "absolute",
    left: 98,
    top: -12,
  },
  navItemsRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    height: "100%",
    paddingBottom: 20,
  },
  navItemContainer: {
    alignItems: "center",
    gap: 4,
  },
  navIconBox: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  navIconShape: {
    width: 20,
    height: 20,
    borderRadius: 2,
  },
  navText: {
    fontSize: 12,
  },
});

export default DiscoverScreen;
