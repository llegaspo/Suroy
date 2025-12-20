import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Bell,
  Search,
  SlidersHorizontal,
  Clock,
  MapPin,
  Home,
  Compass,
  MessageCircle,
  User,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

// --- Mock Data extracted from HTML ---
const LIST_DATA = [
  {
    id: 1,
    title: "Swim with Butanding",
    desc: "Dive into the waters of Oslob and get to experience swimming with Butanding",
    readTime: "2 min read",
    img: "https://placehold.co/190x120",
  },
  {
    id: 2,
    title: "Simala Shrine",
    desc: "A famous Catholic pilgrimage site known for its castle-like architecture",
    readTime: "2 min read",
    img: "https://placehold.co/161x107",
  },
  {
    id: 3,
    title: "Osmeña Peak",
    desc: "Take a leap of faith at Cebu’s highest point in Dalaguete",
    readTime: "2 min read",
    img: "https://placehold.co/176x117",
  },
  {
    id: 4,
    title: "Pescador Island",
    desc: "Immerse yourself in a limestone island in Cebu",
    readTime: "2 min read",
    img: "https://placehold.co/162x107",
  },
  {
    id: 5,
    title: "Magellan’s Cross",
    desc: "Immerse yourself in a limestone island in Cebu",
    readTime: "2 min read",
    img: "https://placehold.co/162x107",
  },
  {
    id: 6,
    title: "Trail in Uppsala",
    desc: "Indulge in the Swedish tradition of fika with a day in Uppsala's cafes",
    readTime: "2 min read",
    img: "https://placehold.co/183x136",
  },
  {
    id: 7,
    title: "Day in Eskilstuna",
    desc: "Explore galleries for a day of cultural enrichment in Eskilstuna",
    readTime: "2 min read",
    img: "https://placehold.co/162x107",
  },
];

const FilterChip = ({ label, color }) => (
  <TouchableOpacity
    style={[
      styles.filterChip,
      { borderColor: color }, // Dynamic border color
    ]}
  >
    <Text style={styles.filterText}>{label}</Text>
    <View style={styles.filterIcon} />
  </TouchableOpacity>
);

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* --- Header --- */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconBtn}>
            <ArrowLeft size={24} color="#172554" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Explore Cebu</Text>
          <TouchableOpacity style={styles.iconBtn}>
            <Bell size={24} color="#172554" />
            <View style={styles.redDot} />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* --- Search & Filters --- */}
          <View style={styles.searchSection}>
            <View style={styles.searchBar}>
              <Search size={18} color="#083344" style={{ marginRight: 8 }} />
              <TextInput
                placeholder="Search for places in Cebu..."
                placeholderTextColor="#d6d3d1"
                style={styles.input}
              />
            </View>
            <TouchableOpacity style={styles.filterBtn}>
              <SlidersHorizontal size={20} color="#172554" />
            </TouchableOpacity>
          </View>

          {/* Filters Row */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroll}
            contentContainerStyle={{ gap: 10, paddingHorizontal: 4 }}
          >
            <FilterChip label="Beach Spot" color="#fdba74" />
            <FilterChip label="Hiking Spot" color="#7dd3fc" />
            <FilterChip label="Cultural Visit" color="#fca5a5" />
          </ScrollView>

          {/* --- List Cards --- */}
          <View style={styles.listContainer}>
            {LIST_DATA.map((item) => (
              <TouchableOpacity key={item.id} style={styles.card}>
                <Image source={{ uri: item.img }} style={styles.cardImg} />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDesc} numberOfLines={2}>
                    {item.desc}
                  </Text>
                  <View style={styles.cardFooter}>
                    <Clock
                      size={12}
                      color="#6b7280"
                      style={{ marginRight: 4 }}
                    />
                    <Text style={styles.readTime}>{item.readTime}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Padding for Bottom Nav */}
          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>

      {/* --- Custom Bottom Navigation (Visual Mock) --- */}
      {/* Note: In a real app, use Expo Router Tabs instead of this View */}
      <View style={styles.bottomNav}>
        <View style={styles.navItem}>
          <Home size={24} color="#6b7280" />
          <Text style={styles.navLabel}>My Trips</Text>
        </View>
        <View style={styles.navItem}>
          <Compass size={24} color="#ef4444" />
          <Text
            style={[styles.navLabel, { color: "#ef4444", fontWeight: "600" }]}
          >
            Discover
          </Text>
        </View>
        <View style={styles.navItem}>
          <MessageCircle size={24} color="#6b7280" />
          <Text style={styles.navLabel}>Inbox</Text>
        </View>
        <View style={styles.navItem}>
          <User size={24} color="#6b7280" />
          <Text style={styles.navLabel}>Profile</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6", // gray-100
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#172554", // blue-950
  },
  iconBtn: {
    width: 44,
    height: 44,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  redDot: {
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

  // Search Section
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 46,
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    shadowColor: "#030096",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#1c1917",
  },
  filterBtn: {
    width: 46,
    height: 46,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    shadowColor: "#030096",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 2,
  },

  // Filters
  filterScroll: {
    marginBottom: 20,
    overflow: "visible", // Allows shadows to show
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 50,
    borderWidth: 1,
    marginRight: 8,
    shadowColor: "#02006d",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 11,
    elevation: 1,
  },
  filterText: {
    fontSize: 12,
    color: "#6b7280",
    marginRight: 8,
  },
  filterIcon: {
    width: 8,
    height: 8,
    backgroundColor: "#6b7280",
    borderRadius: 4,
  },

  // List Cards
  listContainer: {
    gap: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6", // Matches bg but has shadow
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    shadowColor: "#030096",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
    overflow: "hidden",
    height: 112,
  },
  cardImg: {
    width: 140,
    height: "100%",
    resizeMode: "cover",
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#172554", // blue-950
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 11,
    color: "#6b7280",
    lineHeight: 14,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  readTime: {
    fontSize: 11,
    color: "#6b7280",
    fontWeight: "300",
  },

  // Bottom Navigation (Visual Mock)
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 85,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.11,
    shadowRadius: 100,
    elevation: 20,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  navLabel: {
    fontSize: 11,
    color: "#6b7280",
    marginTop: 4,
  },
});
