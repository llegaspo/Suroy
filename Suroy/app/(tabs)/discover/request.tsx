import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");

const DiscoverScreen = () => {
  return (
    <View style={styles.container}>
      {/* --- Header Section --- */}
      <View style={styles.headerContainer}>
        <View style={styles.headerBackdrop} />

        {/* Back Button */}
        <TouchableOpacity style={styles.backButton}>
          <View style={styles.backArrow} />
        </TouchableOpacity>

        {/* Title & Subtitle */}
        <Text style={styles.headerTitle}>Discover</Text>
        <Text style={styles.headerSubtitle}>📍 Cebu, Philippines 🇵🇭 </Text>

        {/* Notification/Filter Icon */}
        <TouchableOpacity style={styles.notificationButton}>
          <View style={styles.notifIconBody} />
          <View style={styles.notifIconDot} />
        </TouchableOpacity>
      </View>

      {/* --- Main Content Texts --- */}
      <Text style={styles.nearbyTitle}>Nearby Users</Text>
      <Text style={styles.descriptionText}>
        Be spontaneous and meet with fellow users around you. Tap on Avatar to
        connect!
      </Text>

      {/* --- Map Section --- */}
      <View style={styles.mapContainer}>
        <Image
          source={{ uri: "https://placehold.co/624x1223" }}
          style={styles.mapImage}
        />

        {/* Map Pins */}
        <MapPin name="Liam" x={0} y={-26} />
        <MapPin
          name="John"
          x={313}
          y={-10}
          imageUri="https://placehold.co/52x52"
        />
        <MapPin name="Ryan" x={89} y={-166} />
        <MapPin name="Noah" x={19} y={-166} />
        <MapPin name="Lily" x={-74} y={-316} />
        <MapPin name="Sophia" x={-37} y={-466} />
        <MapPin name="Mia" x={140} y={-496} />
        <MapPin name="Emma" x={-24} y={163} />
        <MapPin name="Owen" x={94} y={97} />
        <MapPin name="Olivia" x={236} y={193} />
        <MapPin name="Alex" x={-139} y={265} />
        <MapPin name="Ethan" x={368} y={268} />
        <MapPin name="Jake" x={121} y={295} />
        <MapPin name="Ava" x={-71} y={600} />
        <MapPin name="Max" x={220.5} y={611} />
      </View>

      {/* --- Requests Bottom Sheet --- */}
      <View style={styles.requestsSheet}>
        {/* Close/Expand Icon (Rotated Arrow) */}
        <View style={styles.sheetHandleIcon}>
          <View style={styles.sheetHandleArrow} />
        </View>

        <Text style={styles.requestsTitle}>Your Requests</Text>
        <Text style={styles.requestsSubtitle}>
          Manage your requests. Tap to view profile
        </Text>

        {/* Toggle Bar */}
        <View style={styles.toggleBar}>
          <View style={styles.toggleButtonActive}>
            <Text style={styles.toggleTextActive}>Received</Text>
          </View>
          <Text style={styles.toggleTextInactive}>Sent</Text>
          <Text style={styles.toggleTextInactive}>Blocked</Text>
        </View>

        {/* Request List */}
        <ScrollView style={styles.requestList} scrollEnabled={false}>
          <RequestRow
            name="Joanna"
            info="200m away Expires in 6h"
            imageUri="https://placehold.co/70x55"
            isFirst
          />
          <RequestRow
            name="Ethan"
            info="1.2km away Expires in 6h"
            imageUri="https://placehold.co/57x57"
          />
          <RequestRow
            name="Alex"
            info="2.2km away Expires in 6h"
            imageUri="https://placehold.co/52x52"
          />
          <RequestRow
            name="Noah"
            info="800m away Expires in 6h"
            imageUri="https://placehold.co/56x56"
          />
        </ScrollView>
      </View>

      {/* --- Bottom Navigation Bar --- */}
      {/* Note: In the HTML provided, top is 895px, which is below the container height of 844px */}
      <View style={styles.navBar}>
        <View style={styles.navIndicator} />
        <View style={styles.navItemsContainer}>
          <NavItem label="My Trips" color="gray" />
          <NavItem label="Explore" color="red" active />
          <NavItem label="Discover" color="gray" />
          <NavItem label="Inbox" color="gray" />
          <NavItem label="Profile" color="gray" />
        </View>
      </View>
    </View>
  );
};

// --- Reusable Components ---

const MapPin = ({
  x,
  y,
  name,
  imageUri = "https://placehold.co/52x52",
}: any) => (
  <View style={[styles.mapPinContainer, { left: x, top: y }]}>
    <View style={styles.pinWrapper}>
      <View style={styles.pinInner}>
        <Image source={{ uri: imageUri }} style={styles.pinImageMain} />
        {/* Secondary decorative image to match HTML overlap style */}
        <Image source={{ uri: imageUri }} style={styles.pinImageSecondary} />
      </View>
    </View>
    <Text style={styles.pinText}>{name}</Text>
  </View>
);

