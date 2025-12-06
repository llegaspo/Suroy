import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Switch,
  Platform,
} from "react-native";
import {
  MapPin,
  Navigation,
  Clock,
  ChevronRight,
  Compass,
  User,
  MessageCircle,
  Briefcase,
  Heart,
} from "lucide-react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// --- Mock Data extracted from your HTML ---
const LOCAL_RECS = [
  {
    id: 1,
    title: "Revival Cafe",
    desc: "Discover a cozy spot for coffee enthusiasts",
    time: "2 min read",
    img: "https://placehold.co/160x107",
  },
  {
    id: 2,
    title: "Scenic Hiking Trail",
    desc: "Explore nature's wonders on this breathtaking trail",
    time: "3 min read",
    img: "https://placehold.co/160x107",
  },
  {
    id: 3,
    title: "Historical Landmark",
    desc: "Step back in time with this historical marvel",
    time: "2 min read",
    img: "https://placehold.co/160x107",
  },
];

const DAY_TRIPS = [
  {
    id: 1,
    title: "Viking History Tour",
    desc: "Step into the past with a day-trip to Birka",
    time: "2 min read",
    img: "https://placehold.co/160x107",
  },
  {
    id: 2,
    title: "Royal Palace Visit",
    desc: "Discover the regal history of Drottningholm Palace",
    time: "3 min read",
    img: "https://placehold.co/160x118",
  },
  {
    id: 3,
    title: "Walk in Tyresta",
    desc: "Take a scenic nature walk in Tyresta National Park",
    time: "2 min read",
    img: "https://placehold.co/160x107",
  },
];

const INSTA_SPOTS = [
  {
    id: 1,
    title: "Gamla Stan Charm",
    desc: "Timeless beauty of Stockholm's old town",
    action: "See Directions",
    img: "https://placehold.co/161x107",
  },
  {
    id: 2,
    title: "Djurgården Dream",
    desc: "Explore Djurgården's lush landscapes",
    action: "See Directions",
    img: "https://placehold.co/164x118",
  },
  {
    id: 3,
    title: "Södermalm Street",
    desc: "Immerse yourself in city’s artistic vibe",
    action: "See Directions",
    img: "https://placehold.co/163x107",
  },
];

const PACKAGES = [
  {
    id: 1,
    title: "Culture in Varanasi",
    desc: "Exploring the vibrant and spiritual city",
    action: "View Details",
    img: "https://placehold.co/161x116",
  },
  {
    id: 2,
    title: "Safari in Kenya",
    desc: "Embarking on a safari, encountering beauty",
    action: "View Details",
    img: "https://placehold.co/170x107",
  },
  {
    id: 3,
    title: "Hiking the Inca Trail",
    desc: "A challenging trek to the ancient ruins",
    action: "View Details",
    img: "https://placehold.co/166x107",
  },
];

// --- Reusable Components ---

const SectionHeader = ({ title, showSeeAll = false }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {showSeeAll && (
      <TouchableOpacity style={styles.seeAllBtn}>
        <Text style={styles.seeAllText}>See All</Text>
        <View style={styles.redDash} />
      </TouchableOpacity>
    )}
  </View>
);

