import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");

const ProfileSheetScreen = () => {
  return (
    <View style={styles.container}>
      {/* ==========================
          BACKGROUND LAYER (Map & Discover)
          ========================== */}
      <View style={styles.backgroundLayer}>
        {/* Background Overlay to dim the map */}
        <View style={styles.bgOverlay} />

        {/* Header Elements (Behind the sheet) */}
        <Text style={styles.bgTitle}>Discover</Text>
        <Text style={styles.bgSubtitle}>📍 Cebu, Philippines 🇵🇭 </Text>

        {/* Back Arrow Button (Top Left) */}
        <View style={styles.bgBackButton}>
          <View style={styles.bgBackArrow} />
        </View>

        {/* Filter Button (Top Right) */}
        <View style={styles.bgFilterButton}>
          <View style={styles.filterIconBody} />
          <View style={styles.filterIconDot} />
        </View>

        {/* Text */}
        <Text style={styles.bgContextText}>Nearby Users</Text>
        <Text style={styles.bgDescription}>
          Be spontaneous and meet with fellow users around you. Tap on Avatar to
          connect!
        </Text>

        {/* Map Image */}
        <View style={styles.mapContainer}>
          <Image
            source={{ uri: "https://placehold.co/624x1223" }}
            style={styles.mapImage}
          />
          {/* Sample Map Pins (Visual Context) */}
          <MapPin x={236} y={193} name="Olivia" />
          <MapPin x={-24} y={163} name="Emma" />
          <MapPin x={94} y={97} name="Owen" />
          <MapPin x={0} y={-26} name="Liam" />
        </View>
      </View>

      {/* ==========================
          FOREGROUND MODAL (White Sheet)
          ========================== */}
      <View style={styles.modalContainer}>
        {/* Scrollable Content inside the Sheet */}
        <ScrollView
          style={styles.modalScrollView}
          contentContainerStyle={styles.modalContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Space for the fixed headers */}
          <View style={{ height: 160 }} />

          {/* Photo Collage */}
          <View style={styles.photoCollage}>
            <Image
              source={{ uri: "https://placehold.co/379x221" }}
              style={styles.photoMain}
            />
            <Image
              source={{ uri: "https://placehold.co/385x257" }}
              style={styles.photoSecondary}
            />
          </View>

          {/* Q&A Card 1: Ideal Companion */}
          <View style={styles.qaCard}>
            <Text style={styles.qaTitle}>
              Ideal travel companion qualities..
            </Text>
            <Text style={styles.qaBody}>
              Seeking someone who values both quiet moments and exciting
              adventures, just like me.
            </Text>
          </View>

          {/* Wanna Meet Card (In-flow for scrolling) */}
          <View style={styles.meetCard}>
            <Text style={styles.meetTitle}>Wanna Meet?</Text>
            <Text style={styles.meetSubtitle}>
              Send a request to meet with Shawn
            </Text>
            <TouchableOpacity style={styles.meetButton}>
              <View style={styles.heartIcon}>
                <View style={styles.heartShape} />
              </View>
            </TouchableOpacity>
          </View>

          {/* Highlight Card 1: Wandr */}
          <View style={styles.highlightCard}>
            <Image
              source={{ uri: "https://placehold.co/347x211" }}
              style={styles.highlightImage}
            />
            <Text style={styles.highlightText}>
              <Text style={styles.textSlate}>
                Wandr doesn't just lead to trails; it leads to shared laughter
                and unforgettable moments{" "}
              </Text>
              <Text style={styles.textOrange}>#MetOnWandr</Text>
            </Text>
          </View>

          {/* Q&A Card 2: Travel Story */}
          <View style={styles.qaCard}>
            <Text style={styles.qaTitle}>My go-to travel story..</Text>
            <Text style={styles.qaBody}>
              Embarked on a solo Himalayan trek, met a fellow explorer, and
              shared stories around a campfire
            </Text>
          </View>

          {/* Highlight Card 2: Summit */}
          <View style={styles.highlightCard}>
            <Image
              source={{ uri: "https://placehold.co/346x212" }}
              style={styles.highlightImage}
            />
            <Text style={styles.highlightText}>
              <Text style={styles.textSlate}>
                🤝 Here's to the summit and newfound friendships!
              </Text>
            </Text>
          </View>

          {/* Q&A Card 3: Dream Destination */}
          <View style={[styles.qaCard, { marginBottom: 100 }]}>
            <Text style={styles.qaTitle}>My dream destination..</Text>
            <Text style={styles.qaBody}>
              Dreaming of exploring the ancient ruins of Machu Picchu
            </Text>
          </View>
        </ScrollView>

        {/* --- Fixed/Sticky Elements in Modal --- */}

        {/* "Go Back" Header */}
        <View style={styles.stickyHeader}>
          <View style={styles.handleBarIcon}>
            <View style={styles.handleBarArrow} />
          </View>
          <TouchableOpacity style={styles.backLink}>
            <View style={styles.backLinkArrow} />
            <Text style={styles.backLinkText}>Go Back</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Summary Card (Floating) */}
        <View style={styles.profileSummaryCard}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: "https://placehold.co/70x55" }}
              style={styles.avatarImg}
            />
          </View>
          <View style={styles.profileTexts}>
            <Text style={styles.profileName}>Shawn Doe</Text>
            <Text style={styles.profileDistance}>800m Away</Text>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statCircle} />
            <Text style={styles.statNumber}>13</Text>
            <Text style={styles.statLabel}>Trips</Text>
          </View>

          {/* Online Dot */}
          <View style={styles.onlineDotContainer}>
            <View style={styles.onlineDot} />
          </View>
        </View>
      </View>

      {/* ==========================
          BOTTOM NAVIGATION
          ========================== */}
      <View style={styles.navBar}>
        <View style={styles.navIndicator} />
        <View style={styles.navItemsContainer}>
          <NavItem label="My Trips" color="gray" />
          <NavItem label="Explore" color="red" active />
          <NavItem label="Discover" color="gray" />
          <NavItem label="Inbox" color="gray" />
          <NavItem label="Profile" color="gray" />
        </View>
      </View>
    </View>
  );
};

