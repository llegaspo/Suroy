import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";
import {
  ChevronLeft,
  Bell,
  MoreVertical,
  MapPin,
  Calendar,
  CreditCard,
  MapPin as MapIcon, // Alias for bottom nav
  Compass,
  MessageSquare,
  User,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

export default function tripDetails() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* --- Header --- */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <ChevronLeft size={24} color="#172554" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>About Trip</Text>

        <TouchableOpacity style={styles.iconButton}>
          <Bell size={24} color="#172554" />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* --- Hero Image Section --- */}
        <View style={styles.heroContainer}>
          <View style={styles.heroImageWrapper}>
            <Image
              source={{ uri: "https://placehold.co/383x287" }}
              style={styles.heroImage}
              resizeMode="cover"
            />

            {/* Active Badge */}
            <View style={styles.activeBadge}>
              <View style={styles.activeDot} />
              <Text style={styles.activeText}>Active</Text>
            </View>

            {/* Menu Button */}
            <TouchableOpacity style={styles.menuButton}>
              <MoreVertical size={20} color="#475569" />
            </TouchableOpacity>
          </View>
        </View>

        {/* --- Trip Title & Info --- */}
        <View style={styles.infoSection}>
          <Text style={styles.tripTitle}>Bantayan Island Travel</Text>

          <View style={styles.metaRow}>
            <Calendar size={14} color="#083344" />
            <Text style={styles.metaText}>
              February 3, 2025 - February 6, 2025
            </Text>
          </View>

          <View style={styles.metaRow}>
            <Text style={styles.flagEmoji}>🇵🇭</Text>
            <Text style={styles.locationText}>Bantayan Island, Cebu</Text>
          </View>

          <View style={styles.metaRow}>
            <Text style={styles.budgetEmoji}>💰</Text>
            <Text style={styles.metaText}>
              Budget Range: Php 3,000 - Php 6,000
            </Text>
          </View>
        </View>

        {/* --- Members & Progress --- */}
        <View style={styles.membersSection}>
          <View style={styles.avatarsRow}>
            {[1, 2, 3, 4, 5].map((_, index) => (
              <Image
                key={index}
                source={{ uri: "https://placehold.co/32x34" }}
                style={[
                  styles.avatar,
                  { marginLeft: index === 0 ? 0 : -10, zIndex: 5 - index },
                ]}
              />
            ))}
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>5 / 8 Members</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: "62.5%" }]} />
            </View>
          </View>
        </View>

        {/* Divider Line */}
        <View style={styles.divider} />

        {/* --- About Section --- */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>About the Trip</Text>
          <Text style={styles.bodyText}>
            This trip covers exploring the Northern Part of Cebu which is
            Bantayan Island! It’s going to be a 4-day travel so join if you are
            interested and you might know some other spots we can visit to 😁
          </Text>
        </View>

        {/* --- Interests Section --- */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Interests</Text>
          <View style={styles.tagsContainer}>
            <Tag icon="🏝️" label="Island Hopper" />
            <Tag icon="🌿" label="Calm" />
            <Tag icon="🐚" label="Beach Lover" />
            <Tag icon="👥" label="Group Travel" />
            <Tag icon="🧭" label="Adventurous" />
          </View>
        </View>

        {/* --- Travelers Note --- */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Travelers</Text>
          <Text style={styles.bodyText}>
            💗 5 out of 8 People have joined for this trip
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Helper Component for Interests
const Tag = ({ icon, label }: { icon: string; label: string }) => (
  <View style={styles.tag}>
    <Text style={styles.tagText}>
      {icon} {label}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F5", // zinc-100
  },
  // --- Header ---
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 16 : 0,
    paddingBottom: 10,
    backgroundColor: "#F4F4F5",
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#083344", // cyan-950
  },
  iconButton: {
    width: 48,
    height: 48,
    backgroundColor: "white",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  notificationDot: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 8,
    height: 8,
    backgroundColor: "#EF4444",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "white",
  },

  // --- Scroll Content ---
  scrollContent: {
    paddingBottom: 110, // space for bottom nav
  },

  // --- Hero Image ---
  heroContainer: {
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 20,
  },
  heroImageWrapper: {
    height: 192,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "white",
    // shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  activeBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  activeDot: {
    width: 8,
    height: 8,
    backgroundColor: "#EF4444",
    borderRadius: 4,
    marginRight: 6,
  },
  activeText: {
    color: "#EF4444",
    fontWeight: "bold",
    fontSize: 14,
  },
  menuButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  // --- Info Section ---
  infoSection: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  tripTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#083344",
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  metaText: {
    color: "#083344",
    fontSize: 12,
    marginLeft: 8,
  },
  flagEmoji: {
    fontSize: 14,
  },
  locationText: {
    color: "#083344",
    fontSize: 14,
    marginLeft: 4,
  },
  budgetEmoji: {
    fontSize: 12,
  },

  // --- Members ---
  membersSection: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  avatarsRow: {
    flexDirection: "row",
    marginBottom: 16,
    paddingLeft: 4,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#F4F4F5",
  },
  progressContainer: {
    marginTop: 4,
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 4,
  },
  progressLabel: {
    color: "#083344",
    fontSize: 14,
  },
  progressBarBg: {
    height: 2,
    backgroundColor: "rgba(239, 68, 68, 0.2)", // red-500/20
    width: "100%",
    borderRadius: 1,
  },
  progressBarFill: {
    height: 2,
    backgroundColor: "#EF4444",
    borderRadius: 1,
  },

  // --- Divider ---
  divider: {
    height: 1,
    backgroundColor: "rgba(239, 68, 68, 0.2)",
    marginHorizontal: 24,
    marginBottom: 20,
  },

  // --- Generic Section ---
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "600",
    color: "#083344",
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 12,
    color: "#083344",
    lineHeight: 18,
    textAlign: "justify",
  },

  // --- Tags ---
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FECDD3", // rose-200
    // shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  tagText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#083344",
  },

  // --- Bottom Nav ---
  bottomNav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 90,
    backgroundColor: "white",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 10,
  },
  navItem: {
    alignItems: "center",
  },
  navItemInactive: {
    alignItems: "center",
    opacity: 0.5,
  },
  navIconActive: {
    width: 48,
    height: 48,
    backgroundColor: "#FFF7ED", // orange-50
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  navTextActive: {
    color: "#EF4444",
    fontSize: 10,
    fontWeight: "500",
  },
  navTextInactive: {
    color: "#64748B",
    fontSize: 10,
    marginTop: 4,
  },
});