const Card = ({ item, type }) => (
  <View style={styles.cardContainer}>
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
        {/* Conditional rendering based on card type */}
        {type === "read" && (
          <View style={styles.footerRow}>
            <Clock size={12} color="#6b7280" />
            <Text style={styles.footerText}>{item.time}</Text>
          </View>
        )}
        {(type === "direction" || type === "details") && (
          <View style={styles.footerRow}>
            <Navigation
              size={12}
              color={type === "direction" ? "#fb923c" : "#ef4444"}
            />
            <Text
              style={[
                styles.footerText,
                {
                  color: type === "direction" ? "#fb923c" : "#ef4444",
                  textDecorationLine: "underline",
                },
              ]}
            >
              {item.action}
            </Text>
          </View>
        )}
      </View>
    </View>
  </View>
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

export default function WandrScreen() {
  const [isDiscoverable, setIsDiscoverable] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.avatarBox}>
              <View style={styles.blueDot} />
            </View>
            <View style={styles.rightAvatarBox}>
              <View style={styles.blueDot} />
              <View style={styles.redBadge} />
            </View>
          </View>
          <Text style={styles.heroTitle}>Explore</Text>
          <Text style={styles.locationText}>📍 Stockholm, Sweden</Text>
        </View>

        {/* Nearby Users Card */}
        <View style={styles.nearbyCard}>
          <View style={styles.nearbyHeader}>
            <View style={styles.nearbyIconBg} />
            <View style={styles.nearbyTextCol}>
              <Text style={styles.nearbyTitle}>Nearby Users</Text>
              <Text style={styles.nearbyDesc}>
                Connect with fellow Wandr users in your vicinity
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.nearbyToggleRow}>
            <Text style={styles.toggleLabel}>
              Let other Wandr users find you?
            </Text>
            <View style={styles.switchWrapper}>
              <Switch
                value={isDiscoverable}
                onValueChange={setIsDiscoverable}
                trackColor={{ false: "#e5e7eb", true: "#fb923c" }}
                thumbColor={"#fff"}
              />
              <Text style={styles.switchText}>
                {isDiscoverable ? "ON" : "OFF"}
              </Text>
            </View>
          </View>
        </View>

        {/* Section 1: Local Recommendations */}
        <SectionHeader title="🎡 Local Recommendations" showSeeAll />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.hScroll}
          contentContainerStyle={styles.hScrollContent}
        >
          {LOCAL_RECS.map((item) => (
            <Card key={item.id} item={item} type="read" />
          ))}
        </ScrollView>

        {/* Section 2: Day Trips */}
        <SectionHeader title="🇸🇪 Day Trips from Stockholm" showSeeAll />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.hScroll}
          contentContainerStyle={styles.hScrollContent}
        >
          {DAY_TRIPS.map((item) => (
            <Card key={item.id} item={item} type="read" />
          ))}
        </ScrollView>

        {/* Section 3: Insta-Worthy Spots */}
        <SectionHeader title="📸 Insta-Worthy Spots" showSeeAll />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.hScroll}
          contentContainerStyle={styles.hScrollContent}
        >
          {INSTA_SPOTS.map((item) => (
            <Card key={item.id} item={item} type="direction" />
          ))}
        </ScrollView>

        {/* Section 4: Tour Packages */}
        <SectionHeader title="Wandr Tour Packages" showSeeAll />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.hScroll}
          contentContainerStyle={styles.hScrollContent}
        >
          {PACKAGES.map((item) => (
            <Card key={item.id} item={item} type="details" />
          ))}
        </ScrollView>
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
    paddingHorizontal: 14,
    paddingTop: 10,
    marginBottom: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  avatarBox: {
    width: 56,
    height: 56,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  rightAvatarBox: {
    width: 56,
    height: 56,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
  },
  blueDot: {
    width: 16,
    height: 16,
    backgroundColor: "#172554", // blue-950
    borderRadius: 4,
  },
  redBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    backgroundColor: "#ef4444",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#fff",
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#ef4444", // red-500
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto", // Replace with 'Atami' if linked
    marginBottom: 4,
    marginLeft: 10,
  },
  locationText: {
    fontSize: 16,
    color: "#6b7280", // gray-500
    marginLeft: 10,
  },

  // Nearby Card
  nearbyCard: {
    marginHorizontal: 14,
    backgroundColor: "#f3f4f6", // gray-100
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#fb923c", // orange-400
    padding: 12,
    marginBottom: 24,
    shadowColor: "#030096",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 27,
    elevation: 5,
  },
  nearbyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  nearbyIconBg: {
    width: 48,
    height: 48,
    backgroundColor: "#e5e5e5", // Neutral placeholder
    borderRadius: 24,
    marginRight: 12,
  },
  nearbyTextCol: {
    flex: 1,
  },
  nearbyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#172554",
    marginBottom: 2,
  },
  nearbyDesc: {
    fontSize: 12,
    color: "#475569",
    lineHeight: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#fb923c",
    marginHorizontal: -12, // Stretch to edge
    marginBottom: 10,
  },
  nearbyToggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 4,
  },
  toggleLabel: {
    fontSize: 12,
    color: "#333",
  },
  switchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e5e7eb",
    borderRadius: 20,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  switchText: {
    fontSize: 10,
    color: "#6b7280",
    marginLeft: 4,
    fontWeight: "600",
  },

  // Sections
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#172554", // blue-950
  },
  seeAllBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#ef4444",
    textDecorationLine: "underline",
  },
  redDash: {
    width: 4,
    height: 8,
    backgroundColor: "#ef4444",
    marginLeft: 6,
  },

  // Horizontal Scroll
  hScroll: {
    marginBottom: 24,
  },
  hScrollContent: {
    paddingHorizontal: 14,
  },

  // Card
  cardContainer: {
    width: 160,
    height: 220,
    backgroundColor: "#f3f4f6",
    borderRadius: 16,
    marginRight: 12,
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
    width: 160,
    height: 100, // slightly larger to handle overflow
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  cardContent: {
    padding: 10,
    justifyContent: "space-between",
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#172554",
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 11, // slightly smaller to fit
    color: "#6b7280",
    lineHeight: 14,
    marginBottom: 6,
  },
  cardFooter: {
    marginTop: "auto",
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
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
    paddingBottom: 20, // for home indicator on iOS
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