// --- Sub Components ---

const MapPin = ({ x, y, name }: any) => (
  <View style={[styles.pinContainer, { left: x, top: y }]}>
    <View style={styles.pinCircle}>
      <Image
        source={{ uri: "https://placehold.co/52x52" }}
        style={styles.pinImage}
      />
    </View>
    <Text style={styles.pinName}>{name}</Text>
  </View>
);

const NavItem = ({ label, color, active }: any) => (
  <View style={styles.navItem}>
    <View style={styles.navIconBox}>
      <View
        style={[
          styles.navIcon,
          { backgroundColor: color === "red" ? "#ef4444" : "#6b7280" },
        ]}
      />
    </View>
    <Text
      style={[
        styles.navLabel,
        {
          color: color === "red" ? "#ef4444" : "#6b7280",
          fontWeight: active ? "500" : "400",
        },
      ]}
    >
      {label}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 844,
    backgroundColor: "#f4f4f5", // zinc-100
    overflow: "hidden",
    position: "relative",
  },

  // --- Background Layer ---
  backgroundLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  bgOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 112,
    backgroundColor: "rgba(244, 244, 245, 0.8)", // zinc-100/80
    zIndex: 5,
  },
  bgTitle: {
    position: "absolute",
    left: 82.3,
    top: 52,
    fontSize: 24,
    fontWeight: "bold",
    color: "#083344", // cyan-950
    zIndex: 6,
    fontFamily: "System",
  },
  bgSubtitle: {
    position: "absolute",
    left: 79.4,
    top: 87.6,
    fontSize: 16,
    color: "#334155", // slate-700
    zIndex: 6,
    fontFamily: "System",
  },
  bgBackButton: {
    position: "absolute",
    left: 13.65,
    top: 51,
    width: 56,
    height: 56,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    zIndex: 6,
  },
  bgBackArrow: {
    position: "absolute",
    left: 31,
    top: 35,
    width: 10,
    height: 16,
    backgroundColor: "#172554",
    transform: [{ rotate: "-180deg" }],
  },
  bgFilterButton: {
    position: "absolute",
    left: 320,
    top: 51,
    width: 56,
    height: 56,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    zIndex: 6,
  },
  filterIconBody: {
    position: "absolute",
    left: 18.5,
    top: 17.5,
    width: 16,
    height: 20,
    backgroundColor: "#172554",
  },
  filterIconDot: {
    position: "absolute",
    left: 30.4,
    top: 18.1,
    width: 8,
    height: 8,
    backgroundColor: "#ef4444",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#fafafa",
  },
  bgContextText: {
    position: "absolute",
    left: 16,
    top: 137,
    fontSize: 20,
    fontWeight: "500",
    color: "#172554",
  },
  bgDescription: {
    position: "absolute",
    left: 14.7,
    top: 165,
    width: 384,
    fontSize: 16,
    color: "#6b7280",
    lineHeight: 18,
  },
  mapContainer: {
    position: "absolute",
    left: 14,
    top: 213,
    width: 384,
    height: 526,
    borderRadius: 12,
    overflow: "hidden",
  },
  mapImage: {
    position: "absolute",
    width: 624,
    height: 1223,
    left: -170,
    top: -487,
    opacity: 0.5, // Dimmed slightly as it's background
  },
  pinContainer: {
    position: "absolute",
    alignItems: "center",
  },
  pinCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "white",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  pinImage: {
    width: 52,
    height: 52,
  },
  pinName: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "500",
    color: "black",
  },

  // --- Foreground Modal ---
  modalContainer: {
    position: "absolute",
    left: 0,
    top: 211,
    width: "100%", // w-96 roughly
    height: 631,
    backgroundColor: "white",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    overflow: "hidden",
    // Shadow
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.11,
    shadowRadius: 107,
    elevation: 20,
  },
  modalScrollView: {
    flex: 1,
  },
  modalContent: {
    paddingHorizontal: 15,
    paddingBottom: 40,
  },

  // Fixed Header in Modal
  stickyHeader: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: 80,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // backdrop-blur-xl simulation
    zIndex: 20,
  },
  handleBarIcon: {
    position: "absolute",
    left: 177,
    top: 36,
    width: 36,
    height: 36,
    transform: [{ rotate: "-90deg" }],
  },
  handleBarArrow: {
    position: "absolute",
    left: 27,
    top: 23,
    width: 16,
    height: 12,
    backgroundColor: "#f3f4f6", // gray-100
    transform: [{ rotate: "-180deg" }],
  },
  backLink: {
    position: "absolute",
    left: 28,
    top: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  backLinkArrow: {
    width: 6,
    height: 10,
    backgroundColor: "#6b7280", // gray-500
    transform: [{ rotate: "180deg" }],
    marginRight: 8,
  },
  backLinkText: {
    fontSize: 16,
    color: "#6b7280",
    textDecorationLine: "underline",
  },

  // Profile Summary Card
  profileSummaryCard: {
    position: "absolute",
    left: 12,
    top: 73,
    width: 384, // w-96
    height: 80, // h-20
    backgroundColor: "rgba(243, 244, 246, 0.9)", // gray-100/80
    borderRadius: 12,
    overflow: "hidden",
    zIndex: 15,
  },
  avatarContainer: {
    position: "absolute",
    left: 10,
    top: 14,
    width: 56, // w-14
    height: 56, // h-14
    borderRadius: 30,
    overflow: "hidden",
  },
  avatarImg: {
    width: 64,
    height: 56,
    left: -4,
  },
  profileTexts: {
    position: "absolute",
    left: 70,
    top: 21,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "500",
    color: "#172554", // blue-950
  },
  profileDistance: {
    fontSize: 12,
    color: "#475569", // slate-600
  },
  statsContainer: {
    position: "absolute",
    right: 14,
    top: 14,
    width: 60,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  statCircle: {
    position: "absolute",
    width: 56,
    height: 56,
    backgroundColor: "#e7e5e4", // stone-200
    borderRadius: 28,
    right: 20, // Adjustment for alignment
  },
  statNumber: {
    fontSize: 20,
    color: "#fb923c", // orange-400
    fontWeight: "400", // 'Atami' font fallback
  },
  statLabel: {
    fontSize: 12,
    color: "#fb923c", // orange-400
  },
  onlineDotContainer: {
    position: "absolute",
    left: 176,
    top: 22,
    width: 16,
    height: 16,
  },
  onlineDot: {
    width: 16,
    height: 16,
    backgroundColor: "#ef4444", // red-500
    borderRadius: 8,
  },

  // Content Components
  photoCollage: {
    marginTop: 2, // Relative to the spacer
    width: 384,
    height: 224, // h-56
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
  },
  photoMain: {
    position: "absolute",
    left: -14,
    top: 0,
    width: 384,
    height: 224,
  },
  photoSecondary: {
    position: "absolute",
    left: -0.5,
    top: -12,
    width: 384,
    height: 256,
    opacity: 0, // In HTML, multiple images overlap, hiding one. Adjust as needed.
  },

  qaCard: {
    width: 384, // w-96
    minHeight: 112, // h-28
    backgroundColor: "#f3f4f6", // gray-100
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    position: "relative",
  },
  qaTitle: {
    fontSize: 20,
    color: "#fb923c", // orange-400
    marginBottom: 8,
    fontFamily: "System", // 'Atami'
  },
  qaBody: {
    fontSize: 16,
    color: "#475569", // slate-600
    lineHeight: 20,
    width: 320, // w-80
  },

  // Wanna Meet Card
  meetCard: {
    width: 384, // w-96
    height: 80, // h-20
    backgroundColor: "#E5E7EB", // Field-Color
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 16,
    padding: 15,
    position: "relative",
    // Shadow
    shadowColor: "#020074",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 5,
  },
  meetTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#172554", // blue-950
  },
  meetSubtitle: {
    fontSize: 12,
    color: "#475569", // slate-600
    marginTop: 4,
  },
  meetButton: {
    position: "absolute",
    right: 18,
    top: 18,
    width: 44, // w-11
    height: 44, // h-11
    backgroundColor: "#fecdd3", // rose-200
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  heartIcon: {
    width: 20,
    height: 20,
    overflow: "hidden",
  },
  heartShape: {
    position: "absolute",
    left: 1.75,
    top: 2.75,
    width: 20,
    height: 16,
    backgroundColor: "#ef4444", // red-500
  },

  // Highlight Cards
  highlightCard: {
    width: 384, // w-96
    height: 288, // h-72 approx
    backgroundColor: "#E5E7EB", // Field-Color
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    padding: 9,
  },
  highlightImage: {
    width: 320, // w-80
    height: 208, // h-52
    borderRadius: 12,
    marginBottom: 10,
  },
  highlightText: {
    width: 320, // w-80
    fontSize: 14,
    lineHeight: 16,
  },
  textSlate: {
    color: "#475569", // slate-600
  },
  textOrange: {
    color: "#fb923c", // orange-400
  },

  // --- Bottom Navigation ---
  navBar: {
    position: "absolute",
    left: 0,
    top: 895, // Positioned off-screen in 844px height container, but kept for fidelity
    width: 384, // w-96
    height: 96, // h-24
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    overflow: "hidden",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.11,
    shadowRadius: 107,
    elevation: 10,
  },
  navIndicator: {
    position: "absolute",
    left: 98,
    top: -12,
    width: 64,
    height: 112,
    backgroundColor: "#fff7ed", // orange-50
    borderRadius: 8,
  },
  navItemsContainer: {
    position: "absolute",
    left: 29.5,
    top: 16,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 28,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 2,
  },
  navIconBox: {
    width: 28,
    height: 28,
    position: "relative",
    overflow: "hidden",
  },
  navIcon: {
    width: 20,
    height: 20,
    top: 4,
    left: 4,
    position: "absolute",
  },
  navLabel: {
    fontSize: 12,
    lineHeight: 12,
  },
});

export default ProfileSheetScreen;
