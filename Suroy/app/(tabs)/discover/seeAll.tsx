import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Dimensions,
} from "react-native";
import {
  Search,
  MapPin,
  Calendar,
  MoreVertical,
  ChevronRight,
  Clock,
  Home,
  Compass,
  MessageSquare,
  User,
  Activity,
  Trees,
  Landmark,
  Umbrella,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

// --- Data Models ---

const ACTIVE_TRIPS = [
  {
    id: 1,
    title: "Swim with Butanding",
    date: "3 Feb - 14 Feb",
    image:
      "https://drive.google.com/uc?export=view&id=1aWbW1QvCYhkvFrva5cGQxzfGHxz_VAYx",
    travelers: [
      "https://drive.google.com/uc?export=view&id=1bBSyM7adgWiVGGsEfP6tqVvpKwDtI_DG",
      "https://drive.google.com/uc?export=view&id=1RWCh-PvPz9DDfnm0zqsajxRloX2ClhmI",
      "https://drive.google.com/uc?export=view&id=140lNYounbsJdkIk1HJcAFtp5nAEdI35r",
    ],
  },
  {
    id: 2,
    title: "Simala Shrine",
    date: "3 Feb - 14 Feb",
    image:
      "https://drive.google.com/uc?export=view&id=1F3fDsK-JilPeJGhbQ2DMBY-ZwrfyZ1dV",
    travelers: [
      "https://drive.google.com/uc?export=view&id=1bBSyM7adgWiVGGsEfP6tqVvpKwDtI_DG",
      "https://drive.google.com/uc?export=view&id=1RWCh-PvPz9DDfnm0zqsajxRloX2ClhmI",
      "https://drive.google.com/uc?export=view&id=140lNYounbsJdkIk1HJcAFtp5nAEdI35r",
    ],
  },
  {
    id: 3,
    title: "Osmena Peak",
    date: "3 Feb - 14 Feb",
    image:
      "https://drive.google.com/uc?export=view&id=18mg7iC_V7kExMLo2MW06EpbFk80oTmGU",
    travelers: [
      "https://drive.google.com/uc?export=view&id=1bBSyM7adgWiVGGsEfP6tqVvpKwDtI_DG",
      "https://drive.google.com/uc?export=view&id=1RWCh-PvPz9DDfnm0zqsajxRloX2ClhmI",
      "https://drive.google.com/uc?export=view&id=140lNYounbsJdkIk1HJcAFtp5nAEdI35r",
    ],
  },
];

const SUGGESTED_TRIPS = [
  {
    id: 1,
    title: "Trail in Uppsala",
    desc: "Indulge in the Swedish tradition of fika with a day in Uppsala's cafes",
    image: "https://placehold.co/162x107",
    readTime: "2 min read",
  },
  {
    id: 2,
    title: "Day in Eskilstuna",
    desc: "Explore galleries for a day of cultural enrichment in Eskilstuna",
    image: "https://placehold.co/162x107",
    readTime: "2 min read",
  },
  {
    id: 3,
    title: "Boat Ride in Norrtälje",
    desc: "Relax on a boat ride along the picturesque shores of Norrtälje",
    image: "https://placehold.co/162x107",
    readTime: "2 min read",
  },
  {
    id: 4,
    title: "Viking History Tour",
    desc: "Step into the past with a day-trip to Birka",
    image: "https://placehold.co/162x107",
    readTime: "2 min read",
  },
];

// --- Components ---

const FilterChip = ({ icon: Icon, label, color }) => (
  <View style={[styles.filterChip, { borderColor: color }]}>
    <Text style={styles.filterText}>{label}</Text>
    <Icon size={12} color="#6b7280" style={{ marginLeft: 6 }} />
  </View>
);

const ActiveTripCard = ({ item }) => (
  <View style={styles.activeCard}>
    {/* Image Header */}
    <View style={styles.activeCardImageContainer}>
      <Image source={{ uri: item.image }} style={styles.activeCardImage} />

      {/* Active Badge */}
      <View style={styles.activeBadge}>
        <Activity size={10} color="#ef4444" />
        <Text style={styles.activeBadgeText}>Active</Text>
      </View>

      {/* Menu Icon */}
      <TouchableOpacity style={styles.menuButton}>
        <MoreVertical size={16} color="#475569" />
      </TouchableOpacity>
    </View>

    {/* Content */}
    <View style={styles.activeCardContent}>
      <Text style={styles.activeTitle}>{item.title}</Text>

      <View style={styles.dateRow}>
        <Calendar size={12} color="#334155" />
        <Text style={styles.dateText}>{item.date}</Text>
      </View>

      {/* Footer: Itinerary Link & Avatars */}
      <View style={styles.activeCardFooter}>
        <TouchableOpacity style={styles.itineraryLink}>
          <ChevronRight size={12} color="#ef4444" />
          <Text style={styles.itineraryText}>View Itinerary</Text>
        </TouchableOpacity>

        {/* Avatar Stack */}
        <View style={styles.avatarStack}>
          {item.travelers.map((url, index) => (
            <Image
              key={index}
              source={{ uri: url }}
              style={[styles.avatar, { marginLeft: index > 0 ? -10 : 0 }]}
            />
          ))}
          <View style={styles.moreTravelersBadge}>
            <Text style={styles.moreTravelersText}>2+ Travelers</Text>
          </View>
        </View>
      </View>
    </View>
  </View>
);

const SuggestedCard = ({ item }) => (
  <View style={styles.suggestedCard}>
    <View style={styles.suggestedImageContainer}>
      <Image source={{ uri: item.image }} style={styles.suggestedImage} />
    </View>
    <View style={styles.suggestedContent}>
      <Text style={styles.suggestedTitle}>{item.title}</Text>
      <Text style={styles.suggestedDesc} numberOfLines={2}>
        {item.desc}
      </Text>
      <View style={styles.readTimeRow}>
        <Clock size={12} color="#6b7280" />
        <Text style={styles.readTimeText}>{item.readTime}</Text>
      </View>
    </View>
  </View>
);

const BottomNavBar = () => (
  <View style={styles.navBarContainer}>
    {/* Active Indicator Background for "My Trips" */}
    <View style={styles.navActiveIndicator} />

    <View style={styles.navItem}>
      <Home size={20} color="#6b7280" />
      <Text style={styles.navText}>My Trips</Text>
    </View>

    <View style={styles.navItem}>
      <Compass size={24} color="#ef4444" style={{ marginBottom: 2 }} />
      <Text style={[styles.navText, { color: "#ef4444", fontWeight: "600" }]}>
        Discover
      </Text>
    </View>

    <View style={styles.navItem}>
      <MessageSquare size={24} color="#6b7280" />
      <Text style={styles.navText}>Inbox</Text>
    </View>

    <View style={styles.navItem}>
      <User size={20} color="#6b7280" />
      <Text style={styles.navText}>Profile</Text>
    </View>
  </View>
);

// --- Main App ---

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />

      {/* Fixed Header */}
      <View style={styles.header}>
        <View style={styles.headerIcons}>
          <View style={styles.iconBox}>
            <View style={styles.menuLines} />
          </View>
          <View style={styles.iconBox}>
            <View style={styles.notificationDot} />
            <User size={20} color="#172554" />
          </View>
        </View>
        <Text style={styles.headerTitle}>Trip Cards</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={16} color="#172554" />
          <TextInput
            placeholder="Search for places in Cebu..."
            placeholderTextColor="#a8a29e"
            style={styles.searchInput}
          />
          <View style={styles.filterIconContainer}>
            <View style={styles.filterLines} />
          </View>
        </View>

        {/* Horizontal Filters */}
        <View style={styles.filterRow}>
          <FilterChip icon={Umbrella} label="Beach Spot" color="#fdba74" />
          <FilterChip icon={Trees} label="Hiking Spot" color="#7dd3fc" />
          <FilterChip icon={Landmark} label="Cultural Visit" color="#fca5a5" />
        </View>

        {/* Active Trips Section */}
        <View style={styles.sectionContainer}>
          {ACTIVE_TRIPS.map((trip) => (
            <TouchableOpacity
              key={trip.id}
              onPress={() => router.push("/discover/requestToJoin")}
            >
              <ActiveTripCard key={trip.id} item={trip} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Suggested Trips Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Suggested for you</Text>
          {SUGGESTED_TRIPS.map((trip) => (
            <SuggestedCard key={trip.id} item={trip} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Styles ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6", // gray-100
  },
  scrollContent: {
    paddingTop: 10,
    paddingBottom: 120, // Space for bottom nav
  },

  // Header
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: "#f3f4f6",
    zIndex: 10,
  },
  headerIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  iconBox: {
    width: 48,
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  notificationDot: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 8,
    height: 8,
    backgroundColor: "#ef4444",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#fff",
    zIndex: 1,
  },
  menuLines: {
    width: 20,
    height: 2,
    backgroundColor: "#172554",
    shadowColor: "#172554",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    // Note: Simple CSS hamburger lines are hard in pure views without multiple elements,
    // sticking to icon box visual for now or using Lucide Menu if preferred.
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#172554", // blue-950
    marginBottom: 16,
  },

  // Search
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 16,
    paddingHorizontal: 12,
    height: 48,
    shadowColor: "#030096",
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: "#172554",
    fontSize: 12,
  },
  filterIconContainer: {
    width: 32,
    height: 32,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  // Filters
  filterRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 24,
    gap: 12,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 50,
    borderWidth: 1,
    shadowColor: "#02006d",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  filterText: {
    fontSize: 12,
    color: "#6b7280",
    marginRight: 4,
  },

  // Active Trip Card
  sectionContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  activeCard: {
    backgroundColor: "#fff", // bg-gray-100/white mix in design
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: "#5c7e84",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.32,
    shadowRadius: 4,
    elevation: 5,
    overflow: "hidden",
    height: 180,
  },
  activeCardImageContainer: {
    height: 80,
    position: "relative",
    overflow: "hidden",
  },
  activeCardImage: {
    width: "100%",
    height: 200, // Oversized to shift up like in CSS
    position: "absolute",
    top: -70,
  },
  activeBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  activeBadgeText: {
    color: "#ef4444",
    fontSize: 10,
    fontWeight: "800",
  },
  menuButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 8,
  },
  activeCardContent: {
    marginTop: 10, // Adjust based on image overlap
    paddingHorizontal: 12,
    paddingBottom: 20,
    // paddingTop: 4,
  },
  activeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#172554",
    marginBottom: 4,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 6,
  },
  dateText: {
    fontSize: 12,
    color: "#334155",
  },
  activeCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    paddingTop: 10,
  },
  itineraryLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  itineraryText: {
    fontSize: 12,
    color: "#ef4444",
  },
  avatarStack: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ef4444",
  },
  moreTravelersBadge: {
    backgroundColor: "#fecdd3", // rose-200
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: "#ef4444",
  },
  moreTravelersText: {
    fontSize: 10,
    color: "#083344",
    fontWeight: "600",
  },

  // Suggested Card
  sectionHeader: {
    fontSize: 18,
    fontWeight: "700",
    color: "#172554",
    marginBottom: 12,
    marginTop: 10,
  },
  suggestedCard: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#030096",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    overflow: "hidden",
    height: 110,
  },
  suggestedImageContainer: {
    width: 140,
    height: "100%",
  },
  suggestedImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  suggestedContent: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  suggestedTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#172554",
    marginBottom: 4,
  },
  suggestedDesc: {
    fontSize: 11,
    color: "#6b7280",
    marginBottom: 12,
    lineHeight: 14,
  },
  readTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  readTimeText: {
    fontSize: 11,
    color: "#6b7280",
    fontWeight: "300",
  },

  // Bottom Navigation
  navBarContainer: {
    position: "absolute",
    bottom: 0,
    width: width,
    height: 96,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.11,
    shadowRadius: 20,
    elevation: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    paddingTop: 20,
  },
  navItem: {
    alignItems: "center",
    width: 60,
  },
  navText: {
    fontSize: 10,
    color: "#6b7280",
    marginTop: 4,
  },
  navActiveIndicator: {
    position: "absolute",
    top: -10,
    left: width * 0.28, // Approximate positioning based on visual
    width: 90,
    height: 80,
    backgroundColor: "#fff7ed", // orange-50
    borderRadius: 20,
    zIndex: -1,
  },
});