const RequestRow = ({ name, info, imageUri, isFirst }: any) => (
  <View style={[styles.requestRow, isFirst ? {} : { marginTop: 0 }]}>
    <View style={styles.requestAvatarContainer}>
      {/* Simulating the triple image overlap from HTML */}
      <Image source={{ uri: imageUri }} style={styles.reqImgBack} />
      <Image source={{ uri: imageUri }} style={styles.reqImgMid} />
      <Image source={{ uri: imageUri }} style={styles.reqImgFront} />
    </View>

    <View style={styles.requestInfo}>
      <Text style={styles.requestName}>{name}</Text>
      <Text style={styles.requestDetail}>{info}</Text>
    </View>

    <View style={[styles.actionButton, styles.actionButtonReject]}>
      {/* Reject Icon (Implicit) */}
    </View>

    <View style={[styles.actionButton, styles.actionButtonAccept]}>
      <View style={styles.checkIcon}>
        <View style={styles.checkIconInner} />
      </View>
    </View>
  </View>
);

const NavItem = ({ label, color, active }: any) => (
  <View style={styles.navItem}>
    <View style={styles.navIconBox}>
      <View
        style={[
          styles.navIcon,
          { backgroundColor: color === "red" ? "#ef4444" : "#6b7280" },
        ]}
      />
    </View>
    <Text
      style={[
        styles.navLabel,
        {
          color: color === "red" ? "#ef4444" : "#6b7280",
          fontWeight: active ? "500" : "400",
        },
      ]}
    >
      {label}
    </Text>
  </View>
);

