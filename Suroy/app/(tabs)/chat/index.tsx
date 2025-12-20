import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import {
  ChevronLeft,
  Search,
  Bell,
  Map,
  Compass,
  Mail,
  User,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function InboxScreen() {
  return (
    <View style={styles.container}>
      {/* --- Header --- */}
      <SafeAreaView>
        <View style={styles.header}>
          {/* <TouchableOpacity style={styles.iconButton}> */}
          {/*   <ChevronLeft size={24} color="#172554" /> */}
          {/* </TouchableOpacity> */}
          <Text style={styles.headerTitle}>Inbox</Text>
          <TouchableOpacity style={styles.iconButton}>
            <Search size={24} color="#172554" />
            <View style={styles.headerBadge} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* --- Tab Switcher --- */}
        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.tabActive}>
            <Text style={styles.tabTextActive}>Messages</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabInactive}>
            <Text style={styles.tabTextInactive}>Requests</Text>
            <View style={styles.requestBadge}>
              <Text style={styles.requestBadgeText}>7</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* --- Message List --- */}
        <View style={styles.listContainer}>
          {/* Item 1: Bantayan Island (Active/Highlighted) */}
          <View style={styles.messageItemActive}>
            <View style={styles.avatarContainer}>
              <Image
                source={{
                  uri: "https://drive.google.com/uc?export=view&id=1L_RPuyrC4vVNGP2MF0hCwBmUCrCxCWgf",
                }}
                style={styles.avatar}
              />
              <View style={styles.statusIndicatorContainer}>
                {/* Green Dot indicating online/active */}
                <View style={styles.greenDot} />
              </View>
            </View>

            <View style={styles.messageContent}>
              <View style={styles.rowBetween}>
                <Text style={styles.senderName}>Bantayan Island Travel</Text>
                <Text style={styles.timeText}>18:31</Text>
              </View>
              <View style={styles.rowBetween}>
                <Text style={styles.messageSnippet}>
                  Sent a Location Request
                </Text>
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadText}>5</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Item 2: Kawasan Falls */}
          <View style={styles.messageItem}>
            <View style={styles.avatarContainer}>
              <Image
                source={{
                  uri: "https://drive.google.com/uc?export=view&id=1tpL70Vs4B7jiOCTzlgt5eQgGm_tZncBc",
                }}
                style={styles.avatar}
              />
              <View style={styles.flagContainer}>
                <Text style={{ fontSize: 10 }}>🇸🇪</Text>
              </View>
            </View>

            <View style={styles.messageContent}>
              <View style={styles.rowBetween}>
                <Text style={styles.senderName}>Kawasan Falls Shower</Text>
                <Text style={styles.timeText}>Jan 23</Text>
              </View>
              <View style={styles.rowBetween}>
                <Text style={styles.messageSnippet}>Yes, that works!</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* --- Bottom Navigation --- */}
    </View>
  );
}

// Helper component for Bottom Nav Items
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F5", // zinc-100
  },
  scrollContent: {
    paddingBottom: 100, // Space for bottom nav
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "rgba(244, 244, 245, 0.9)",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ef4444", // red-500
    fontFamily: "System",
  },
  iconButton: {
    width: 44,
    height: 44,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  headerBadge: {
    width: 8,
    height: 8,
    backgroundColor: "#ef4444",
    borderRadius: 4,
    position: "absolute",
    top: 12,
    right: 12,
    borderWidth: 1,
    borderColor: "#fff",
  },

  // Tabs
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 17,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#f3f4f6", // gray-100
    padding: 6,
    borderRadius: 19,
    gap: 12,
  },
  tabActive: {
    flex: 1,
    backgroundColor: "#fb923c", // orange-400
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#030096",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 4,
  },
  tabInactive: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    gap: 8,
  },
  tabTextActive: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  tabTextInactive: {
    fontSize: 16,
    fontWeight: "500",
    color: "#64748b", // gray-500
  },
  requestBadge: {
    backgroundColor: "rgba(255,255,255,0.75)",
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  requestBadgeText: {
    fontSize: 12,
    color: "#475569",
    fontWeight: "600",
  },

  // List
  listContainer: {
    paddingHorizontal: 8,
  },
  messageItem: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
    alignItems: "center",
  },
  messageItemActive: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
    alignItems: "center",
    backgroundColor: "rgba(248, 113, 113, 0.1)", // red-400 opacity 10
  },
  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  statusIndicatorContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  greenDot: {
    width: 14,
    height: 14,
    backgroundColor: "#22c55e", // green-500
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#fff",
  },
  flagContainer: {
    position: "absolute",
    bottom: -4,
    right: -4,
    width: 20,
    height: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  messageContent: {
    flex: 1,
    justifyContent: "center",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  senderName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#172554", // blue-950
  },
  timeText: {
    fontSize: 12,
    color: "#27272a", // zinc-800
    opacity: 0.6,
  },
  messageSnippet: {
    fontSize: 14,
    color: "#475569", // slate-600
  },
  unreadBadge: {
    backgroundColor: "#ef4444", // red-500
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  unreadText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },

  // Bottom Nav
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: width,
    height: 90,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: 60,
  },
  activeNavBg: {
    position: "absolute",
    top: -20,
    width: 50,
    height: 50,
    backgroundColor: "#fff7ed", // orange-50 style highlight
    borderRadius: 25,
    zIndex: -1,
  },
  navLabel: {
    fontSize: 10,
    color: "#64748b",
  },
  navLabelActive: {
    color: "#ef4444",
  },
});
