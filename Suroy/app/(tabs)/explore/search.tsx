import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  Dimensions,
} from "react-native";
import {
  ChevronLeft,
  Bell,
  Search,
  SlidersHorizontal,
  Clock,
  Briefcase,
  Compass,
  MapPin,
  MessageCircle,
  User,
  ChevronDown,
} from "lucide-react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// --- Mock Data ---
const TRIPS = [
  {
    id: 1,
    title: "Viking History Tour",
    desc: "Step into the past with a day-trip to Birka",
    time: "2 min read",
    img: "https://placehold.co/162x107",
  },
  {
    id: 2,
    title: "Royal Palace Visit",
    desc: "Discover the regal history of Drottningholm Palace",
    time: "2 min read",
    img: "https://placehold.co/160x118",
  },
  {
    id: 3,
    title: "Walk in Tyresta",
    desc: "Take a scenic nature walk in Tyresta National Park",
    time: "2 min read",
    img: "https://placehold.co/160x117",
  },
  {
    id: 4,
    title: "Retreat in Sigtuna",
    desc: "Immerse yourself in art and history in Sigtuna",
    time: "2 min read",
    img: "https://placehold.co/160x117",
  },
  {
    id: 5,
    title: "Trail in Uppsala",
    desc: "Indulge in fika with a day in Uppsala's cafes",
    time: "2 min read",
    img: "https://placehold.co/183x136",
  },
  {
    id: 6,
    title: "Day in Eskilstuna",
    desc: "Explore galleries for a day of cultural enrichment",
    time: "2 min read",
    img: "https://placehold.co/162x107",
  },
];

const FILTERS = ["Easy Activity", "Within 50km", "Time: Under 6hr"];

// --- Sub-Components ---

const TripCard = ({ item }) => (
  <TouchableOpacity style={styles.card}>
    <View style={styles.cardImageWrapper}>
      <Image
        source={{ uri: item.img }}
        style={styles.cardImage}
        resizeMode="cover"
      />
    </View>
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.cardDesc} numberOfLines={2}>
        {item.desc}
      </Text>
      <View style={styles.cardFooter}>
        <Clock size={12} color="#6b7280" />
        <Text style={styles.cardTime}>{item.time}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const FilterChip = ({ label }) => (
  <TouchableOpacity style={styles.chip}>
    <Text style={styles.chipText}>{label}</Text>
    <ChevronDown size={12} color="#6b7280" style={{ marginLeft: 4 }} />
  </TouchableOpacity>
);

const BottomNavItem = ({ label, isActive, Icon }) => (
  <TouchableOpacity style={styles.navItem}>
    {isActive && <View style={styles.activeIndicator} />}
    <Icon size={24} color={isActive ? "#ef4444" : "#6b7280"} />
    <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

// --- Main Screen ---

export default function DayTripsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconBtn}>
            <ChevronLeft size={24} color="#172554" />
          </TouchableOpacity>

          <View>
            <Text style={styles.headerTitle}>Explore</Text>
            <Text style={styles.headerSubtitle}>📍 Stockholm, Sweden</Text>
          </View>

          <TouchableOpacity style={styles.iconBtn}>
            <Bell size={20} color="#172554" />
            <View style={styles.badge} />
          </TouchableOpacity>
        </View>

        {/* Page Title */}
        <Text style={styles.sectionTitle}>🇸🇪 Day Trips from Stockholm</Text>

        {/* Search & Filters */}
        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <Search size={16} color="#a8a29e" style={{ marginRight: 8 }} />
            <TextInput
              placeholder="Search for day trips..."
              placeholderTextColor="#d6d3d1"
              style={styles.input}
            />
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <SlidersHorizontal size={20} color="#475569" />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContainer}
        >
          {FILTERS.map((filter, index) => (
            <FilterChip key={index} label={filter} />
          ))}
        </ScrollView>

        {/* List of Trips */}
        <View style={styles.listContainer}>
          {TRIPS.map((trip) => (
            <TripCard key={trip.id} item={trip} />
          ))}
        </View>

        {/* Spacing for Bottom Nav */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Styles ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f5", // zinc-100
  },
  scrollContent: {
    paddingBottom: 20,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 14,
    paddingTop: 10,
    marginBottom: 20,
  },
  iconBtn: {
    width: 44,
    height: 44,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800", // mimic Atami font weight
    color: "#ef4444", // red-500
    textAlign: "center",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
  badge: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    backgroundColor: "#ef4444",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#fff",
  },

  // Main Section
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#172554", // blue-950
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  // Search
  searchRow: {
    flexDirection: "row",
    paddingHorizontal: 14,
    marginBottom: 16,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 40,
    borderRadius: 12,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 12,
    color: "#333",
  },
  filterBtn: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },

  // Filters
  filterScroll: {
    marginBottom: 20,
  },
  filterContainer: {
    paddingHorizontal: 14,
    gap: 10,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: "#02006d",
    shadowOpacity: 0.05,
    shadowRadius: 11,
    elevation: 2,
    marginRight: 8,
  },
  chipText: {
    fontSize: 12,
    color: "#6b7280",
  },

  // Card List
  listContainer: {
    paddingHorizontal: 14,
    gap: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6", // gray-100
    borderRadius: 16,
    height: 112, // approx h-28
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#030096",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 27,
    elevation: 3,
  },
  cardImageWrapper: {
    width: 140, // approx w-40 reduced slightly for flex layout
    height: "100%",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#172554",
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 11,
    color: "#6b7280",
    lineHeight: 16,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTime: {
    fontSize: 11,
    color: "#6b7280",
    marginLeft: 6,
    fontWeight: "300",
  },

  // Bottom Nav
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 85,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 20, // for home indicator iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
  },
  activeIndicator: {
    position: "absolute",
    top: -10,
    width: 40,
    height: 4,
    backgroundColor: "#ef4444",
    borderRadius: 2,
  },
  navLabel: {
    fontSize: 10,
    color: "#6b7280",
    marginTop: 4,
  },
  navLabelActive: {
    color: "#ef4444",
    fontWeight: "600",
  },
});
