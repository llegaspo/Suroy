import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";
import {
  Shield,
  Bell,
  Lock,
  HelpCircle,
  FileText,
  LogOut,
  Edit2,
  Zap,
  Home,
  Compass,
  MessageSquare,
  User,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

// --- Reusable Components ---

const MenuGroup = ({ title, children }) => (
  <View style={styles.menuGroup}>
    {title && <Text style={styles.sectionTitle}>{title}</Text>}
    <View style={styles.menuContainer}>{children}</View>
  </View>
);

const MenuItem = ({ icon: Icon, label, showBorder = true, isLast = false }) => (
  <TouchableOpacity style={styles.menuItem}>
    <View style={styles.menuIconContainer}>
      <Icon size={20} color="#475569" />
    </View>
    <View
      style={[
        styles.menuTextContainer,
        !isLast && showBorder && styles.menuBorder,
      ]}
    >
      <Text style={styles.menuText}>{label}</Text>
    </View>
  </TouchableOpacity>
);

// --- Main Component ---

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* --- Header --- */}
      <SafeAreaView style={styles.headerSafeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.boostButton}>
            <Zap size={16} color="white" fill="white" />
            <Text style={styles.boostText}>Boost Profile</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* --- Profile Image Section --- */}
        <View style={styles.profileSection}>
          <View style={styles.imageWrapper}>
            <Image
              source={{
                uri: "https://drive.google.com/uc?export=view&id=1RWCh-PvPz9DDfnm0zqsajxRloX2ClhmI",
              }}
              style={styles.profileImage}
            />
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => router.push("/profile/editProfile")}
          >
            <Edit2 size={12} color="white" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* --- Completion Card --- */}
        <View style={styles.completionCard}>
          <View style={styles.percentageCircle}>
            <Text style={styles.percentageText}>
              40<Text style={styles.percentageSymbol}>%</Text>
            </Text>
          </View>
          <View style={styles.completionContent}>
            <Text style={styles.completionTitle}>Complete Your Profile!</Text>
            <Text style={styles.completionDesc}>
              Share your story effortlessly and connect authentically with
              fellow explorers
            </Text>
          </View>
        </View>

        {/* --- Settings Group --- */}
        <MenuGroup title="Settings">
          <MenuItem icon={Shield} label="Security" />
          <MenuItem icon={Bell} label="Notifications" />
          <MenuItem icon={Lock} label="Privacy" isLast />
        </MenuGroup>

        {/* --- Support Group --- */}
        <MenuGroup>
          <MenuItem icon={HelpCircle} label="Help & Support" />
          <MenuItem icon={FileText} label="Terms and Policies" isLast />
        </MenuGroup>

        {/* --- Log Out --- */}
        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color="#dc2626" />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// --- Styles ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f5", // zinc-100
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 120, // Space for bottom nav
    alignItems: "center",
  },

  // Header
  headerSafeArea: {
    backgroundColor: "rgba(244, 244, 245, 0.9)",
    zIndex: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#083344", // cyan-950
  },
  boostButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#06b6d4", // cyan-500
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    gap: 6,
    borderWidth: 3,
    borderColor: "#f4f4f5", // outline-zinc-100
  },
  boostText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },

  // Profile Section
  profileSection: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
    position: "relative",
  },
  imageWrapper: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 5,
    borderColor: "#ef4444", // red-500
    overflow: "hidden",
    backgroundColor: "#e5e5e5",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  editButton: {
    position: "absolute",
    bottom: -15,
    backgroundColor: "#fb923c", // orange-400
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 3,
    borderColor: "#f4f4f5",
    elevation: 2,
  },
  editButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },

  // Completion Card
  completionCard: {
    width: width - 40,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  percentageCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fb923c", // orange-400
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  percentageText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  percentageSymbol: {
    fontSize: 12,
  },
  completionContent: {
    flex: 1,
  },
  completionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#172554", // blue-950
    marginBottom: 4,
  },
  completionDesc: {
    fontSize: 12,
    color: "#6b7280", // gray-500
    lineHeight: 16,
  },

  // Menu Groups
  menuGroup: {
    width: width - 40,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#172554", // blue-950
    marginBottom: 12,
    marginLeft: 4,
  },
  menuContainer: {
    backgroundColor: "#f3f4f6", // gray-100/zinc-100 roughly
    borderRadius: 8,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
  },
  menuIconContainer: {
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  menuTextContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    paddingRight: 16,
  },
  menuBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(107, 114, 128, 0.1)", // Subtle divider
  },
  menuText: {
    fontSize: 16,
    color: "#475569", // slate-600
    fontWeight: "500",
  },

  // Log Out
  logoutButton: {
    width: width - 40,
    height: 56,
    backgroundColor: "rgba(254, 205, 211, 0.3)", // rose-200/30
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  logoutText: {
    color: "#dc2626", // red-600
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12,
  },

  // Bottom Navigation
  bottomNav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 96,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
  },
  navItem: {
    alignItems: "center",
    width: 60,
  },
  navText: {
    fontSize: 11,
    color: "#6b7280",
    marginTop: 6,
  },
  activeNavText: {
    fontSize: 11,
    color: "#ef4444",
    marginTop: 6,
    fontWeight: "500",
  },
  activeTabIndicator: {
    position: "absolute",
    top: -14, // lifts slightly above container
    right: width * 0.08, // Positioning based on design (approx 4th item)
    width: 80,
    height: 80,
    backgroundColor: "#fff7ed", // orange-50
    borderRadius: 20,
    zIndex: -1,
  },
});
