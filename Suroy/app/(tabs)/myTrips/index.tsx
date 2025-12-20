import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StatusBar,
  Animated,
  TouchableWithoutFeedback,
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
  Map,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TripCardForm from "@/components/tripCard";
import {
  addTripCard,
  getTripCard,
  updateTripCard,
  deleteTripCard,
  tripCardContent,
} from "@/service/routes/tripCard";
import { router } from "expo-router";

const { width } = Dimensions.get("window");
export default function MyTripsScreen() {
  const [trips, setTrips] = useState<tripCardContent[]>([]);
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const scrollRef = useRef<ScrollView>(null);

  const toggleMenu = () => {
    const toValue = isMenuOpen ? 0 : 1;

    Animated.spring(animation, {
      toValue,
      useNativeDriver: true,
      friction: 5, // Controls "bounciness"
      tension: 40,
    }).start();

    setIsMenuOpen(!isMenuOpen);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const { upcomingTrips, pastTrips } = useMemo(() => {
    const now = new Date();

    // Helper to check if a date string/object is in the past
    const isDatePast = (endDate: string | Date) => {
      const end = new Date(endDate);
      return end < now;
    };

    return {
      upcomingTrips: trips.filter((t) => !isDatePast(t.endDate)),
      pastTrips: trips.filter((t) => isDatePast(t.endDate)),
    };
  }, [trips]);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const data = await getTripCard();
      console.log("data", data);
      setTrips(data as unknown as tripCardContent[]);
    } catch (e) {
      console.error("Error fetching trips:", e);
      Alert.alert("Error", "Could not load trips.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleTabPress = (tab: "upcoming" | "past") => {
    setActiveTab(tab);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        x: tab === "upcoming" ? 0 : width, // Scroll to 0 for upcoming, width for past
        animated: true,
      });
    }
  };

  // 4. Handle Swipe (Updates state when user swipes manually)
  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);

    // 0 = Upcoming, 1 = Past
    const newTab = currentIndex === 0 ? "upcoming" : "past";
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  };

  const rotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"], // Rotates Plus to X
  });

  const button1Style = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -70], // Moves up 70px
        }),
      },
    ],
    opacity: animation,
  };

  const button2Style = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -130], // Moves up 130px
        }),
      },
    ],
    opacity: animation,
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <SafeAreaView style={styles.headerSafeArea}>
        <View style={styles.headerContainer}>
          {/* <TouchableOpacity style={styles.iconButton}> */}
          {/*   <ArrowLeft size={24} color="#172554" /> */}
          {/* </TouchableOpacity> */}

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

        {/* Toggle Switch (No Container Background) */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={
              activeTab === "upcoming"
                ? styles.toggleBtnActive
                : styles.toggleBtnInactive
            }
            onPress={() => handleTabPress("upcoming")}
          >
            <Text
              style={
                activeTab === "upcoming"
                  ? styles.toggleTextActive
                  : styles.toggleTextInactive
              }
            >
              Upcoming
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              activeTab === "past"
                ? styles.toggleBtnActive
                : styles.toggleBtnInactive
            }
            onPress={() => handleTabPress("past")}
          >
            <Text
              style={
                activeTab === "past"
                  ? styles.toggleTextActive
                  : styles.toggleTextInactive
              }
            >
              Past
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll} // Detects when swipe finishes
          style={{ width: width }} // Ensure it takes full width
        >
          {/* Page 1: Upcoming Trips */}
          <View style={{ width: width, paddingHorizontal: 20 }}>
            <View style={styles.cardsContainer}>
              {upcomingTrips.length > 0
                ? upcomingTrips.map((trip) => (
                    <TripCardForm key={trip.id} {...trip} />
                  ))
                : !loading && (
                    <View style={styles.emptyState}>
                      <Text style={styles.emptyStateText}>
                        No upcoming trips planned.
                      </Text>
                    </View>
                  )}
            </View>
          </View>

          {/* Page 2: Past Trips */}
          <View style={{ width: width, paddingHorizontal: 20 }}>
            <View style={styles.cardsContainer}>
              {pastTrips.length > 0
                ? pastTrips.map((trip) => (
                    <TripCardForm
                      key={trip.id}
                      {...trip}
                      isActive={false} // Force inactive style for past trips if you want
                      isComplete={true}
                    />
                  ))
                : !loading && (
                    <View style={styles.emptyState}>
                      <Text style={styles.emptyStateText}>
                        No past trips found.
                      </Text>
                    </View>
                  )}
            </View>
          </View>
        </ScrollView>

        {/* Trip Cards */}

        {/* Card 2: Locked */}
        {/* <View style={styles.lockedCardWrapper}> */}
        {/*   <TripCardForm */}
        {/*     title="Cebu City" */}
        {/*     date="3 Feb - 14 Feb" */}
        {/*     imageUri="https://placehold.co/385x256" */}
        {/*     isActive={false} */}
        {/*     isLocked={true} */}
        {/*   /> */}
        {/* Upsell Text */}
        {/*   <Text style={styles.upsellText}> */}
        {/*     Want to add more trips? Upgrade Suroy Now! */}
        {/*   </Text> */}
        {/* </View> */}

        {/* Spacer for FAB and Bottom Nav */}
        <View style={{ height: 120 }} />
      </ScrollView>

      <Animated.View
        style={[styles.floatingBtnContainer, styles.findTripBtn, button2Style]}
      >
        <TouchableOpacity
          style={styles.innerBtn}
          onPress={() => {
            toggleMenu();
            console.log("Find Trip Pressed");
            router.push("/discover/seeAll");
          }}
        >
          <Text style={styles.btnText}>Find Trip</Text>
          <Compass size={20} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      {/* 2. Create Trip Button (Middle) */}
      <Animated.View
        style={[
          styles.floatingBtnContainer,
          styles.createTripBtn,
          button1Style,
        ]}
      >
        <TouchableOpacity
          style={styles.innerBtn}
          onPress={() => {
            toggleMenu();
            router.push("/myTrips/createTrip2");
          }}
        >
          <Text style={styles.btnText}>Create a Trip</Text>
          <Map size={20} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      {/* 3. Main Toggle Button (Bottom) */}
      <TouchableWithoutFeedback onPress={toggleMenu}>
        <Animated.View
          style={[styles.fab, { transform: [{ rotate: rotation }] }]}
        >
          <Plus size={32} color="#fff" />
        </Animated.View>
      </TouchableWithoutFeedback>
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
    flex: 1, // Takes up all available space between icons
    alignItems: "center", // Centers the text horizontally
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#083344",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#334155",
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

  // Toggle - Updated: Transparent container
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20, // Align with the rest of the content
    marginBottom: 20,
    gap: 16, // Space between buttons
  },
  emptyState: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyStateText: {
    color: "#94a3b8",
    fontSize: 14,
    fontStyle: "italic",
  },
  toggleBtnActive: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#ef4444",
    borderRadius: 8,
    shadowColor: "#ef4444",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleTextActive: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  toggleBtnInactive: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    // Removed flex: 1 so it sits naturally
  },
  toggleTextInactive: {
    color: "#94a3b8", // lighter gray for inactive
    fontSize: 14,
    fontWeight: "600",
  },

  // Cards
  cardsContainer: {
    // paddingHorizontal: 20,
    gap: 24,
    paddingBottom: 20,
  },
  cardContainer: {
    backgroundColor: "#f3f4f6",
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
    backgroundColor: "rgba(239, 68, 68, 0.9)",
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
    color: "#083344",
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
  cardInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
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
  },
  cardDateText: {
    fontSize: 12,
    color: "#334155",
  },

  // Travelers
  travelerStack: {
    flexDirection: "row",
    alignItems: "center",
    width: 80,
    height: 30,
    marginTop: 4,
  },
  travelerAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#fff",
    position: "absolute",
    backgroundColor: "#e2e8f0",
  },
  moreTravelers: {
    position: "absolute",
    height: 20,
    paddingHorizontal: 6,
    backgroundColor: "#fecdd3",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ef4444",
    justifyContent: "center",
    alignItems: "center",
    top: 4,
  },
  moreTravelersText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#083344",
  },

  // Card Footer - View Itinerary
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 12,
    alignItems: "flex-start",
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

  // FAB
  fab: {
    position: "absolute",
    bottom: 40,
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
    backgroundColor: "#fff7ed",
  },
  tabLabel: {
    fontSize: 10,
    color: "#64748b",
    fontWeight: "500",
  },
  tabLabelActive: {
    color: "#ef4444",
  },
  floatingBtnContainer: {
    position: "absolute",
    bottom: 40, // Aligned with the main FAB
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#dc5230", // rgba(220,82,48,1.00)
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10, // Adjusted slightly for mobile look
    elevation: 8,
  },

  // "Create a Trip" Button Style (w-48 h-12 -> 192px x 48px)
  createTripBtn: {
    width: 192,
    height: 48,
    borderRadius: 24, // rounded-3xl
    backgroundColor: "#ef4444", // red-500
    zIndex: 9,
  },

  // "Find Trip" Button Style (w-40 h-14 -> 160px x 56px)
  findTripBtn: {
    width: 160,
    height: 56,
    borderRadius: 28, // rounded-3xl
    backgroundColor: "#ef4444", // red-500
    zIndex: 10,
  },

  // Inner layout for text and icons inside the buttons
  innerBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: "100%",
    height: "100%",
  },

  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  // Updated Main FAB
  fab: {
    position: "absolute",
    bottom: 40,
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
    elevation: 11, // Higher than the buttons so it sits on top if they overlap
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.1)",
    zIndex: 20,
  },
});
