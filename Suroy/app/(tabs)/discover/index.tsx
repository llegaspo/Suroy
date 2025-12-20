import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import {
  Grid,
  User,
  MapPin,
  Clock,
  Navigation,
  Eye,
  ChevronRight,
  Users,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

// --- 1. DATA MAPPING (Extracted from your HTML) ---

const EXPLORE_DATA = [
  {
    id: 1,
    title: "Kawasan Falls",
    desc: "Indulge in Cebu waters with Kawasan Falls",
    img: "https://drive.google.com/uc?export=view&id=1tpL70Vs4B7jiOCTzlgt5eQgGm_tZncBc",
    footer: "2 min read",
  },
  {
    id: 2,
    title: "Starbuks",
    desc: "Explore nature's wonders on this breathtaking trail",
    img: "https://drive.google.com/uc?export=view&id=15ctgB6KZvyae8MQGoUdEd2a2fYguw767",
    footer: "3 min read",
  },
  {
    id: 3,
    title: "Historical Landmark",
    desc: "Step back in time with this historical marvel",
    img: "https://drive.google.com/uc?export=view&id=1dg27-AUUuCDq7Vl53-op0LU4s6dbszdc",
    footer: "2 min read",
  },
];

const TRIP_DATA = [
  {
    id: 1,
    title: "Swim with Butanding",
    desc: "Dive into the waters of Oslob and get to experience",
    img: "https://drive.google.com/uc?export=view&id=1aWbW1QvCYhkvFrva5cGQxzfGHxz_VAYx",

    footer: "2 min read",
  },
  {
    id: 2,
    title: "Simala Shrine",
    desc: "A famous Catholic pilgrimage site known for its",
    img: "https://drive.google.com/uc?export=view&id=1F3fDsK-JilPeJGhbQ2DMBY-ZwrfyZ1dV",
    footer: "3 min read",
  },
  {
    id: 3,
    title: "Osmeña Peak",
    desc: "Take a scenic nature walk in Tyresta National Park",
    img: "https://drive.google.com/uc?export=view&id=18mg7iC_V7kExMLo2MW06EpbFk80oTmGU",
    footer: "2 min read",
  },
];

const INSTA_DATA = [
  {
    id: 1,
    title: "Sirao Peak View Deck",
    desc: "A quieter viewpoint near Little Amsterdam with sweeping city-to-mountain views",
    img: "https://drive.google.com/uc?export=view&id=1LSdUa8je3E3OifO_H7UEMngHmulUQcBD",
    footer: "2 min read",
  },
  {
    id: 2,
    title: "Cambais Falls",
    desc: "A three-tier waterfall tucked away in Alegria, perfect for serene nature shots",
    img: "https://drive.google.com/uc?export=view&id=1a1FaMrl0q3cbOSIWPKfYH7LMnKYgAzfL",
    footer: "3 min read",
  },
  {
    id: 3,
    title: "Mount Manunggal Viewpoint",
    desc: "Misty mountain roads and pine trees create a moody, cinematic atmosphere",
    img: "https://drive.google.com/uc?export=view&id=1AJk3XnpGzMvKZ2P0Qu_RDx6DwUqaE0eh",
    footer: "2 min read",
  },
];

const TOUR_DATA = [
  {
    id: 4,
    title: "Binalayan Hidden Falls",
    desc: "A secluded waterfall in Samboan surrounded by lush jungle scenery",
    img: "https://drive.google.com/uc?export=view&id=1BinalayanFallsSampleImg",
    footer: "2 min read",
  },
  {
    id: 5,
    title: "Bojo River Cruise",
    desc: "A calm mangrove river cruise offering minimalist and aesthetic views",
    img: "https://drive.google.com/uc?export=view&id=1BojoRiverSampleImg",
    footer: "3 min read",
  },
];

// --- 2. COMPONENTS ---

// The Header from your HTML design (Discover + Icons)
const Header = () => (
  <View style={styles.headerContainer}>
    {/* Top Row: Icons */}
    <View style={styles.headerTopRow}>
      <View style={styles.iconBox}>
        <Grid size={20} color="#172554" />
      </View>
      <View style={styles.profileBox}>
        <User size={20} color="#172554" />
        <View style={styles.redDot} />
      </View>
    </View>

    {/* Title & Location */}
    <View style={styles.headerTitles}>
      <Text style={styles.discoverTitle}>Discover</Text>
      <Text style={styles.locationText}>📍 Cebu, Philippines 🇵🇭</Text>
    </View>
  </View>
);

// The "Nearby Users" Card with the Cyan outline and Toggle
const NearbyCard = () => (
  <View style={styles.nearbyCard}>
    {/* Top Section */}
    <View style={styles.nearbyContent}>
      <View style={styles.nearbyIconContainer}>
        <Users size={20} color="#fff" fill="#fff" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.nearbyTitle}>Nearby Users</Text>
        <Text style={styles.nearbySubtitle}>
          Connect with fellow Suroy users in your vicinity
        </Text>
      </View>
    </View>

    {/* Bottom Bar (Cyan) */}
    <View style={styles.nearbyFooter}>
      <Text style={styles.nearbyFooterText}>
        Let other Suroy users find you?
      </Text>
      {/* Toggle Switch */}
      <View style={styles.toggleSwitch}>
        <View style={styles.toggleKnob} />
        <Text style={styles.toggleText}>OFF</Text>
      </View>
    </View>
  </View>
);

