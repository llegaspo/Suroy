import React from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import {
  MapPin,
  ChevronLeft,
  Bell,
  Search,
  Filter,
  Calendar,
  Map,
  Lock,
  Plus,
  Compass,
  MessageSquare,
  User,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MyTripsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* --- Header Section --- */}
      <View style={styles.header}>
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.iconButton}>
            <ChevronLeft size={24} color="#172554" />
          </TouchableOpacity>

          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>My Trips</Text>
            <View style={styles.locationRow}>
              <MapPin size={12} color="#334155" />
              <Text style={styles.locationText}>Cebu, Philippines 🇵🇭</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.iconButton}>
            <Bell size={24} color="#172554" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* --- Search & Filter --- */}
        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <Search size={20} color="#9CA3AF" />
            <Text style={styles.searchText}>Search for a trip...</Text>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#475569" />
          </TouchableOpacity>
        </View>

        {/* --- Toggle Switch --- */}
        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.activeTab}>
            <Text style={styles.activeTabText}>Upcoming</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inactiveTab}>
            <Text style={styles.inactiveTabText}>Past</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* --- Scrollable Content --- */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* --- Card 1: Active Trip --- */}
        <View style={styles.card}>
          {/* Image Section */}
          <View style={styles.cardImageContainer}>
            <Image
              source={{ uri: "https://placehold.co/385x289" }}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.cardBadgeContainer}>
              <View style={styles.activeBadge}>
                <Text style={styles.activeBadgeText}>ACTIVE</Text>
              </View>
              <View style={styles.optionsBadge}>
                <View style={styles.optionsDot} />
              </View>
            </View>
          </View>

          {/* Details Section */}
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Bantayan Island Travel</Text>

            <View style={styles.dateRow}>
              <Calendar size={14} color="#334155" />
              <Text style={styles.dateText}>3 Feb - 14 Feb</Text>
            </View>

            <View style={styles.cardFooter}>
              <TouchableOpacity
                style={styles.linkButton}
                onPress={() => router.navigate("./tripDetails")}
              >
                <Map size={14} color="#EF4444" />
                <Text style={styles.linkText}>View Itinerary</Text>
              </TouchableOpacity>

              {/* Avatars */}
              <View style={styles.avatarGroup}>
                <View style={styles.avatarContainer}>
                  {[1, 2, 3].map((_, i) => (
                    <Image
                      key={i}
                      source={{ uri: "https://placehold.co/23x23" }}
                      style={[styles.avatar, { left: i * 15, zIndex: i }]}
                    />
                  ))}
                </View>
                <View style={styles.travelerBadge}>
                  <Text style={styles.travelerText}>2+ Travelers</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* --- Card 2: Locked / Upsell --- */}
        <View style={[styles.card, styles.lockedCard]}>
          <Image
            source={{ uri: "https://placehold.co/385x256" }}
            style={styles.cardImageLocked}
            resizeMode="cover"
          />

          {/* Lock Overlay */}
          <View style={styles.lockOverlay}>
            <View style={styles.lockIconCircle}>
              <Lock size={32} color="white" />
            </View>
            <Text style={styles.lockText}>
              Want to add more trips?{"\n"}Upgrade Suroy Now!
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* --- Floating Action Button (FAB) --- */}
      <TouchableOpacity style={styles.fab}>
        <Plus size={20} color="white" />
        <Text style={styles.fabText}>Add Trip</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F5", // zinc-100
  },
  // --- Header ---
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 40 : 10,
    paddingBottom: 16,
    backgroundColor: "#F4F4F5",
    zIndex: 10,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitleContainer: {
    alignItems: "center",
  },
  headerTitle: {
    color: "#083344", // cyan-950
    fontSize: 20,
    fontWeight: "bold",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  locationText: {
    color: "#334155", // slate-700
    fontSize: 14,
    marginLeft: 4,
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
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    backgroundColor: "#EF4444",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "white",
  },

  // --- Search ---
  searchRow: {
    flexDirection: "row",
    gap: 12,
  },
  searchBar: {
    flex: 1,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  searchText: {
    marginLeft: 12,
    color: "#D6D3D1", // stone-300
    fontSize: 14,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: "white",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },

  // --- Tabs ---
  tabContainer: {
    marginTop: 24,
    height: 48,
    backgroundColor: "rgba(229, 231, 235, 0.5)", // gray-200/50
    borderRadius: 8,
    padding: 4,
    flexDirection: "row",
  },
  activeTab: {
    flex: 1,
    backgroundColor: "#EF4444", // red-500
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activeTabText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  inactiveTab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inactiveTabText: {
    color: "#6B7280", // gray-500
    fontSize: 14,
  },

  // --- Scroll Content ---
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 120, // space for bottom nav
  },

  // --- Cards ---
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardImageContainer: {
    height: 160,
    width: "100%",
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  cardBadgeContainer: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    gap: 8,
  },
  activeBadge: {
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  activeBadgeText: {
    color: "#EF4444",
    fontSize: 10,
    fontWeight: "800",
  },
  optionsBadge: {
    width: 32,
    height: 32,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  optionsDot: {
    width: 4,
    height: 16,
    backgroundColor: "#475569",
    borderRadius: 2,
  },

  // Card Body
  cardBody: {
    padding: 16,
  },
  cardTitle: {
    color: "#172554", // blue-950
    fontSize: 18,
    fontWeight: "600",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  dateText: {
    color: "#334155",
    fontSize: 12,
    marginLeft: 8,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  linkButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkText: {
    color: "#EF4444",
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 8,
  },
  avatarGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    width: 60, // approximate width for 3 stacked avatars
    height: 24,
    position: "relative",
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EF4444",
    position: "absolute",
    top: 0,
  },
  travelerBadge: {
    backgroundColor: "#FFE4E6", // rose-100
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FECDD3",
    marginLeft: 4,
  },
  travelerText: {
    color: "#083344",
    fontSize: 10,
    fontWeight: "500",
  },

  // --- Locked Card ---
  lockedCard: {
    height: 192,
  },
  cardImageLocked: {
    width: "100%",
    height: "100%",
    opacity: 0.6,
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  lockIconCircle: {
    width: 64,
    height: 64,
    backgroundColor: "#EF4444",
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  lockText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 24,
  },

  // --- FAB ---
  fab: {
    position: "absolute",
    bottom: 112,
    right: 24,
    backgroundColor: "#EF4444",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    // Shadow
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 50,
  },
  fabText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 8,
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
    paddingBottom: 20, // Adjust for iPhone Home Indicator
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

export default MyTripsScreen;
