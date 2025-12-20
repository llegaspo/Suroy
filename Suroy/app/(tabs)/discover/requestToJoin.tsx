import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import {
  ArrowLeft,
  Bell,
  MoreVertical,
  Calendar,
  MapPin,
  Banknote, // For Budget
  CheckCircle,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

export default function TripDetailsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const handleJoinRequest = () => {
    setModalVisible(true);
    setRequestSent(true);
  };
  return (
    <View style={styles.container}>
      {/* --- HEADER --- */}
      {/* Using absolute positioning to keep it floating at top like the design */}
      <View style={styles.headerContainer}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color="#172554" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>About Trip</Text>

            <TouchableOpacity style={styles.iconButton}>
              <Bell size={24} color="#172554" />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* --- HERO IMAGE SECTION --- */}
        <View style={styles.heroSection}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: "https://drive.google.com/uc?export=view&id=1F3fDsK-JilPeJGhbQ2DMBY-ZwrfyZ1dV",
              }}
              style={styles.heroImage}
            />

            {/* Active Badge */}
            <View style={styles.activeBadge}>
              <View style={styles.activeDot} />
              <Text style={styles.activeText}>Active</Text>
            </View>

            {/* Menu Button on Image */}
            <TouchableOpacity style={styles.imageMenuBtn}>
              <MoreVertical size={20} color="#475569" />
            </TouchableOpacity>
          </View>
        </View>

        {/* --- TRIP INFO --- */}
        <View style={styles.infoSection}>
          <Text style={styles.tripTitle}>Simala Shrine</Text>

          <View style={styles.rowItem}>
            <Text style={styles.memberCountText}>3 / 5 Members</Text>
          </View>

          <View style={styles.rowItem}>
            <Calendar size={14} color="#083344" style={{ marginRight: 6 }} />
            <Text style={styles.infoText}>
              February 3, 2025 - February 14, 2025
            </Text>
          </View>

          <View style={styles.rowItem}>
            <MapPin size={14} color="#083344" style={{ marginRight: 6 }} />
            <Text style={styles.infoText}>Sibonga, Cebu</Text>
          </View>

          <View style={styles.rowItem}>
            {/* Text representation of money icon from design */}
            <Text style={{ fontSize: 12, marginRight: 6 }}>💰</Text>
            <Text style={styles.infoText}>
              Budget Range: Php 6,500 - Php 15,000+
            </Text>
          </View>

          {/* Small Avatar Stack */}
          <View style={styles.smallAvatarStack}>
            {[1, 2, 3].map((_, index) => (
              <Image
                key={index}
                source={{
                  uri: "https://drive.google.com/uc?export=view&id=140lNYounbsJdkIk1HJcAFtp5nAEdI35r",
                }}
                style={[
                  styles.smallAvatar,
                  { marginLeft: index === 0 ? 0 : -10, zIndex: 5 - index },
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.divider} />

        {/* --- ABOUT SECTION --- */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>About the Trip</Text>
          <Text style={styles.bodyText}>
            This trip covers exploring the Northern Part of Cebu which is
            Bantayan Island! It’s going to be a 4-day travel so join if you are
            interested and you might know some other spots we can visit to 😁
          </Text>
        </View>

        {/* --- INTERESTS --- */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Interests</Text>
          <View style={styles.tagsContainer}>
            <InterestTag label="🛐 Worship" />
            <InterestTag label="🌿 Calm" />
            <InterestTag label="✝️ Religion" />
            <InterestTag label="👥 Group Travel" />
            <InterestTag label="🧭 Adventurous" />
          </View>
        </View>

        {/* --- TRAVELERS --- */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Travelers</Text>
          <Text style={styles.bodyText}>
            💗 3 out of 5 People have joined for this trip
          </Text>
          <View style={styles.largeAvatarRow}>
            {[1, 2, 3].map((_, i) => (
              <Image
                key={i}
                source={{
                  uri: "https://drive.google.com/uc?export=view&id=140lNYounbsJdkIk1HJcAFtp5nAEdI35r",
                }}
                style={styles.largeAvatar}
              />
            ))}
            {/* Blue dash from design */}
            <View style={styles.blueDash} />
          </View>
        </View>

        {/* --- MANAGED BY --- */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Managed By</Text>
          <View style={styles.adminRow}>
            <Image
              source={{
                uri: "https://drive.google.com/uc?export=view&id=1RWCh-PvPz9DDfnm0zqsajxRloX2ClhmI",
              }}
              style={styles.adminAvatar}
            />
            <View>
              <Text style={styles.adminName}>Veniboo</Text>
              <Text style={styles.adminRole}>Group Admin</Text>
            </View>
          </View>
        </View>

        {/* --- BOTTOM SPACER FOR FLOATING BUTTON --- */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* --- FOOTER BUTTON --- */}
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={[
            styles.joinButton,
            requestSent && styles.joinButtonDisabled, // Change style if sent
          ]}
          onPress={handleJoinRequest}
          disabled={requestSent} // Disable click if already sent
        >
          <Text style={styles.joinButtonText}>
            {requestSent ? "Request Pending..." : "Request to Join Group"}
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIconContainer}>
              <CheckCircle size={40} color="#fff" />
            </View>
            <Text style={styles.modalTitle}>Request Sent!</Text>
            <Text style={styles.modalMessage}>
              The group admin has been notified. Please wait for approval.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Got it</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Helper Component for Tags
const InterestTag = ({ label }) => (
  <View style={styles.tag}>
    <Text style={styles.tagText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F5", // zinc-100
  },
  // Header
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: "rgba(244, 244, 245, 0.9)", // Translucent zinc-100
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 60,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#172554", // blue-950
  },
  iconButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  notificationDot: {
    width: 8,
    height: 8,
    backgroundColor: "#ef4444",
    borderRadius: 4,
    position: "absolute",
    top: 8,
    right: 8,
    borderWidth: 1,
    borderColor: "#fff",
  },

  // Scroll Content
  scrollContent: {
    paddingTop: 110, // Space for the absolute header
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  // Hero Section
  heroSection: {
    marginBottom: 24,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#e5e7eb",
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  activeBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff", // Field-Color usually white/light
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    gap: 6,
  },
  activeDot: {
    width: 8,
    height: 8,
    backgroundColor: "#ef4444", // red-500
    borderRadius: 4,
  },
  activeText: {
    color: "#ef4444",
    fontSize: 14,
    fontWeight: "bold",
  },
  imageMenuBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 8,
  },

  // Info Section
  infoSection: {
    marginBottom: 20,
  },
  tripTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#083344", // cyan-950
    marginBottom: 8,
  },
  memberCountText: {
    fontSize: 14,
    color: "#083344",
    marginBottom: 8,
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  infoText: {
    fontSize: 12,
    color: "#083344",
    lineHeight: 18,
  },
  smallAvatarStack: {
    flexDirection: "row",
    marginTop: 12,
    paddingLeft: 4,
  },
  smallAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#F4F4F5",
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(239, 68, 68, 0.4)", // red-500/60 outline
    marginVertical: 16,
    marginHorizontal: 4,
  },

  // General Sections
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "600",
    color: "#083344",
    marginBottom: 12,
  },
  bodyText: {
    fontSize: 12,
    color: "#083344",
    lineHeight: 18,
    textAlign: "justify",
  },

  // Tags
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#fecdd3", // rose-200
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tagText: {
    fontSize: 14,
    color: "#083344",
    fontWeight: "500",
  },

  // Travelers
  largeAvatarRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 8,
  },
  largeAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#F4F4F5",
  },
  blueDash: {
    width: 10,
    height: 14,
    backgroundColor: "#172554", // blue-950
    marginLeft: "auto", // Push to right or adjust positioning
    marginRight: 20,
  },

  // Admin
  adminRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  adminAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  adminName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#083344",
  },
  adminRole: {
    fontSize: 12,
    color: "#083344",
  },

  // Footer Button
  footerContainer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
  },
  joinButton: {
    backgroundColor: "#fb923c", // orange-400
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#F4F4F5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  joinButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  joinButtonDisabled: {
    backgroundColor: "#94a3b8", // Gray color when disabled
    borderColor: "#cbd5e1",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dimmed background
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  modalIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: "#22c55e", // Success Green
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#172554",
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  modalButton: {
    width: "100%",
    backgroundColor: "#172554", // Dark Blue
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