// Universal Card Component (Handles Default, Insta, Tour)
const Card = ({ item, variant }) => {
  let FooterIcon = Clock;
  let footerColor = "#6b7280"; // Gray
  let footerText = item.footer;
  let isUnderline = false;

  if (variant === "insta") {
    FooterIcon = Navigation;
    footerColor = "#fb923c"; // Orange
    footerText = item.action;
    isUnderline = true;
  } else if (variant === "tour") {
    FooterIcon = Eye;
    footerColor = "#ef4444"; // Red
    footerText = item.action;
    isUnderline = true;
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardImageWrapper}>
        <Image source={{ uri: item.img }} style={styles.cardImage} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.cardDesc} numberOfLines={3}>
          {item.desc}
        </Text>

        <View style={styles.cardFooter}>
          <FooterIcon
            size={12}
            color={footerColor}
            style={{ marginRight: 4 }}
          />
          <Text
            style={[
              styles.cardFooterText,
              {
                color: footerColor,
                textDecorationLine: isUnderline ? "underline" : "none",
              },
            ]}
          >
            {footerText}
          </Text>
        </View>
      </View>
    </View>
  );
};

// Section Container with "See All"
const Section = ({ title, data, variant = "default" }) => (
  <View style={styles.sectionContainer}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity
        style={styles.seeAllBtn}
        onPress={() => router.push("/discover/seeAll")}
      >
        <Text style={styles.seeAllText}>See all</Text>
        <ChevronRight size={14} color="#64748b" />
      </TouchableOpacity>
    </View>

    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {data.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => router.push("/discover/shortArticle")}
        >
          <Card key={item.id} item={item} variant={variant} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

// --- 3. MAIN APP ---

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />

      {/* ScrollView for the whole page */}
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <Header />

        {/* Nearby Card Area */}
        <View style={{ paddingHorizontal: 14, marginTop: 10 }}>
          <NearbyCard />
        </View>

        {/* Sections */}
        <Section title="Explore Cebu" data={EXPLORE_DATA} variant="default" />
        <Section title="Trip Cards" data={TRIP_DATA} variant="default" />
        <Section
          title="📸 Insta-Worthy Spots"
          data={INSTA_DATA}
          variant="insta"
        />
        <Section title="Wandr Tour Packages" data={TOUR_DATA} variant="tour" />
      </ScrollView>
    </SafeAreaView>
  );
}

// --- 4. STYLES (Matching your HTML visuals) ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6", // gray-100
  },

  // Header Styles
  headerContainer: {
    paddingHorizontal: 14,
    paddingTop: 10,
    marginBottom: 10,
  },
  headerTopRow: {
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
  profileBox: {
    width: 48,
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  redDot: {
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
  headerTitles: {
    marginTop: 10,
    paddingLeft: 4,
  },
  discoverTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#172554", // blue-950
    marginBottom: 4,
  },
  locationText: {
    fontSize: 16,
    color: "#083344", // cyan-950
  },

  // Nearby Card Styles
  nearbyCard: {
    backgroundColor: "#f3f4f6",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#06b6d4", // cyan-500
    overflow: "hidden",
    shadowColor: "#030096",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 10,
    elevation: 4,
  },
  nearbyContent: {
    flexDirection: "row",
    padding: 16,
    alignItems: "flex-start",
  },
  nearbyIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#06b6d4",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  nearbyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#172554",
  },
  nearbySubtitle: {
    fontSize: 12,
    color: "#475569",
    marginTop: 4,
  },
  nearbyFooter: {
    backgroundColor: "#06b6d4",
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  nearbyFooterText: {
    color: "#fff",
    fontSize: 12,
  },
  toggleSwitch: {
    width: 56,
    height: 24,
    backgroundColor: "#e5e7eb", // gray-200
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 2,
  },
  toggleKnob: {
    width: 20,
    height: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  toggleText: {
    marginLeft: 6,
    fontSize: 10,
    color: "#6b7280",
    fontWeight: "600",
  },

  // Section Styles
  sectionContainer: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#172554",
  },
  seeAllBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeAllText: {
    fontSize: 12,
    color: "#64748b",
    marginRight: 2,
  },
  scrollContent: {
    paddingLeft: 14,
    paddingRight: 14,
  },

  // Card Styles
  cardContainer: {
    width: 160, // w-40
    height: 208, // h-52
    backgroundColor: "#f3f4f6", // gray-100
    borderRadius: 16,
    marginRight: 12,
    shadowColor: "#030096",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    overflow: "hidden",
  },
  cardImageWrapper: {
    height: 80, // h-20
    width: "100%",
    backgroundColor: "#e5e7eb",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  cardContent: {
    padding: 12,
    flex: 1,
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#172554",
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 12,
    color: "#64748b",
    lineHeight: 16,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  cardFooterText: {
    fontSize: 10,
    fontWeight: "500",
  },
});
