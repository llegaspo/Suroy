import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StatusBar,
} from "react-native";
import {
  ArrowLeft,
  Bell,
  Search,
  SlidersHorizontal,
  Calendar,
  MapPin,
  MoreVertical,
  Lock,
  Plus,
  Compass,
  MessageSquare,
  User,
  Map, // Using Map icon for "My Trips"
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// --- Components ---

const BottomTabItem = ({ icon: Icon, label, isActive }) => (
  <TouchableOpacity style={styles.tabItem}>
    <View
      style={[styles.tabIconWrapper, isActive && styles.tabIconWrapperActive]}
    >
      <Icon size={24} color={isActive ? "#ef4444" : "#64748b"} />
    </View>
    <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const TripCard = ({
  title,
  date,
  imageUri,
  isActive,
  isLocked,
  travelers = [],
}) => (
  <View style={styles.cardContainer}>
    {/* Card Image Header */}
    <View style={styles.cardHeader}>
      <Image source={{ uri: imageUri }} style={styles.cardImage} />

      {/* Overlay for Locked State */}
      {isLocked && (
        <View style={styles.lockedOverlay}>
          <View style={styles.lockIconContainer}>
            <Lock size={32} color="#fff" />
          </View>
        </View>
      )}

      {/* Active Badge (Only show if not locked and is active) */}
      {!isLocked && isActive && (
        <View style={styles.activeBadge}>
          <View style={styles.activeDot} />
          <Text style={styles.activeText}>Active</Text>
        </View>
      )}

      {/* Menu Button */}
      <TouchableOpacity style={styles.menuButton}>
        <MoreVertical size={16} color="#475569" />
      </TouchableOpacity>
    </View>

    {/* Card Body */}
    <View style={styles.cardBody}>
      <Text style={styles.cardTitle}>{title}</Text>

      <View style={styles.cardDateRow}>
        <Calendar size={14} color="#334155" />
        <Text style={styles.cardDateText}>{date}</Text>
      </View>

      {/* Footer Area */}
      <View style={styles.cardFooter}>
        {isLocked ? (
          <TouchableOpacity style={styles.viewItineraryLocked}>
            <Text style={styles.viewItineraryTextLocked}>View Itinerary</Text>
            <Lock size={12} color="#ef4444" style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        ) : (
          <>
            {/* Travelers Stack */}
            <View style={styles.travelerStack}>
              {[1, 2, 3].map((_, i) => (
                <Image
                  key={i}
                  source={{ uri: `https://placehold.co/24x24?text=${i + 1}` }}
                  style={[styles.travelerAvatar, { left: i * 14, zIndex: i }]}
                />
              ))}
              <View style={[styles.moreTravelers, { left: 42, zIndex: 10 }]}>
                <Text style={styles.moreTravelersText}>2+</Text>
              </View>
              <Text style={styles.travelerLabel}>Travelers</Text>
            </View>

            <TouchableOpacity style={styles.viewItineraryBtn}>
              <MapPin size={12} color="#ef4444" />
              <Text style={styles.viewItineraryText}>View Itinerary</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  </View>
);

// --- Main Screen ---

export default function MyTripsScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <SafeAreaView style={styles.headerSafeArea}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <ArrowLeft size={24} color="#172554" />
          </TouchableOpacity>

          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>My Trips</Text>
            <Text style={styles.headerSubtitle}>📍 Cebu, Philippines 🇵🇭</Text>
          </View>

          <TouchableOpacity style={styles.iconButton}>
            <Bell size={24} color="#172554" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search & Filter */}
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Search size={16} color="#94a3b8" style={{ marginRight: 8 }} />
            <TextInput
              placeholder="Search for a trip..."
              placeholderTextColor="#d6d3d1"
              style={styles.searchInput}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <SlidersHorizontal size={20} color="#475569" />
          </TouchableOpacity>
        </View>

        {/* Toggle Switch */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity style={styles.toggleBtnActive}>
            <Text style={styles.toggleTextActive}>Upcoming</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleBtnInactive}>
            <Text style={styles.toggleTextInactive}>Past</Text>
          </TouchableOpacity>
        </View>

        {/* Trip Cards */}
        <View style={styles.cardsContainer}>
          {/* Card 1: Active */}
          <TripCard
            title="Bantayan Island Travel"
            date="3 Feb - 14 Feb"
            imageUri="https://placehold.co/385x289"
            isActive={true}
            isLocked={false}
          />

          {/* Card 2: Locked */}
          <View style={styles.lockedCardWrapper}>
            <TripCard
              title="Cebu City"
              date="3 Feb - 14 Feb"
              imageUri="https://placehold.co/385x256"
              isActive={false}
              isLocked={true}
            />
            {/* Upsell Text */}
            <Text style={styles.upsellText}>
              Want to add more trips? Upgrade Suroy Now!
            </Text>
          </View>
        </View>

        {/* Spacer for FAB and Bottom Nav */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Plus size={32} color="#fff" />
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <BottomTabItem icon={Map} label="My Trips" isActive={true} />
        <BottomTabItem icon={Compass} label="Discover" isActive={false} />
        <BottomTabItem icon={MessageSquare} label="Inbox" isActive={false} />
        <BottomTabItem icon={User} label="Profile" isActive={false} />
      </View>
    </View>
  );
}

// --- Styles ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f5", // zinc-100
  },

  // Header
  headerSafeArea: {
    backgroundColor: "rgba(244, 244, 245, 0.9)",
    zIndex: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitleContainer: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800", // Hanken Grotesk Bold
    color: "#083344", // cyan-950
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#334155", // slate-700
  },
  iconButton: {
    width: 44,
    height: 44,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationDot: {
    position: "absolute",
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ef4444",
    borderWidth: 1,
    borderColor: "#fff",
  },

  // Search
  scrollContent: {
    paddingTop: 16,
  },
  searchRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  searchContainer: {
    flex: 1,
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    shadowColor: "#030096",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 20,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#334155",
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#030096",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 20,
    elevation: 3,
  },

  // Toggle
  toggleContainer: {
    marginHorizontal: 20,
    backgroundColor: "#f3f4f6", // gray-100
    borderRadius: 8,
    padding: 4,
    flexDirection: "row",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  toggleBtnActive: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#ef4444",
    borderRadius: 6,
    shadowColor: "#02006d",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  toggleTextActive: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  toggleBtnInactive: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1,
    alignItems: "center",
  },
  toggleTextInactive: {
    color: "#6b7280",
    fontSize: 13,
    fontWeight: "500",
  },

  // Cards
  cardsContainer: {
    paddingHorizontal: 20,
    gap: 24,
  },
  cardContainer: {
    backgroundColor: "#f3f4f6", // gray-100
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#5c7e84",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  cardHeader: {
    height: 140,
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  menuButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 8,
    zIndex: 20,
  },
  activeBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  activeDot: {
    width: 2,
    height: 10,
    backgroundColor: "#475569",
  },
  activeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#ef4444",
    textTransform: "uppercase",
  },

  // Locked State
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  lockIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(239, 68, 68, 0.9)", // red
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.2)",
  },
  lockedCardWrapper: {
    gap: 12,
  },
  upsellText: {
    textAlign: "center",
    color: "#083344", // slightly darker for readability vs white/zinc
    fontWeight: "700",
    fontSize: 14,
    marginTop: 8,
    opacity: 0.8,
  },

  // Card Body
  cardBody: {
    padding: 16,
    paddingBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#172554",
    marginBottom: 6,
  },
  cardDateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 16,
  },
  cardDateText: {
    fontSize: 12,
    color: "#334155",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 12,
    minHeight: 32,
  },
  viewItineraryBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  viewItineraryLocked: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    opacity: 0.6,
  },
  viewItineraryText: {
    fontSize: 12,
    color: "#ef4444",
    fontWeight: "500",
  },
  viewItineraryTextLocked: {
    fontSize: 12,
    color: "#ef4444",
    fontWeight: "500",
  },

  // Travelers
  travelerStack: {
    flexDirection: "row",
    alignItems: "center",
    width: 120, // ample space
    height: 24,
  },
  travelerAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ef4444",
    position: "absolute",
  },
  moreTravelers: {
    position: "absolute",
    height: 20,
    paddingHorizontal: 6,
    backgroundColor: "#fecdd3", // rose-200
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ef4444",
    justifyContent: "center",
    alignItems: "center",
    top: 2,
  },
  moreTravelersText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#083344",
  },
  travelerLabel: {
    marginLeft: 75,
    fontSize: 12,
    color: "#083344",
    fontWeight: "500",
  },

  // FAB
  fab: {
    position: "absolute",
    bottom: 110, // Above Nav
    right: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#ef4444",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#dc2626",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.1)",
  },

  // Bottom Nav
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    paddingTop: 16,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  tabItem: {
    alignItems: "center",
    gap: 6,
    width: 60,
  },
  tabIconWrapper: {
    padding: 6,
    borderRadius: 12,
  },
  tabIconWrapperActive: {
    backgroundColor: "#fff7ed", // orange-50
  },
  tabLabel: {
    fontSize: 10,
    color: "#64748b",
    fontWeight: "500",
  },
  tabLabelActive: {
    color: "#ef4444",
  },
});
