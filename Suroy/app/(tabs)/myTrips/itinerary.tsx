import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
} from "react-native";
import {
  ChevronLeft,
  Bell,
  MoreVertical,
  MapPin,
  MessageCircle,
  Home,
  Compass,
  User,
  Plus,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

// --- Mock Data ---
const DAYS = [
  { day: "DAY 1", date: "3 Feb 2024", isActive: true },
  { day: "DAY 2", date: "4 Feb 2024", isActive: false },
  { day: "DAY 3", date: "5 Feb 2024", isActive: false },
  { day: "DAY 6", date: "6 Feb 2024", isActive: false },
  { day: "DAY 9", date: "11 Feb 2024", isActive: false },
];

const TIMELINE_DATA = [
  { type: "day_marker", label: "DAY 1", date: "3 Feb 2024", color: "#06b6d4" }, // cyan
  {
    type: "event",
    title: "Island Hopping",
    image:
      "https://drive.google.com/uc?export=view&id=1_cam9UsRYCI5vsaqKEXOEuK1_aC3xQZN",
    time: "13:00",
    duration: null,
    travelers: "2+ Travelers",
    avatars: [
      "https://drive.google.com/uc?export=view&id=1bBSyM7adgWiVGGsEfP6tqVvpKwDtI_DG",
      "https://drive.google.com/uc?export=view&id=1RWCh-PvPz9DDfnm0zqsajxRloX2ClhmI",
      "https://drive.google.com/uc?export=view&id=140lNYounbsJdkIk1HJcAFtp5nAEdI35r",
    ],
    hasChat: true,
  },
  {
    type: "event",
    title: "Visit Camp Sawi",
    image:
      "https://drive.google.com/uc?export=view&id=1KI5TWhRh0as24x-Q0SpXvl8o02A1mIEd",
    time: "17:00",
    duration: null,
    travelers: "2+ Travelers",
    avatars: [
      "https://drive.google.com/uc?export=view&id=1bBSyM7adgWiVGGsEfP6tqVvpKwDtI_DG",
      "https://drive.google.com/uc?export=view&id=1RWCh-PvPz9DDfnm0zqsajxRloX2ClhmI",
      "https://drive.google.com/uc?export=view&id=140lNYounbsJdkIk1HJcAFtp5nAEdI35r",
    ],
    hasChat: true,
  },
  { type: "day_marker", label: "DAY 2", date: "4 Feb 2024", color: "#ef4444" }, // red
  {
    type: "event",
    title: "Virgin Island",
    image:
      "https://drive.google.com/uc?export=view&id=18ANZtcuu80TevZU7YOXI6gz6boyD3vyv",
    time: "13:00 - 15:00",
    withPerson: "w/ Zarah",
    avatars: [
      "https://drive.google.com/uc?export=view&id=1FTSHN-cytzv4Pr0VXezZK7WAgNrh_Fg6",
    ],
    hasChat: true,
  },
  { type: "day_marker", label: "DAY 4", date: "6 Feb 2024", color: "#ef4444" },
];

export default function ItineraryScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* --- Main Scroll Content --- */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]} // Optional: if you want the header sticky
      >
        <View style={{ height: 100 }} />

        {/* 1. Trip Header Card */}
        <View style={styles.tripCardContainer}>
          <Image
            source={{
              uri: "https://drive.google.com/uc?export=view&id=1L_RPuyrC4vVNGP2MF0hCwBmUCrCxCWgf",
            }}
            style={styles.tripCardImage}
          />
          <View style={styles.tripCardOverlay} />

          <View style={styles.tripCardContent}>
            <View style={styles.activeTag}>
              <View style={styles.activeDot} />
              <Text style={styles.activeText}>Active</Text>
            </View>
            <TouchableOpacity style={styles.moreBtn}>
              <MoreVertical size={20} color="#475569" />
            </TouchableOpacity>

            <View style={styles.tripInfoBottom}>
              <Text style={styles.tripTitle}>Bantayan Island, Cebu</Text>
              <View style={styles.tripDateRow}>
                <CalendarIconSmall />
                <Text style={styles.tripDateText}>3 Feb - 6 Feb</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 2. Details Section Header & Horizontal Scroll */}
        <View style={styles.detailsHeader}>
          <Text style={styles.detailsTitle}>Details</Text>
          <TouchableOpacity style={styles.addBtn}>
            <Plus size={16} color="#fb923c" strokeWidth={4} />
            <Text style={styles.addBtnText}>ADD</Text>
          </TouchableOpacity>
        </View>

        {/* Days Horizontal Scroll */}
        <View style={styles.daysScrollContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.daysScrollView}
          >
            {DAYS.map((item, index) => (
              <View key={index} style={styles.dayChip}>
                <Text
                  style={[
                    styles.dayChipDate,
                    item.isActive ? styles.textRed : styles.textGray,
                  ]}
                >
                  {item.day}
                </Text>
                <Text style={styles.dayChipSub}>{item.date}</Text>
              </View>
            ))}
            {/* Spacer for right padding */}
            <View style={{ width: 60 }} />
          </ScrollView>
          {/* Gradient Fade Effect (Visual only) */}
          <View style={styles.fadeGradient} />
        </View>

        {/* 3. Vertical Timeline */}
        <View style={styles.timelineContainer}>
          {TIMELINE_DATA.map((item, index) => {
            if (item.type === "day_marker") {
              return (
                <View key={index} style={styles.timelineDayMarker}>
                  <View style={styles.timelineLeftCol}>
                    <View
                      style={[styles.dayDot, { backgroundColor: item.color }]}
                    />
                    {/* Vertical Line */}
                    <View style={styles.verticalLine} />
                  </View>
                  <View style={styles.dayMarkerTextContainer}>
                    <Text style={styles.dayMarkerTitle}>{item.label}</Text>
                    <Text style={styles.dayMarkerDate}>{item.date}</Text>
                  </View>
                </View>
              );
            }

            return (
              <View key={index} style={styles.timelineEventRow}>
                <View style={styles.timelineLeftCol}>
                  <View style={styles.eventDot} />
                  <View style={styles.verticalLine} />
                </View>

                <View style={styles.eventCard}>
                  <View style={styles.eventImageContainer}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.eventImage}
                    />
                  </View>
                  <View style={styles.eventDetails}>
                    <Text style={styles.eventTitle}>{item.title}</Text>

                    <View style={styles.timeRow}>
                      <MapPin
                        size={12}
                        color="#64748b"
                        style={{ marginRight: 4 }}
                      />
                      <Text style={styles.timeText}>{item.time}</Text>
                    </View>

                    <TouchableOpacity>
                      <Text style={styles.showMapText}>Show on Map</Text>
                    </TouchableOpacity>

                    {item.withPerson && (
                      <Text style={styles.withPersonText}>
                        {item.withPerson}
                      </Text>
                    )}

                    {/* Bottom Row: Avatars & Chat */}
                    <View style={styles.cardFooter}>
                      <View style={styles.avatarStack}>
                        {item.avatars &&
                          item.avatars.map((avatar, i) => (
                            <Image
                              key={i}
                              source={{ uri: avatar }}
                              style={[
                                styles.avatar,
                                { marginLeft: i > 0 ? -8 : 0, zIndex: 10 - i },
                              ]}
                            />
                          ))}
                        {item.travelers && (
                          <View style={styles.travelerTag}>
                            <Text style={styles.travelerTagText}>
                              {item.travelers}
                            </Text>
                          </View>
                        )}
                      </View>

                      {item.hasChat && (
                        <View style={styles.chatContainer}>
                          <Text style={styles.chatText}>Chat</Text>
                          <View style={styles.chatDot} />
                          <MessageCircle
                            size={14}
                            color="#172554"
                            style={{ marginLeft: 4 }}
                          />
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* --- Top Header (Fixed) --- */}
      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color="#172554" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Itinerary</Text>
          <TouchableOpacity style={styles.iconBtn}>
            <Bell size={24} color="#172554" />
            <View style={styles.notifBadge} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

// Small Icon Helper
const CalendarIconSmall = () => (
  <View style={{ width: 14, height: 14, overflow: "hidden", marginRight: 6 }}>
    <View
      style={{
        width: 10,
        height: 12,
        borderWidth: 1.5,
        borderColor: "white",
        borderRadius: 2,
        marginTop: 1,
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f5", // zinc-100
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
    backgroundColor: "rgba(244, 244, 245, 0.9)", // Glass effect
    zIndex: 100,
  },
  headerContent: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#172554",
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
    shadowRadius: 10,
    elevation: 2,
  },
  notifBadge: {
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

  // --- Trip Card ---
  tripCardContainer: {
    marginHorizontal: 16,
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 10, // Adjust for header space
    position: "relative",
  },
  tripCardImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  tripCardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  tripCardContent: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  activeTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ef4444",
    marginRight: 6,
  },
  activeText: {
    color: "#ef4444",
    fontWeight: "700",
    fontSize: 12,
  },
  moreBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  tripInfoBottom: {
    marginBottom: 4,
  },
  tripTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 4,
  },
  tripDateRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  tripDateText: {
    color: "#fff",
    fontSize: 14,
  },

  // --- Details Section ---
  detailsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 16,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#172554", // cyan-950
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    gap: 4,
  },
  addBtnText: {
    color: "#fb923c",
    fontWeight: "700",
    fontSize: 12,
  },

  // --- Days Scroll ---
  daysScrollContainer: {
    height: 60,
    marginBottom: 20,
  },
  daysScrollView: {
    paddingLeft: 20,
  },
  dayChip: {
    width: 90,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    paddingLeft: 12,
    marginRight: 10,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },
  dayChipDate: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 2,
  },
  dayChipSub: {
    fontSize: 11,
    color: "#64748b",
  },
  textRed: { color: "#ef4444" },
  textGray: { color: "#172554" },
  fadeGradient: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 60,
    // Note: React Native needs a library for real gradients.
    // This is a solid workaround or use 'expo-linear-gradient'
    backgroundColor: "rgba(244,244,245,0.1)",
  },

  // --- Timeline ---
  timelineContainer: {
    paddingHorizontal: 16,
  },
  timelineDayMarker: {
    flexDirection: "row",
    height: 60, // Spacing for the day header
    alignItems: "flex-start",
  },
  timelineEventRow: {
    flexDirection: "row",
    marginBottom: 24,
    minHeight: 120,
  },
  timelineLeftCol: {
    width: 40,
    alignItems: "center",
  },
  dayDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 4,
    borderColor: "#fff",
    zIndex: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  eventDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#f5f5f5", // neutral-50
    borderWidth: 1,
    borderColor: "#cbd5e1",
    marginTop: 24, // Align with card top
    zIndex: 2,
  },
  verticalLine: {
    position: "absolute",
    top: 0,
    bottom: -30, // Connect to next item
    width: 2,
    backgroundColor: "#e2e8f0", // stone-300
    zIndex: 1,
  },
  dayMarkerTextContainer: {
    marginLeft: 10,
    justifyContent: "center",
    height: 20, // Align with dot
  },
  dayMarkerTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#172554",
  },
  dayMarkerDate: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },

  // --- Event Card ---
  eventCard: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff", // gray-100/white
    borderRadius: 16,
    padding: 0,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#f1f5f9",
    height: 120,
  },
  eventImageContainer: {
    width: 110,
    height: "100%",
  },
  eventImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  eventDetails: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#172554",
    marginBottom: 4,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  timeText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#475569",
  },
  showMapText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#172554",
    textDecorationLine: "underline",
    marginBottom: 4,
  },
  withPersonText: {
    fontSize: 11,
    color: "#fb923c", // approximate Field Color or Orange
    fontWeight: "500",
  },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
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
    borderColor: "#fb923c",
  },
  travelerTag: {
    marginLeft: 4,
    backgroundColor: "#fecdd3", // rose-200
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fb923c",
  },
  travelerTagText: {
    fontSize: 9,
    color: "#083344",
    fontWeight: "600",
  },
  chatContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  chatText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#94a3b8",
  },
  chatDot: {
    width: 3,
    height: 3,
    backgroundColor: "#cbd5e1",
    borderRadius: 1.5,
    marginHorizontal: 4,
  },

  // --- Bottom Tab Bar ---
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
    shadowOffset: { width: 0, height: -5 },
    elevation: 20,
  },
  tabItem: {
    alignItems: "center",
    gap: 6,
    width: 60,
  },
  tabItemActive: {
    backgroundColor: "#fff7ed", // orange-50
    borderRadius: 12,
    marginTop: -8, // slight lift
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
    color: "#64748b",
    fontWeight: "500",
  },
});
