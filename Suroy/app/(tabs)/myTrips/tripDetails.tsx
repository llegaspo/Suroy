import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Alert,
} from "react-native";
import {
  ChevronLeft,
  Bell,
  MoreVertical,
  Flag,
  Share,
  MapPin,
  Home,
  Compass,
  MessageCircle,
  User,
  Calendar,
  Clock,
  ChevronRight,
  LogOut,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// --- Mock Data ---
const GENERAL_INTERESTS = [
  { label: "🏝️ Island Hopper" },
  { label: "🌿 Calm" },
  { label: "🐚 Beach Lover" },
  { label: "👥 Group Travel" },
  { label: "🧭 Adventurous" },
];

const MATCHED_INTERESTS = [
  { label: "🏝️ Island Hopper" },
  { label: "🌿 Calm" },
  { label: "💰 Budget Range Friendly" },
];

const DIFFERING_INTERESTS = [
  { label: "🧭 Adventurous" },
  { label: "👥 Group Travel" },
];

const AVATARS = [
  "https://placehold.co/50x50",
  "https://placehold.co/50x50",
  "https://placehold.co/50x50",
  "https://placehold.co/50x50",
  "https://placehold.co/50x50",
];

const SUGGESTED_TRIPS = [
  {
    id: 1,
    image: "https://placehold.co/322x181",
    title: "Retreat in Sigtuna",
    desc: "Immerse yourself in art and history in the charming town.",
    readTime: "4 min read",
  },
  {
    id: 2,
    image: "https://placehold.co/160x116",
    title: "Trail in Uppsala",
    desc: "Indulge in the Swedish tradition of fika with a day in Uppsala.",
    readTime: "2 min read",
  },
  {
    id: 3,
    image: "https://placehold.co/160x107",
    title: "Day in Eskilstuna",
    desc: "Explore galleries for a day of cultural enrichment.",
    readTime: "6 min read",
  },
];

export default function AboutTripScreen() {
  // Toggle this to see the "Joined" vs "Not Joined" view
  const [isJoined, setIsJoined] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

  // Handle Join/Leave Logic
  const handleTripAction = () => {
    if (isJoined) {
      Alert.alert("Leave Trip", "Are you sure you want to leave this trip?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Leave",
          style: "destructive",
          onPress: () => setIsJoined(false),
        },
      ]);
    } else {
      setIsJoined(true);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: 100 }} />

        {/* --- Hero Section --- */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: "https://placehold.co/383x287" }}
            style={styles.heroImage}
          />

          <View style={styles.activeBadge}>
            <View style={styles.activeDot} />
            <Text style={styles.activeText}>Active</Text>
          </View>

          {/* 3-Dots Menu */}
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setMenuVisible(!menuVisible)}
            activeOpacity={0.8}
          >
            <MoreVertical size={20} color="#475569" />
          </TouchableOpacity>

          {/* Conditional Menu */}
          {menuVisible && (
            <View style={styles.popupMenu}>
              <TouchableOpacity style={styles.menuItem}>
                <Flag size={16} color="#ef4444" style={styles.menuIcon} />
                <Text style={styles.menuText}>Report Trip</Text>
              </TouchableOpacity>
              <View style={styles.menuDivider} />
              <TouchableOpacity style={styles.menuItem}>
                <Share size={16} color="#ef4444" style={styles.menuIcon} />
                <Text style={styles.menuText}>Share Trip</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* --- Trip Info Header --- */}
        <View style={styles.infoSection}>
          <Text style={styles.tripTitle}>Bantayan Island, Cebu</Text>

          <View style={styles.row}>
            <Calendar size={14} color="#083344" style={{ marginRight: 6 }} />
            <Text style={styles.subText}>
              February 3, 2025 - February 6, 2025
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={{ fontSize: 14, marginRight: 4 }}>🇵🇭</Text>
            <Text style={styles.subText}>
              Cebu, Philippines [Map of Bantayan Island Cebu]
            </Text>
          </View>

          <Text style={[styles.subText, { marginTop: 4 }]}>
            💰 Budget Range: Php 3,000 - Php 6,000
          </Text>

          <View style={styles.redDivider} />

          {/* About Section */}
          <Text style={styles.sectionHeader}>About the Trip</Text>
          <Text style={styles.paragraph}>
            This trip covers exploring the Northern Part of Cebu which is
            Bantayan Island! It’s going to be a 4-day travel so join if you are
            interested and you might know some other spots we can visit to 😁
          </Text>

          {/* --- CONDITIONAL CONTENT START --- */}

          {isJoined ? (
            /* === VIEW 1: USER IS JOINED === */
            <View style={styles.joinedContainer}>
              <Text style={styles.matchScoreText}>
                You match this group{" "}
                <Text style={{ fontWeight: "800" }}>72%</Text> based on vibe &
                preferences:
              </Text>

              {/* Matched Interests (Cyan) */}
              <View style={styles.interestContainer}>
                {MATCHED_INTERESTS.map((item, index) => (
                  <View
                    key={index}
                    style={[styles.interestChip, styles.chipCyan]}
                  >
                    <Text style={styles.interestText}>{item.label}</Text>
                  </View>
                ))}
              </View>

              <Text style={styles.diffHeader}>Slight differences in:</Text>

              {/* Differing Interests (Gray) */}
              <View style={styles.interestContainer}>
                {DIFFERING_INTERESTS.map((item, index) => (
                  <View
                    key={index}
                    style={[styles.interestChip, styles.chipGray]}
                  >
                    <Text style={styles.interestText}>{item.label}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : (
            /* === VIEW 2: USER IS NOT JOINED === */
            <View>
              <Text style={styles.sectionHeader}>Interests</Text>
              <View style={styles.interestContainer}>
                {GENERAL_INTERESTS.map((item, index) => (
                  <View
                    key={index}
                    style={[styles.interestChip, styles.chipRose]}
                  >
                    <Text style={styles.interestText}>{item.label}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          {/* --- CONDITIONAL CONTENT END --- */}

          {/* Travelers Section */}
          <Text style={[styles.sectionHeader, { marginTop: 24 }]}>
            Travelers
          </Text>
          <Text style={[styles.paragraph, { marginBottom: 8 }]}>
            💗 5 out of 8 People have joined for this trip
          </Text>
          <View style={styles.avatarRow}>
            {AVATARS.map((uri, index) => (
              <Image
                key={index}
                source={{ uri }}
                style={[
                  styles.avatar,
                  { marginLeft: index === 0 ? 0 : -12, zIndex: 10 - index },
                ]}
              />
            ))}
          </View>

          {/* Managed By Section */}
          <Text style={[styles.sectionHeader, { marginTop: 24 }]}>
            Managed By
          </Text>
          <View style={styles.adminRow}>
            <Image
              source={{ uri: "https://placehold.co/50x50" }}
              style={styles.adminAvatar}
            />
            <View style={styles.adminInfo}>
              <Text style={styles.adminName}>Veniboo</Text>
              <Text style={styles.adminRole}>Group Admin</Text>
            </View>
            <ChevronRight
              size={20}
              color="#083344"
              style={{ marginLeft: "auto" }}
            />
          </View>

          {/* --- MAIN ACTION BUTTON (Toggle Logic) --- */}
          <TouchableOpacity
            style={[
              styles.actionButton,
              isJoined ? styles.btnRed : styles.btnOrange,
            ]}
            onPress={handleTripAction}
          >
            {isJoined && (
              <LogOut size={18} color="#fff" style={{ marginRight: 8 }} />
            )}
            <Text style={styles.actionButtonText}>
              {isJoined ? "Leave Trip" : "Request to Join Group"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Suggested Trips - Only show if NOT joined (Optional UX choice, but keeps screen clean) */}
        {!isJoined && (
          <>
            <View style={styles.redDivider} />
            <Text style={[styles.sectionHeader, { marginLeft: 24 }]}>
              Suggested Trips Near This Trip...
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScrollContent}
            >
              {SUGGESTED_TRIPS.map((trip) => (
                <View key={trip.id} style={styles.tripCard}>
                  <View style={styles.cardImageContainer}>
                    <Image
                      source={{ uri: trip.image }}
                      style={styles.cardImage}
                    />
                  </View>
                  <View style={styles.cardBody}>
                    <Text style={styles.cardTitle}>{trip.title}</Text>
                    <Text style={styles.cardDesc} numberOfLines={2}>
                      {trip.desc}
                    </Text>
                    <View style={styles.cardFooter}>
                      <Clock
                        size={12}
                        color="#6b7280"
                        style={{ marginRight: 4 }}
                      />
                      <Text style={styles.cardTime}>{trip.readTime}</Text>
                    </View>
                  </View>
                </View>
              ))}
              <View style={{ width: 24 }} />
            </ScrollView>
          </>
        )}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* --- Header (Fixed) --- */}
      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.iconBtn}>
            <ChevronLeft size={24} color="#083344" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>About Trip</Text>
          <TouchableOpacity style={styles.iconBtn}>
            <Bell size={24} color="#083344" />
            <View style={styles.notifBadge} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* --- Bottom Navigation (Fixed) --- */}
      <View style={styles.bottomBar}>
        <View style={[styles.tabItem, styles.tabItemActive]}>
          <View style={styles.activeTabIconBg}>
            <Home size={20} color="#ef4444" />
          </View>
          <Text style={[styles.tabLabel, styles.textRed]}>My Trips</Text>
        </View>
        <View style={styles.tabItem}>
          <Compass size={24} color="#6b7280" />
          <Text style={styles.tabLabel}>Discover</Text>
        </View>
        <View style={styles.tabItem}>
          <MessageCircle size={24} color="#6b7280" />
          <Text style={styles.tabLabel}>Inbox</Text>
        </View>
        <View style={styles.tabItem}>
          <User size={24} color="#6b7280" />
          <Text style={styles.tabLabel}>Profile</Text>
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
  scrollContent: {
    paddingBottom: 20,
  },
  // --- Header ---
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: "rgba(244, 244, 245, 0.9)",
  },
  headerContent: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#083344",
  },
  iconBtn: {
    width: 44,
    height: 44,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  notifBadge: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 8,
    height: 8,
    backgroundColor: "#ef4444",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#fff",
  },

  // --- Hero ---
  heroContainer: {
    marginHorizontal: 14,
    marginTop: 4,
    height: 240,
    borderRadius: 16,
    position: "relative",
    zIndex: 1,
  },
  heroImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  activeBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  activeDot: {
    width: 8,
    height: 8,
    backgroundColor: "#ef4444",
    borderRadius: 4,
    marginRight: 6,
  },
  activeText: {
    color: "#ef4444",
    fontWeight: "700",
    fontSize: 14,
  },
  menuButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  popupMenu: {
    position: "absolute",
    top: 50,
    right: 10,
    width: 150,
    backgroundColor: "#fafafa",
    borderRadius: 12,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
    zIndex: 100,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  menuIcon: { marginRight: 10 },
  menuText: {
    color: "#ef4444",
    fontSize: 14,
    fontWeight: "500",
  },
  menuDivider: {
    height: 1,
    backgroundColor: "rgba(239, 68, 68, 0.2)",
    marginHorizontal: 16,
  },

  // --- Info Section ---
  infoSection: {
    paddingHorizontal: 24,
    marginTop: 16,
  },
  tripTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#083344",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  subText: {
    fontSize: 12,
    color: "#083344",
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "600",
    color: "#083344",
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 12,
    color: "#083344",
    lineHeight: 18,
    textAlign: "justify",
    marginBottom: 16,
  },
  redDivider: {
    height: 2,
    backgroundColor: "rgba(239, 68, 68, 0.4)",
    marginVertical: 16,
    width: "100%",
  },

  // --- Joined/Interest Views ---
  joinedContainer: {
    marginBottom: 16,
  },
  matchScoreText: {
    fontSize: 18,
    color: "#083344", // cyan-950
    marginBottom: 12,
    fontWeight: "500",
    lineHeight: 24,
  },
  diffHeader: {
    fontSize: 16,
    fontWeight: "600",
    color: "#083344",
    marginTop: 16,
    marginBottom: 8,
  },
  interestContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 10,
  },
  interestChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1.5,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    elevation: 1,
  },
  // Chip Variants
  chipRose: {
    borderColor: "#fecdd3", // rose-200 (Default)
  },
  chipCyan: {
    borderColor: "#06b6d4", // cyan-500 (Matched)
  },
  chipGray: {
    borderColor: "#9ca3af", // gray-400 (Difference)
  },
  interestText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#083344",
  },

  // --- Travelers ---
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#f4f4f5",
  },

  // --- Managed By ---
  adminRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  adminAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    marginRight: 12,
  },
  adminInfo: {
    justifyContent: "center",
  },
  adminName: {
    fontSize: 12,
    fontWeight: "700",
    color: "#083344",
  },
  adminRole: {
    fontSize: 12,
    color: "#083344",
  },

  // --- Action Button (Shared Styles) ---
  actionButton: {
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 8,
  },
  btnOrange: {
    backgroundColor: "#fb923c", // orange-400
  },
  btnRed: {
    backgroundColor: "#ef4444", // red-500
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  // --- Suggested Trips (Horizontal) ---
  horizontalScrollContent: {
    paddingLeft: 24,
    paddingBottom: 20,
    marginTop: 10,
  },
  tripCard: {
    width: 160,
    height: 200,
    backgroundColor: "#f3f4f6", // gray-100
    borderRadius: 16,
    marginRight: 12,
    shadowColor: "#030096",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    overflow: "hidden",
  },
  cardImageContainer: {
    height: 90,
    width: "100%",
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  cardBody: {
    padding: 10,
    justifyContent: "space-between",
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#083344",
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 10,
    color: "#6b7280",
    lineHeight: 14,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  cardTime: {
    fontSize: 10,
    color: "#6b7280",
    fontWeight: "300",
  },

  // --- Bottom Bar ---
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
  },
  tabItem: {
    alignItems: "center",
    gap: 4,
    width: 60,
  },
  tabItemActive: {
    backgroundColor: "#fff7ed",
    borderRadius: 12,
    marginTop: -8,
    paddingTop: 8,
    height: 70,
    width: 70,
  },
  activeTabIconBg: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  tabLabel: {
    fontSize: 10,
    color: "#6b7280",
    fontWeight: "500",
  },
  textRed: {
    color: "#ef4444",
  },
});
