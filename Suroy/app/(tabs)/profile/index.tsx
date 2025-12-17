import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* --- HEADER --- */}
      {/* Using BlurView to mimic backdrop-blur */}
      <BlurView intensity={80} tint="light" style={styles.headerContainer}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Profile</Text>
            <TouchableOpacity style={styles.boostButton}>
              <Ionicons
                name="flash"
                size={12}
                color="white"
                style={{ marginRight: 4 }}
              />
              <Text style={styles.boostText}>Boost Profile</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </BlurView>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Spacer for the fixed header */}
        <View style={{ height: 110 }} />

        {/* --- AVATAR SECTION --- */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: "https://placehold.co/185x162/png" }}
              style={styles.avatarImage}
            />
          </View>

          {/* Edit Profile Badge */}
          <TouchableOpacity style={styles.editProfileBadge}>
            <Ionicons
              name="pencil"
              size={10}
              color="white"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* --- PROFILE COMPLETION CARD --- */}
        <View style={styles.completionCard}>
          <View style={styles.completionCircle}>
            <Text style={styles.completionPercent}>
              40<Text style={{ fontSize: 14 }}>%</Text>
            </Text>
          </View>
          <View style={styles.completionTextContainer}>
            <Text style={styles.completionTitle}>Complete Your Profile!</Text>
            <Text style={styles.completionSubtitle}>
              Share your story effortlessly and connect authentically with
              fellow explorers
            </Text>
          </View>
        </View>

        {/* --- SETTINGS GROUP 1 --- */}
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Settings</Text>
        </View>

        <View style={styles.menuGroup}>
          <MenuItem icon="shield-checkmark-outline" label="Security" />
          <View style={styles.divider} />
          <MenuItem icon="notifications-outline" label="Notifications" badge />
          <View style={styles.divider} />
          <MenuItem icon="lock-closed-outline" label="Privacy" />
        </View>

        {/* --- SETTINGS GROUP 2 --- */}
        <View style={styles.menuGroup}>
          <MenuItem icon="help-circle-outline" label="Help & Support" />
          <View style={styles.divider} />
          <MenuItem icon="document-text-outline" label="Terms and Policies" />
        </View>

        {/* --- LOGOUT BUTTON --- */}
        <TouchableOpacity style={styles.logoutButton}>
          <View style={styles.logoutIconBox}>
            <Ionicons name="log-out-outline" size={20} color="#DC2626" />
          </View>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>

        {/* Spacer for Bottom Navigation */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* --- BOTTOM NAVIGATION --- */}
      <View style={styles.bottomNavContainer}>
        {/* Background shape */}
        <View style={styles.bottomNavBackground} />

        <View style={styles.bottomNavContent}>
          <NavItem icon="map-outline" label="My Trips" />
          <NavItem icon="compass-outline" label="Explore" />
          <NavItem icon="search-outline" label="Discover" />
          <NavItem icon="chatbubble-ellipses-outline" label="Inbox" badge />
          <NavItem icon="person" label="Profile" active />
        </View>
      </View>
    </View>
  );
}

// --- HELPER COMPONENTS ---

const MenuItem = ({ icon, label, badge }: any) => (
  <TouchableOpacity style={styles.menuItem}>
    <View style={styles.menuIconBox}>
      <Ionicons name={icon} size={20} color="#475569" />
      {badge && <View style={styles.redDot} />}
    </View>
    <Text style={styles.menuText}>{label}</Text>
    <Ionicons
      name="chevron-forward"
      size={16}
      color="#CBD5E1"
      style={{ marginLeft: "auto" }}
    />
  </TouchableOpacity>
);

const NavItem = ({ icon, label, active, badge }: any) => (
  <TouchableOpacity style={styles.navItem}>
    <View>
      <Ionicons name={icon} size={24} color={active ? "#EF4444" : "#64748B"} />
      {badge && <View style={styles.navBadge} />}
    </View>
    <Text style={[styles.navLabel, { color: active ? "#EF4444" : "#64748B" }]}>
      {label}
    </Text>
  </TouchableOpacity>
);

// --- STYLES ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F5", // zinc-100
  },
  // Header
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.3)",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700", // Semibold
    color: "#083344", // cyan-950
  },
  boostButton: {
    backgroundColor: "#EF4444", // red-500
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#F4F4F5",
  },
  boostText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },

  // Scroll Content
  scrollContent: {
    paddingHorizontal: 16,
  },

  // Avatar
  avatarSection: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
    position: "relative",
  },
  avatarContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 5,
    borderColor: "#EF4444", // red-500
    overflow: "hidden",
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImage: {
    width: 140,
    height: 140,
  },
  editProfileBadge: {
    position: "absolute",
    bottom: -10,
    backgroundColor: "#FB923C", // orange-400
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#F4F4F5",
    flexDirection: "row",
    alignItems: "center",
  },
  editProfileText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },

  // Completion Card
  completionCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  completionCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FB923C", // orange-400
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  completionPercent: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  completionTextContainer: {
    flex: 1,
  },
  completionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#172554", // blue-950
    marginBottom: 4,
  },
  completionSubtitle: {
    fontSize: 12,
    color: "#6B7280", // gray-500
    lineHeight: 16,
  },

  // Menu Groups
  sectionTitleContainer: {
    marginBottom: 10,
    paddingLeft: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#172554",
  },
  menuGroup: {
    backgroundColor: "#F3F4F6", // gray-100 (closest match to bg-gray-100)
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  menuIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    position: "relative",
  },
  menuText: {
    fontSize: 16,
    color: "#475569", // slate-600
    fontWeight: "500",
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
    position: "absolute",
    top: 0,
    right: 0,
    borderWidth: 1.5,
    borderColor: "#F3F4F6",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(107, 114, 128, 0.1)", // gray-500/10
  },

  // Logout
  logoutButton: {
    backgroundColor: "rgba(254, 205, 211, 0.3)", // rose-200/30
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  logoutIconBox: {
    marginRight: 12,
  },
  logoutText: {
    color: "#DC2626", // red-600
    fontSize: 16,
    fontWeight: "600",
  },

  // Bottom Navigation
  bottomNavContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    justifyContent: "flex-end",
  },
  bottomNavBackground: {
    position: "absolute",
    top: 10, // Creates the floating rounded look
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
  },
  bottomNavContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 25, // For iPhone home indicator
    paddingTop: 25,
    paddingHorizontal: 10,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
  },
  navLabel: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: "500",
  },
  navBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
    position: "absolute",
    top: -2,
    right: -2,
    borderWidth: 1,
    borderColor: "#FFF",
  },
});