// --- Styles ---

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 844,
    backgroundColor: "#f4f4f5", // zinc-100
    overflow: "hidden",
    position: "relative",
  },

  // Header
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0.8,
    width: "100%",
    height: 112, // 28 * 4
    overflow: "hidden",
    zIndex: 10,
  },
  headerBackdrop: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(244, 244, 245, 0.8)", // zinc-100/80
  },
  headerTitle: {
    position: "absolute",
    left: 82.3,
    top: 52,
    fontSize: 24,
    fontWeight: "bold",
    color: "#083344", // cyan-950
    fontFamily: "System", // Hanken_Grotesk
  },
  headerSubtitle: {
    position: "absolute",
    left: 79.4,
    top: 87.6,
    fontSize: 16,
    color: "#334155", // slate-700
    fontFamily: "System",
  },
  backButton: {
    position: "absolute",
    left: 13.65,
    top: 51,
    width: 56,
    height: 56,
    backgroundColor: "#E5E7EB", // Field-Color
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  backArrow: {
    position: "absolute",
    left: 31,
    top: 35,
    width: 10,
    height: 16,
    backgroundColor: "#172554", // blue-950
    transform: [{ rotate: "-180deg" }, { translateX: -5 }, { translateY: -8 }], // origin adjustments
  },
  notificationButton: {
    position: "absolute",
    left: 320,
    top: 51,
    width: 56,
    height: 56,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    overflow: "hidden",
  },
  notifIconBody: {
    position: "absolute",
    left: 18.5,
    top: 17.5,
    width: 16,
    height: 20,
    backgroundColor: "#172554", // blue-950
  },
  notifIconDot: {
    position: "absolute",
    left: 30.4,
    top: 18.1,
    width: 8,
    height: 8,
    backgroundColor: "#ef4444", // red-500
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#fafafa",
  },

  // Main Texts
  nearbyTitle: {
    position: "absolute",
    left: 16,
    top: 137,
    fontSize: 20,
    fontWeight: "500",
    color: "#172554", // blue-950
  },
  descriptionText: {
    position: "absolute",
    left: 14.7,
    top: 165,
    width: 384, // w-96
    fontSize: 16,
    color: "#6b7280", // gray-500
    lineHeight: 18,
  },

  // Map
  mapContainer: {
    position: "absolute",
    left: 14,
    top: 213,
    width: 384, // w-96
    height: 526,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f4f4f5",
  },
  mapImage: {
    position: "absolute",
    width: 624,
    height: 1223,
    left: -170,
    top: -487,
  },

  // Pins
  mapPinContainer: {
    position: "absolute",
    alignItems: "center",
    width: 56,
    height: 80,
  },
  pinWrapper: {
    width: 56,
    height: 80,
    position: "relative",
  },
  pinInner: {
    position: "absolute",
    left: 5,
    top: 5,
    width: 48,
    height: 48,
    backgroundColor: "white",
    borderRadius: 125,
    overflow: "hidden",
  },
  pinImageMain: {
    position: "absolute",
    left: -1,
    top: -1,
    width: 56,
    height: 56,
    borderRadius: 29,
  },
  pinImageSecondary: {
    position: "absolute",
    left: 0,
    top: -1,
    width: 48,
    height: 48,
    borderRadius: 30,
    opacity: 0.5, // Simulate overlap look
  },
  pinText: {
    marginTop: 5,
    textAlign: "center",
    color: "black",
    fontSize: 12,
    fontWeight: "500",
  },

  // Requests Sheet
  requestsSheet: {
    position: "absolute",
    left: 0,
    top: 211,
    width: 384, // w-96
    height: 631,
    backgroundColor: "white",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    overflow: "hidden",
    // Shadow
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.11,
    shadowRadius: 107,
    elevation: 10,
  },
  sheetHandleIcon: {
    position: "absolute",
    left: 177,
    top: 36,
    width: 36,
    height: 36,
    transform: [{ rotate: "-90deg" }],
    overflow: "hidden",
  },
  sheetHandleArrow: {
    position: "absolute",
    left: 27,
    top: 23,
    width: 16,
    height: 12,
    backgroundColor: "#f3f4f6", // gray-100
    transform: [{ rotate: "-180deg" }],
  },
  requestsTitle: {
    position: "absolute",
    left: 21.8,
    top: 39.5,
    fontSize: 20,
    fontWeight: "500",
    color: "#172554", // blue-950
  },
  requestsSubtitle: {
    position: "absolute",
    left: 21.8,
    top: 68,
    fontSize: 16,
    color: "#6b7280", // gray-500
  },

  // Toggle Bar
  toggleBar: {
    position: "absolute",
    left: 22.5,
    top: 104,
    width: 320,
    height: 40,
    backgroundColor: "#f3f4f6", // gray-100
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10, // approximate layout from HTML classes
  },
  toggleButtonActive: {
    width: 80,
    height: 28,
    backgroundColor: "#fb923c", // orange-400
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    shadowColor: "#02006d",
    shadowOpacity: 0.05,
    shadowRadius: 11,
    elevation: 2,
  },
  toggleTextActive: {
    fontSize: 14,
    fontWeight: "500",
    color: "#E5E7EB", // Field-Color approx
  },
  toggleTextInactive: {
    fontSize: 14,
    color: "#6b7280",
    marginHorizontal: 10,
  },

  // Requests List
  requestList: {
    position: "absolute",
    left: 0,
    top: 147,
    width: "100%",
    paddingHorizontal: 22,
  },
  requestRow: {
    width: 360, // w-96 minus padding
    paddingVertical: 16,
    paddingRight: 16,
    borderBottomWidth: 0.4,
    borderBottomColor: "#d6d3d1", // stone-300
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  requestAvatarContainer: {
    width: 48,
    height: 48,
    backgroundColor: "white",
    borderRadius: 72,
    overflow: "hidden",
    position: "relative",
  },
  reqImgBack: {
    position: "absolute",
    left: 71,
    top: 53.5,
    width: 96,
    height: 56,
    transform: [{ rotate: "180deg" }],
  },
  reqImgMid: {
    position: "absolute",
    left: -0.1,
    top: -1,
    width: 48,
    height: 48,
    borderRadius: 29,
  },
  reqImgFront: {
    position: "absolute",
    left: -7.6,
    top: 0.3,
    width: 64,
    height: 56,
  },
  requestInfo: {
    flex: 1,
    gap: 3,
  },
  requestName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#172554",
  },
  requestDetail: {
    width: 96, // w-24
    fontSize: 14,
    color: "#6b7280",
  },
  actionButton: {
    width: 44, // w-11
    height: 44, // h-11
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonReject: {
    backgroundColor: "#fecdd3", // rose-200
  },
  actionButtonAccept: {
    backgroundColor: "#bbf7d0", // green-200
  },
  checkIcon: {
    width: 24,
    height: 24,
    overflow: "hidden",
  },
  checkIconInner: {
    position: "absolute",
    left: 3.5,
    top: 5.6,
    width: 16,
    height: 14,
    backgroundColor: "#15803d", // green-700
  },

  // Nav Bar
  navBar: {
    position: "absolute",
    left: 0,
    top: 895, // Positioned as per HTML, which is off-screen for an 844px height container
    width: 384, // w-96
    height: 96, // h-24
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    overflow: "hidden",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.11,
    shadowRadius: 107,
    elevation: 10,
  },
  navIndicator: {
    position: "absolute",
    left: 98,
    top: -12,
    width: 64,
    height: 112,
    backgroundColor: "#fff7ed", // orange-50
    borderRadius: 8,
  },
  navItemsContainer: {
    position: "absolute",
    left: 29.5,
    top: 16,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 28,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 2,
  },
  navIconBox: {
    width: 28,
    height: 28,
    position: "relative",
    overflow: "hidden",
  },
  navIcon: {
    width: 20,
    height: 20,
    top: 4,
    left: 4,
    position: "absolute",
  },
  navLabel: {
    fontSize: 12,
    lineHeight: 12,
  },
});

export default DiscoverScreen;
