import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import {
  Edit2,
  Trash2,
  Calendar,
  MapPin,
  MoreVertical,
  Lock,
} from "lucide-react-native";
import formatDateSimple from "@/lib/formatDate";
import { router } from "expo-router";

type TripData = {
  title: string;
  imageUri: string;
  startDate: Date;
  endDate: Date;
  location: string;
  maxBudget: number;
  minBudget: number;
  createdAt: Date;
  isComplete: Boolean;
  isActive: Boolean;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function TripCardForm({
  title,
  imageUri,
  startDate,
  endDate,
  location,
  maxBudget,
  minBudget,
  createdAt,
  isComplete,
  isActive,
  onEdit,
  onDelete,
}: TripData) {
  const [trip, setTrip] = useState<TripData>({
    title: "",
    imageUri: "",
    startDate: new Date(),
    endDate: new Date(),
    location: "",
    maxBudget: 0,
    minBudget: 0,
    createdAt: new Date(),
    isComplete: false,
    isActive: true,
  });

  const [submitted, setSubmitted] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleEditPress = () => {
    setShowMenu(false);
    if (onEdit) onEdit();
    else console.log("Edit pressed");
  };

  const handleDeletePress = () => {
    setShowMenu(false);
    if (onDelete) onDelete();
    else console.log("Delete pressed");
  };

  const themeColor = isComplete ? "#f97316" : "#ef4444"; // Orange if complete, Red if active

  // Handle input change
  const handleChange = (key: keyof TripData, value: string) => {
    setTrip({ ...trip, [key]: value });
  };

  // Simulate AI suggestion
  const generateAISuggestions = () => {
    return ["Nearby Beach", "Historical Church"];
  };

  // Submit form
  const handleSubmit = () => {
    // setTrip({ ...trip, aiSuggestions: generateAISuggestions() });
    setSubmitted(true);
  };

  // Reset form
  const handleEdit = () => setSubmitted(false);
  return (
    <View style={styles.cardContainer}>
      {/* <View style={styles.contentWrapper}> */}
      {/* 1. Card Image Header */}
      <View style={styles.cardHeader}>
        <Image source={{ uri: imageUri }} style={styles.cardImage} />

        {/* Overlay for Locked State */}
        {isLocked && (
          <View style={styles.lockedOverlay}>
            <View style={styles.lockIconContainer}>
              <Lock size={32} color="#fff" />
            </View>
          </View>
        )}

        {/* Active Badge */}
        {!isLocked && isActive && (
          <View style={styles.activeBadge}>
            <View style={styles.activeDot} />
            <Text style={styles.activeText}>Active</Text>
          </View>
        )}

        {/* Menu Button */}
        <TouchableOpacity style={styles.menuButton} onPress={handleShowMenu}>
          <MoreVertical size={16} color="#475569" />
        </TouchableOpacity>

        {showMenu && (
          <View style={styles.dropdownMenu}>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={handleEditPress}
            >
              <Edit2 size={14} color="#334155" />
              <Text style={styles.dropdownText}>Edit</Text>
            </TouchableOpacity>

            <View style={styles.dropdownDivider} />

            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={handleDeletePress}
            >
              <Trash2 size={14} color="#ef4444" />
              <Text style={[styles.dropdownText, { color: "#ef4444" }]}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* 2. Card Body: Title/Date + Travelers */}
      <View style={styles.cardBody}>
        <View style={styles.cardInfoRow}>
          {/* Left Side: Title & Date */}
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>{title}</Text>
            <View style={styles.cardDateRow}>
              <Calendar size={14} color="#334155" />
              <Text style={styles.cardDateText}>
                {formatDateSimple(startDate)}-{formatDateSimple(endDate)}
              </Text>
            </View>
          </View>

          {/* Right Side: Travelers Stack */}
          {!isLocked && (
            <View style={styles.travelerStack}>
              {[1, 2, 3].map((_, i) => (
                <Image
                  key={i}
                  // Placeholder for profile pictures
                  source={{
                    uri: `https://placehold.co/100x100/png?text=${i + 1}`,
                  }}
                  style={[styles.travelerAvatar, { left: i * 16, zIndex: i }]}
                />
              ))}
              <View style={[styles.moreTravelers, { left: 48, zIndex: 10 }]}>
                <Text style={styles.moreTravelersText}>2+</Text>
              </View>
            </View>
          )}
        </View>
      </View>
      {isComplete && <View style={styles.pastOverlay} />}
      {/* </View> */}

      {/* 3. Footer: View Itinerary (At the bottom) */}
      <View style={styles.cardFooter}>
        {isLocked ? (
          <TouchableOpacity style={styles.viewItineraryLocked}>
            <Text style={styles.viewItineraryTextLocked}>View Itinerary</Text>
            <Lock size={12} color="#ef4444" style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.viewItineraryBtn}
            onPress={() => router.push("/myTrips/itinerary")}
          >
            <MapPin size={12} color={themeColor} />
            <Text style={[styles.viewItineraryText, { color: themeColor }]}>
              View Itinerary
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
    // </View>
  );
}

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
    alignItems: "center",
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
    paddingHorizontal: 20,
    gap: 24,
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
    position: "relative",
  },
  cardHeader: {
    height: 140,
    width: "100%",
    position: "relative",
    // zIndex: 1,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  menuButton: {
    position: "absolute",
    top: 12, // Positions correctly over the image
    right: 12,
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 8,
    zIndex: 50, // CRITICAL: Higher than overlay (20)
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
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
    zIndex: 10,
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
    paddingBottom: 4,
    zIndex: 1,
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
    paddingBottom: 16,
    paddingHorizontal: 16,
    alignItems: "flex-start",
    backgroundColor: "#fff", // Vital: Hides the overlay behind it
    zIndex: 30, // Vital: Sits on top of the overlay (20)
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
    bottom: 110,
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
  dropdownMenu: {
    position: "absolute",
    top: 45, // Just below the menu button
    right: 12,
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 60, // Highest
    minWidth: 120,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#334155",
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginHorizontal: 8,
  },
  contentWrapper: {
    position: "relative",
  },
  pastOverlay: {
    ...StyleSheet.absoluteFillObject, // Covers the entire contentWrapper
    backgroundColor: "rgba(255, 255, 255, 0.6)", // White with 60% opacity
    zIndex: 20, // Sit on top of image and text
    pointerEvents: "none", // Allow clicks to pass through if needed (or 'auto' to block)
  },
});
