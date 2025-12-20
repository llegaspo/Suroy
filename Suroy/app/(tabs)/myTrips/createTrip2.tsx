import React, { useState, useMemo, useRef } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  LayoutAnimation,
  Platform,
  UIManager,
  Switch,
  StatusBar,
} from "react-native";
import {
  MapPin,
  Camera,
  Calendar as CalendarIcon,
  Plus,
  Info,
  Wallet,
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Clock,
  Sparkles,
  User,
  Users,
  Globe,
  Minus,
  AlertTriangle,
  Image as ImageIcon,
  CheckCircle2,
  ListFilter,
  ShieldCheck,
} from "lucide-react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { addTripCard, tripCardContent } from "@/service/routes/tripCard";
import { router } from "expo-router";

// Enable LayoutAnimation
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width, height } = Dimensions.get("window");

// CONSTANTS
const SHEET_START_PADDING = height * 0.6;

const COLORS = {
  primary: "#ef4444",
  secondary: "#06b6d4",
  dark: "#172554",
  gray: "#64748b",
  bg: "#f4f4f5",
  orange: "#fb923c",
  green200: "#bbf7d0",
  greenText: "#164e63",
  pillBg: "#fecaca",
  pillText: "#083344",
  white: "#ffffff",
  border: "#e2e8f0",
  slate700: "#334155",
  slate600: "#475569",
};

const SelectionChip = ({ label, icon, selected, onPress }: any) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.chip,
      selected ? styles.chipSelected : styles.chipUnselected,
    ]}
  >
    <Text
      style={[
        styles.chipText,
        selected ? styles.chipTextSelected : styles.chipTextUnselected,
      ]}
    >
      {icon} {label}
    </Text>
  </TouchableOpacity>
);

export default function CreateTripScreen() {
  const insets = useSafeAreaInsets();
  const [activeStep, setActiveStep] = useState(0);

  const verticalScrollRef = useRef<ScrollView>(null);

  // --- STATE ---
  const [inputText, setInputText] = useState("");
  const [addedPlaces, setAddedPlaces] = useState<string[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 1, 1));
  const [startDate, setStartDate] = useState<number | null>(null);
  const [endDate, setEndDate] = useState<number | null>(null);
  const [budgetType, setBudgetType] = useState<"Budget" | "Mid" | "Premium">(
    "Mid",
  );
  const [availability, setAvailability] = useState(["Morning"]);
  const [interests, setInterests] = useState(["Mountains"]);
  const [aiEnabled, setAiEnabled] = useState(false);
  const [notes, setNotes] = useState("");
  const [coverPhoto, setCoverPhoto] = useState(null);

  // --- STATE FOR STEP 3 (GROUP) ---
  const [travelerCount, setTravelerCount] = useState(1);
  // NEW: States to record Group Setup inputs
  const [travelGroupType, setTravelGroupType] = useState<
    "Solo" | "Friends" | "Open"
  >("Friends");
  const [privacySetting, setPrivacySetting] = useState<"Public" | "Private">(
    "Public",
  );
  const [joinSetting, setJoinSetting] = useState<"Anyone" | "Invite">("Anyone");

  // --- HANDLERS ---
  const handleAddPlace = () => {
    if (inputText.trim().length > 0) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setAddedPlaces([...addedPlaces, inputText]);
      setInputText("");
    }
  };

  const handleRemovePlace = (indexToRemove: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAddedPlaces(addedPlaces.filter((_, index) => index !== indexToRemove));
  };

  const toggleSelection = (item: string, list: string[], setList: Function) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9], // Widescreen aspect ratio for cover photos
      quality: 1,
    });

    if (!result.canceled) {
      setCoverPhoto(result.assets[0].uri);
    }
  };

  const handleSaveAndContinue = () => {
    // UPDATED: Allow up to step 3 (0, 1, 2, 3)
    if (activeStep < 3) {
      // Smoothly animate the height change between steps
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      const nextStep = activeStep + 1;
      setActiveStep(nextStep);

      // Scroll vertical view to top of form so the new step is seen clearly
      const topOfFormY = SHEET_START_PADDING - insets.top - 20;
      verticalScrollRef.current?.scrollTo({
        y: topOfFormY,
        animated: true,
      });
    } else {
      // Final Action
      alert("Trip and Itinerary Created Successfully!");
    }
  };

  const getStepperWidth = () => {
    const containerW = width - 48; // PaddingHorizontal 24 * 2
    switch (activeStep) {
      case 0:
        return 20;
      case 1:
        return containerW * 0.33;
      case 2:
        return containerW * 0.66;
      case 3:
        return containerW; // Full width
      default:
        return 20;
    }
  };

  const handleCreateNewTrip = async () => {
    try {
      console.log("place", addedPlaces[0]);
      await addTripCard({
        id: "a0",
        title: "Bantayan Trip",
        imageUri:
          coverPhoto ||
          "https://drive.google.com/uc?export=view&id=1L_RPuyrC4vVNGP2MF0hCwBmUCrCxCWgf",
        location: addedPlaces[0],
        startDate: new Date("2025-12-21"),
        endDate: new Date("2025-12-25"),
        createdAt: currentDate,
        minBudget: 0,
        maxBudget: 0,
        isComplete: false,
        isActive: true,
      });

      router.replace("/myTrips");
    } catch (e) {
      console.error(e);
    }
  };

  const budgetData = useMemo(() => {
    switch (budgetType) {
      case "Budget":
        return { min: "1,000", max: "2,500", left: "0%", right: "70%" };
      case "Mid":
        return { min: "2,500", max: "6,000", left: "20%", right: "40%" };
      case "Premium":
        return { min: "6,000", max: "15,000+", left: "50%", right: "0%" };
    }
  }, [budgetType]);

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  };

  const handleDayPress = (day: number) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
    } else if (day > startDate) {
      setEndDate(day);
    } else {
      setStartDate(day);
    }
  };

  // --- BACK HANDLER ---
  const handleBack = () => {
    if (activeStep > 0) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setActiveStep(activeStep - 1);
      const topOfFormY = SHEET_START_PADDING - insets.top - 20;
      verticalScrollRef.current?.scrollTo({
        y: topOfFormY,
        animated: true,
      });
    } else {
      console.log("Navigate back to Home Screen");
    }
  };

  // --- RENDER CONTENT BASED ON ACTIVE STEP ---
  const renderStepContent = () => {
    switch (activeStep) {
      // STEP 1: DETAILS
      case 0:
        return (
          <View>
            {/* Place */}
            <View style={styles.sectionContainer}>
              <View style={styles.iconLabelRow}>
                <MapPin size={20} color={COLORS.gray} />
                <Text style={styles.fieldLabel}>Place</Text>
              </View>
              <View style={styles.inputCard}>
                <View style={styles.inputWrapper}>
                  <Text style={styles.flagIcon}>🇵🇭</Text>
                  <TextInput
                    style={styles.textInput}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Enter destination"
                    placeholderTextColor={COLORS.gray}
                  />
                </View>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={handleAddPlace}
                >
                  <Plus size={20} color={COLORS.orange} />
                  <Text style={styles.addText}>ADD</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.tagsContainer}>
                {addedPlaces.map((place, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.greenTag}
                    onPress={() => handleRemovePlace(index)}
                  >
                    <Text style={styles.greenTagText}>{place}</Text>
                    <X
                      size={14}
                      color={COLORS.greenText}
                      style={{ marginLeft: 4, opacity: 0.7 }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Date */}
            <View style={[styles.sectionContainer, { marginTop: 24 }]}>
              <View style={styles.iconLabelRow}>
                <CalendarIcon size={20} color={COLORS.gray} />
                <Text style={styles.fieldLabel}>Date</Text>
              </View>
              <View style={styles.calendarControlRow}>
                <TouchableOpacity style={styles.pillButtonActive}>
                  <Text style={styles.pillTextWhite}>Calendar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.pillButton}>
                  <Text style={styles.pillTextOrange}>I’m Flexible</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.calendarCard}>
                <View style={styles.calendarHeader}>
                  <Text style={styles.monthTitle}>
                    {currentDate.toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </Text>
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <ChevronLeft size={20} color={COLORS.dark} />
                    <ChevronRight size={20} color={COLORS.dark} />
                  </View>
                </View>
                <View style={styles.gridRow}>
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day, index) => (
                      <Text
                        key={index}
                        style={[
                          styles.dayLabel,
                          (index === 0 || index === 6) && {
                            color: COLORS.primary,
                          },
                        ]}
                      >
                        {day}
                      </Text>
                    ),
                  )}
                </View>
                <View style={styles.gridContainer}>
                  {generateCalendar().map((day, index) => {
                    if (!day)
                      return <View key={index} style={styles.dateCell} />;
                    const isStart = day === startDate;
                    const isEnd = day === endDate;
                    const isInRange =
                      startDate && endDate && day > startDate && day < endDate;
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleDayPress(day)}
                        style={[
                          styles.dateCell,
                          isInRange && styles.dateCellRange,
                          isStart && styles.dateCellSelectedLeft,
                          isEnd && styles.dateCellSelectedRight,
                        ]}
                      >
                        <Text
                          style={[
                            styles.dateText,
                            (isStart || isEnd) && {
                              color: "white",
                              fontWeight: "bold",
                            },
                            isInRange && { color: COLORS.orange },
                          ]}
                        >
                          {day}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </View>

            {/* About & Budget */}
            <View style={[styles.sectionContainer, { marginTop: 24 }]}>
              <View style={styles.iconLabelRow}>
                <Info size={20} color={COLORS.gray} />
                <Text style={styles.fieldLabel}>About Trip</Text>
              </View>
              <View style={styles.textAreaContainer}>
                <TextInput
                  multiline
                  placeholder="Trip details..."
                  style={styles.textArea}
                />
              </View>
            </View>
            <View
              style={[
                styles.sectionContainer,
                { marginTop: 24, marginBottom: 40 },
              ]}
            >
              <View style={styles.iconLabelRow}>
                <Wallet size={20} color={COLORS.gray} />
                <Text style={styles.fieldLabel}>Budget Range</Text>
              </View>
              <View style={styles.sliderContainer}>
                <Text style={styles.sliderLabelLeft}>Php {budgetData.min}</Text>
                <Text style={styles.sliderLabelRight}>
                  Php {budgetData.max}
                </Text>
                <View style={styles.sliderTrack}>
                  <View
                    style={[
                      styles.sliderRange,
                      { left: budgetData.left, right: budgetData.right },
                    ]}
                  />
                  <View
                    style={[styles.sliderKnob, { left: budgetData.left }]}
                  />
                  <View
                    style={[styles.sliderKnob, { right: budgetData.right }]}
                  />
                </View>
              </View>
              <View style={styles.chipRow}>
                {["Budget", "Mid", "Premium"].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.chipSimple,
                      budgetType === type && styles.chipSimpleActive,
                    ]}
                    onPress={() => setBudgetType(type as any)}
                  >
                    <Text
                      style={[
                        styles.chipTextSimple,
                        budgetType === type && styles.chipTextSimpleActive,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveAndContinue}
            >
              <Text style={styles.saveButtonText}>Save and Continue</Text>
              <ChevronRight size={20} color="white" />
            </TouchableOpacity>
          </View>
        );

      // STEP 2: PREFERENCES
      case 1:
        return (
          <View>
            <View style={styles.sectionContainer}>
              <View style={styles.iconLabelRow}>
                <Clock size={20} color={COLORS.gray} />
                <Text style={styles.fieldLabel}>Daily Availability</Text>
              </View>
              <Text style={styles.helperText}>
                Select when you’re usually available during this trip
              </Text>
              <View style={styles.chipGrid}>
                {[
                  "Morning",
                  "Afternoon",
                  "Evening",
                  "Full Day",
                  "Flexible",
                ].map((item) => (
                  <SelectionChip
                    key={item}
                    label={item}
                    icon={
                      item === "Morning"
                        ? "☀️"
                        : item === "Afternoon"
                          ? "🌇"
                          : item === "Evening"
                            ? "🌑"
                            : item === "Full Day"
                              ? "🌥️"
                              : "💭"
                    }
                    selected={availability.includes(item)}
                    onPress={() =>
                      toggleSelection(item, availability, setAvailability)
                    }
                  />
                ))}
              </View>
            </View>

            <View style={[styles.sectionContainer, { marginTop: 24 }]}>
              <View style={styles.iconLabelRow}>
                <Heart size={20} color={COLORS.gray} />
                <Text style={styles.fieldLabel}>
                  What are you excited about?
                </Text>
              </View>
              <Text style={styles.helperText}>
                Choose what you want to prioritize for this trip
              </Text>
              <View style={styles.chipGrid}>
                {[
                  { l: "Beach", i: "🌊" },
                  { l: "Mountains", i: "⛰️" },
                  { l: "Food Trips", i: "🥥" },
                  { l: "Adventure", i: "🥾" },
                  { l: "Nature", i: "🌴" },
                  { l: "Waterfalls", i: "🏞️" },
                  { l: "Churches", i: "⛪" },
                  { l: "Cultural Sites", i: "🏛️" },
                ].map((item) => (
                  <SelectionChip
                    key={item.l}
                    label={item.l}
                    icon={item.i}
                    selected={interests.includes(item.l)}
                    onPress={() =>
                      toggleSelection(item.l, interests, setInterests)
                    }
                  />
                ))}
              </View>
            </View>

            <View style={[styles.sectionContainer, { marginTop: 24 }]}>
              <View style={styles.iconLabelRow}>
                <MapPin size={20} color={COLORS.gray} />
                <Text style={styles.fieldLabel}>
                  Places you have loved before
                </Text>
              </View>
              <Text style={styles.helperText}>
                This helps us suggest places with a similar vibe
              </Text>
              <View style={styles.textAreaContainer}>
                <TextInput
                  style={styles.textArea}
                  multiline
                  value={notes}
                  onChangeText={setNotes}
                  placeholder="Tell us about places you liked..."
                />
              </View>
            </View>

            <View
              style={[styles.toggleRow, { marginTop: 24, marginBottom: 40 }]}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <Sparkles size={20} color={COLORS.secondary} />
                <Text style={[styles.fieldLabel, { fontSize: 14 }]}>
                  Let AI suggest nearby destinations
                </Text>
              </View>
              <Switch
                trackColor={{ false: "#767577", true: COLORS.green200 }}
                thumbColor={aiEnabled ? COLORS.greenText : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setAiEnabled}
                value={aiEnabled}
              />
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveAndContinue}
            >
              <Text style={styles.saveButtonText}>Save and Continue</Text>
              <ChevronRight size={20} color="white" />
            </TouchableOpacity>
          </View>
        );

      // STEP 3: GROUP SETUP
      case 2:
        return (
          <View>
            <View style={styles.sectionHeader}>
              <View style={styles.iconBox}>
                <Users size={20} color={COLORS.slate600} />
              </View>
              <View>
                <Text style={styles.sectionTitle}>Group & Privacy</Text>
                <Text style={styles.sectionSubtitle}>
                  Choose how you want to travel and who can join your trip
                </Text>
              </View>
            </View>

            {/* Travel Type Cards (Now with Selection State) */}
            <View style={styles.cardRow}>
              {/* Solo */}
              <TouchableOpacity
                style={[
                  styles.selectionCard,
                  travelGroupType === "Solo" && styles.selectionCardActive,
                ]}
                onPress={() => setTravelGroupType("Solo")}
              >
                <User
                  size={20}
                  color={
                    travelGroupType === "Solo"
                      ? COLORS.primary
                      : COLORS.slate700
                  }
                  style={styles.cardIcon}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>Solo Trip</Text>
                  <Text style={[styles.cardDesc, { marginTop: 6 }]}>
                    Travel alone
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Friends */}
              <TouchableOpacity
                style={[
                  styles.selectionCard,
                  travelGroupType === "Friends" && styles.selectionCardActive,
                ]}
                onPress={() => setTravelGroupType("Friends")}
              >
                <Users
                  size={20}
                  color={
                    travelGroupType === "Friends"
                      ? COLORS.primary
                      : COLORS.slate700
                  }
                  style={styles.cardIcon}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>Group with Friends</Text>
                  <Text style={[styles.cardDesc, { marginTop: 6 }]}>
                    Invite people you already know
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Open Group */}
              <TouchableOpacity
                style={[
                  styles.selectionCard,
                  travelGroupType === "Open" && styles.selectionCardActive,
                ]}
                onPress={() => setTravelGroupType("Open")}
              >
                <Globe
                  size={20}
                  color={
                    travelGroupType === "Open"
                      ? COLORS.primary
                      : COLORS.slate700
                  }
                  style={styles.cardIcon}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>Open Group</Text>
                  <Text style={[styles.cardDesc, { marginTop: 6 }]}>
                    Meet new travelers with similar trips
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Counter */}
            <View style={styles.counterRow}>
              <Text style={styles.labelLarge}>Total number of travelers</Text>
              <View style={styles.counterControl}>
                <TouchableOpacity
                  style={styles.counterBtn}
                  onPress={() =>
                    setTravelerCount((prev) => Math.max(1, prev - 1))
                  }
                >
                  <Minus size={16} color="white" />
                </TouchableOpacity>
                <Text style={styles.counterValue}>{travelerCount}</Text>
                <TouchableOpacity
                  style={styles.counterBtn}
                  onPress={() => setTravelerCount((prev) => prev + 1)}
                >
                  <Plus size={16} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Privacy Settings (Now with Selection State) */}
            <View style={styles.settingSection}>
              <Text style={styles.labelLarge}>Who can see this trip?</Text>
              <View style={styles.optionRow}>
                <TouchableOpacity
                  style={[
                    styles.optionBox,
                    privacySetting === "Public" && styles.optionBoxActive,
                  ]}
                  onPress={() => setPrivacySetting("Public")}
                >
                  <Text
                    style={[
                      styles.optionTitle,
                      privacySetting === "Public" && styles.optionTitleActive,
                    ]}
                  >
                    Public
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.optionBox,
                    privacySetting === "Private" && styles.optionBoxActive,
                  ]}
                  onPress={() => setPrivacySetting("Private")}
                >
                  <Text
                    style={[
                      styles.optionTitle,
                      privacySetting === "Private" && styles.optionTitleActive,
                    ]}
                  >
                    Private
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.settingSection}>
              <Text style={styles.labelLarge}>Who can request to join?</Text>
              <View style={styles.optionRow}>
                <TouchableOpacity
                  style={[
                    styles.optionBox,
                    joinSetting === "Anyone" && styles.optionBoxActive,
                  ]}
                  onPress={() => setJoinSetting("Anyone")}
                >
                  <Text
                    style={[
                      styles.optionTitle,
                      joinSetting === "Anyone" && styles.optionTitleActive,
                    ]}
                  >
                    Anyone can request
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.optionBox,
                    joinSetting === "Invite" && styles.optionBoxActive,
                  ]}
                  onPress={() => setJoinSetting("Invite")}
                >
                  <Text
                    style={[
                      styles.optionTitle,
                      joinSetting === "Invite" && styles.optionTitleActive,
                    ]}
                  >
                    Invite only
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Cover Photo */}
            <View style={styles.settingSection}>
              <Text style={styles.labelLarge}>Trip Cover Photo</Text>
              <Text style={styles.sectionSubtitle}>
                Use a photo that represents the destination
              </Text>

              <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
                <View style={styles.coverPhotoContainer}>
                  {coverPhoto ? (
                    // IF PHOTO EXISTS: Show the image
                    <Image
                      source={{ uri: coverPhoto }}
                      style={styles.coverPhoto}
                      resizeMode="cover"
                    />
                  ) : (
                    // IF NO PHOTO: Show placeholder UI
                    <View
                      style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Camera size={32} color={COLORS.gray} />
                      <Text
                        style={{
                          marginTop: 8,
                          color: COLORS.gray,
                          fontSize: 12,
                        }}
                      >
                        Tap to upload cover image
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>

              {/* Change Photo Button (Visual helper) */}
              <TouchableOpacity
                style={styles.changePhotoBtn}
                onPress={pickImage}
              >
                <Text style={styles.changePhotoText}>
                  {coverPhoto ? "Change Photo" : "Select from Gallery"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Safety Warning */}
            <View style={styles.safetyContainer}>
              <View style={styles.safetyHeader}>
                <AlertTriangle size={20} color={COLORS.primary} />
                <Text style={styles.safetyTitle}>Safety Reminder</Text>
              </View>
              <Text style={styles.safetyText}>
                All members must have a Suroy account. You can remove members or
                report issues anytime.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveAndContinue}
            >
              <Text style={styles.saveButtonText}>Save and Review</Text>
              <ChevronRight size={20} color="white" />
            </TouchableOpacity>

            <View style={{ height: 40 }} />
          </View>
        );

      // STEP 4: REVIEW
      case 3:
        return (
          <View>
            <View style={styles.sectionHeader}>
              <View
                style={[styles.iconBox, { backgroundColor: COLORS.green200 }]}
              >
                <CheckCircle2 size={24} color={COLORS.greenText} />
              </View>
              <View>
                <Text style={styles.sectionTitle}>Review Your Trip</Text>
                <Text style={styles.sectionSubtitle}>
                  Ready to go? Double check the details below.
                </Text>
              </View>
            </View>

            {/* REVIEW SECTION: DETAILS */}
            <View style={styles.summaryCard}>
              <Text style={styles.summarySectionTitle}>The Basics</Text>

              <View style={styles.summaryRow}>
                <View style={styles.summaryIconBox}>
                  <MapPin size={18} color={COLORS.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.summaryLabel}>Destination</Text>
                  {addedPlaces.length > 0 ? (
                    <Text style={styles.summarySubValue}>
                      + {addedPlaces.join(", ")}
                    </Text>
                  ) : (
                    <Text style={styles.summaryValue}>
                      {inputText || "No specific destination entered"}
                    </Text>
                  )}
                </View>
              </View>

              <View style={styles.summaryDivider} />

              <View style={styles.summaryRow}>
                <View style={styles.summaryIconBox}>
                  <CalendarIcon size={18} color={COLORS.orange} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.summaryLabel}>Dates</Text>
                  <Text style={styles.summaryValue}>
                    {startDate && endDate
                      ? `${new Date(2025, 1, startDate).toLocaleDateString()} - ${new Date(2025, 1, endDate).toLocaleDateString()}`
                      : "Flexible Dates"}
                  </Text>
                </View>
              </View>

              <View style={styles.summaryDivider} />

              <View style={styles.summaryRow}>
                <View style={styles.summaryIconBox}>
                  <Wallet size={18} color={COLORS.secondary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.summaryLabel}>Budget</Text>
                  <Text style={styles.summaryValue}>{budgetType} Tier</Text>
                  <Text style={styles.summarySubValue}>
                    Php {budgetData.min} - {budgetData.max}
                  </Text>
                </View>
              </View>
            </View>

            {/* REVIEW SECTION: GROUP */}
            <View style={[styles.summaryCard, { marginTop: 16 }]}>
              <Text style={styles.summarySectionTitle}>Group & Privacy</Text>

              <View style={styles.summaryRow}>
                <View style={styles.summaryIconBox}>
                  <Users size={18} color={COLORS.slate600} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.summaryLabel}>Group Type</Text>
                  <Text style={styles.summaryValue}>
                    {travelGroupType} Trip • {travelerCount} Traveler(s)
                  </Text>
                </View>
              </View>

              <View style={styles.summaryDivider} />

              <View style={styles.summaryRow}>
                <View style={styles.summaryIconBox}>
                  <ShieldCheck size={18} color={COLORS.slate600} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.summaryLabel}>Privacy</Text>
                  <Text style={styles.summaryValue}>
                    {privacySetting} Visibility
                  </Text>
                  <Text style={styles.summarySubValue}>
                    Joining: {joinSetting}
                  </Text>
                </View>
              </View>
            </View>

            {/* REVIEW SECTION: PREFERENCES */}
            <View style={[styles.summaryCard, { marginTop: 16 }]}>
              <Text style={styles.summarySectionTitle}>Your Vibe</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {interests.map((interest) => (
                  <View key={interest} style={styles.miniTag}>
                    <Text style={styles.miniTagText}>{interest}</Text>
                  </View>
                ))}
                {availability.map((avail) => (
                  <View
                    key={avail}
                    style={[styles.miniTag, { backgroundColor: "#e0f2fe" }]}
                  >
                    <Text style={[styles.miniTagText, { color: "#0284c7" }]}>
                      {avail}
                    </Text>
                  </View>
                ))}
              </View>
              {aiEnabled && (
                <View style={styles.aiBadge}>
                  <Sparkles size={14} color={COLORS.greenText} />
                  <Text style={styles.aiBadgeText}>AI Suggestions On</Text>
                </View>
              )}
            </View>

            <TouchableOpacity
              style={[styles.saveButton, { backgroundColor: COLORS.primary }]}
              onPress={handleCreateNewTrip}
            >
              <Text style={styles.saveButtonText}>Create Trip</Text>
              <CheckCircle2 size={20} color="white" />
            </TouchableOpacity>

            <View style={{ height: 40 }} />
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image
        source={{
          uri: "https://drive.google.com/uc?export=view&id=1Zy7GUnS07EGxBVrb6vj8InEQ8ErJw4S6",
        }}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <SafeAreaView style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ChevronLeft size={24} color={COLORS.dark} />
        </TouchableOpacity>
      </SafeAreaView>

      <ScrollView
        ref={verticalScrollRef}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: SHEET_START_PADDING },
        ]}
        showsVerticalScrollIndicator={false}
        bounces={false}
        snapToOffsets={[SHEET_START_PADDING - insets.top - 20]}
        snapToEnd={false}
        decelerationRate="fast"
      >
        <View style={styles.sheetContainer}>
          <View style={styles.handleBar} />

          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Create a Trip</Text>
            {/* <TouchableOpacity> */}
            {/* <X size={24} color={COLORS.gray} /> */}
            {/* </TouchableOpacity> */}
          </View>

          <View style={styles.stepperContainer}>
            <View style={styles.stepperLineBase} />
            <View
              style={[styles.stepperLineActive, { width: getStepperWidth() }]}
            />
            {/* Dot 1 */}
            <View
              style={[
                styles.stepDot,
                {
                  left: 20,
                  borderColor: COLORS.secondary,
                  backgroundColor: COLORS.white,
                },
              ]}
            >
              <View
                style={[styles.innerDot, { backgroundColor: COLORS.secondary }]}
              />
            </View>
            {/* Dot 2 */}
            <View
              style={[
                styles.stepDot,
                {
                  left: "33%",
                  marginLeft: -10,
                  borderColor:
                    activeStep >= 1 ? COLORS.secondary : COLORS.border,
                  backgroundColor: COLORS.white,
                },
              ]}
            >
              {activeStep >= 1 && (
                <View
                  style={[
                    styles.innerDot,
                    { backgroundColor: COLORS.secondary },
                  ]}
                />
              )}
            </View>
            {/* Dot 3 */}
            <View
              style={[
                styles.stepDot,
                {
                  left: "66%",
                  marginLeft: -10,
                  borderColor:
                    activeStep >= 2 ? COLORS.secondary : COLORS.border,
                  backgroundColor: COLORS.white,
                },
              ]}
            >
              {activeStep >= 2 && (
                <View
                  style={[
                    styles.innerDot,
                    { backgroundColor: COLORS.secondary },
                  ]}
                />
              )}
            </View>
            {/* Dot 4 */}
            <View
              style={[
                styles.stepDot,
                {
                  right: 20,
                  borderColor:
                    activeStep >= 3 ? COLORS.secondary : COLORS.border,
                  backgroundColor: COLORS.white,
                },
              ]}
            >
              {activeStep >= 3 && (
                <View
                  style={[
                    styles.innerDot,
                    { backgroundColor: COLORS.secondary },
                  ]}
                />
              )}
            </View>
            <View style={styles.stepLabels}>
              <Text
                style={[
                  styles.stepText,
                  activeStep >= 0 && styles.stepTextActive,
                ]}
              >
                Details
              </Text>
              <Text
                style={[
                  styles.stepText,
                  activeStep >= 1 && styles.stepTextActive,
                ]}
              >
                Prefs
              </Text>
              <Text
                style={[
                  styles.stepText,
                  activeStep >= 2 && styles.stepTextActive,
                ]}
              >
                Group
              </Text>
              <Text
                style={[
                  styles.stepText,
                  activeStep >= 3 && styles.stepTextActive,
                ]}
              >
                Review
              </Text>
            </View>
          </View>

          {/* MAIN FORM CONTENT - RENDERED DIRECTLY (No Horizontal ScrollView) */}
          <View style={{ paddingBottom: 30 }}>{renderStepContent()}</View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height * 0.7,
  },
  backButtonContainer: { position: "absolute", top: 20, left: 20, zIndex: 10 },
  backButton: {
    width: 44,
    height: 44,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingBottom: 0,
  },
  sheetContainer: {
    backgroundColor: COLORS.bg,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    minHeight: height * 0.6,
    paddingTop: 20,
    paddingHorizontal: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  handleBar: {
    width: 60,
    height: 6,
    backgroundColor: COLORS.dark,
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerTitle: { fontSize: 24, fontWeight: "600", color: COLORS.primary },

  // Stepper
  stepperContainer: { height: 40, justifyContent: "center", marginBottom: 30 },
  stepperLineBase: {
    height: 2,
    backgroundColor: COLORS.border,
    width: "100%",
    position: "absolute",
    top: 10,
  },
  stepperLineActive: {
    height: 4,
    backgroundColor: COLORS.secondary,
    position: "absolute",
    top: 9,
    left: 0,
    borderRadius: 2,
  },
  stepLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  stepText: {
    fontSize: 10,
    color: COLORS.gray,
    width: 60,
    textAlign: "center",
  },
  stepTextActive: {
    color: COLORS.primary,
    fontWeight: "bold",
    width: 60,
    textAlign: "center",
  },
  stepDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    position: "absolute",
    top: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerDot: { width: 10, height: 10, borderRadius: 5 },

  // --- GENERAL SECTION STYLES ---
  sectionContainer: { marginBottom: 10 },
  iconLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 10,
  },
  fieldLabel: { fontSize: 18, fontWeight: "600", color: COLORS.gray },
  helperText: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: -8,
    marginBottom: 12,
    marginLeft: 30,
  },

  // --- INPUT CARD (PLACE) ---
  inputCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    paddingLeft: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  inputWrapper: { flexDirection: "row", alignItems: "center", flex: 1 },
  flagIcon: { fontSize: 20, marginRight: 10 },
  textInput: {
    fontSize: 16,
    color: COLORS.dark,
    flex: 1,
    paddingVertical: 8,
  },
  addButton: {
    backgroundColor: "#fff7ed",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: "#ffedd5",
  },
  addText: { fontSize: 12, fontWeight: "bold", color: COLORS.orange },

  // --- TAGS ---
  tagsContainer: { flexDirection: "row", flexWrap: "wrap", marginTop: 12 },
  greenTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.green200,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  greenTagText: { fontSize: 14, color: COLORS.greenText, fontWeight: "500" },

  // --- CALENDAR ---
  calendarControlRow: { flexDirection: "row", gap: 10, marginBottom: 16 },
  pillButtonActive: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  pillButton: {
    backgroundColor: "#fff7ed",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  pillTextWhite: { color: "#fff", fontWeight: "600" },
  pillTextOrange: { color: COLORS.orange, fontWeight: "600" },

  calendarCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  monthTitle: { fontSize: 16, fontWeight: "bold", color: COLORS.dark },
  gridRow: { flexDirection: "row", justifyContent: "space-between" },
  dayLabel: {
    width: 40,
    textAlign: "center",
    fontSize: 12,
    color: COLORS.gray,
    marginBottom: 10,
  },
  gridContainer: { flexDirection: "row", flexWrap: "wrap" },
  dateCell: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 2,
  },
  dateCellRange: { backgroundColor: "#fff7ed" },
  dateCellSelectedLeft: {
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
  },
  dateCellSelectedRight: {
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  dateText: { fontSize: 14, color: COLORS.dark },

  // --- TEXT AREA ---
  textAreaContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    height: 100,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  textArea: { fontSize: 14, color: COLORS.dark, textAlignVertical: "top" },

  // --- SLIDER & CHIPS ---
  sliderContainer: {
    height: 40,
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  sliderLabelLeft: {
    position: "absolute",
    left: 0,
    top: -20,
    fontSize: 12,
    color: COLORS.gray,
  },
  sliderLabelRight: {
    position: "absolute",
    right: 0,
    top: -20,
    fontSize: 12,
    color: COLORS.gray,
  },
  sliderTrack: {
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    width: "100%",
  },
  sliderRange: {
    position: "absolute",
    top: 0,
    bottom: 0,
    backgroundColor: COLORS.primary,
  },
  sliderKnob: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: COLORS.primary,
    top: -8,
    marginLeft: -10,
  },
  chipRow: { flexDirection: "row", gap: 8 },
  chipSimple: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "#fff",
  },
  chipSimpleActive: {
    backgroundColor: COLORS.pillBg,
    borderColor: COLORS.pillBg,
  },
  chipTextSimple: { fontSize: 14, color: COLORS.gray },
  chipTextSimpleActive: { color: COLORS.pillText, fontWeight: "600" },

  // --- BUTTONS ---
  saveButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
    marginTop: 10,
  },
  saveButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },

  // --- CHIP GRID (PREFERENCES) ---
  chipGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "#fff",
  },
  chipSelected: { backgroundColor: COLORS.pillBg, borderColor: COLORS.pillBg },
  chipUnselected: { backgroundColor: "#fff" },
  chipText: { fontSize: 14 },
  chipTextSelected: { color: COLORS.pillText, fontWeight: "600" },
  chipTextUnselected: { color: COLORS.gray },

  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // --- STEP 3 & 4 STYLES ---
  sectionHeader: { flexDirection: "row", marginBottom: 20, gap: 12 },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: COLORS.dark },
  sectionSubtitle: {
    fontSize: 12,
    color: COLORS.gray,
    maxWidth: 250,
    marginTop: 2,
  },
  labelLarge: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.dark,
    marginBottom: 12,
  },
  cardRow: { gap: 12, marginBottom: 24 },
  selectionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectionCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: "#fff1f2",
  },
  cardIcon: { marginRight: 12 },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.dark,
    marginBottom: 2,
  },
  cardDesc: { fontSize: 12, color: COLORS.gray },
  counterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  counterControl: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.dark,
    borderRadius: 12,
    padding: 4,
  },
  counterBtn: { padding: 8 },
  counterValue: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    width: 30,
    textAlign: "center",
  },
  settingSection: { marginBottom: 32 },
  optionRow: { flexDirection: "row", gap: 12 },
  optionBox: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    alignItems: "center",
  },
  optionBoxActive: {
    borderColor: COLORS.primary,
    backgroundColor: "#fff1f2",
  },
  optionTitle: { fontSize: 14, color: COLORS.gray, fontWeight: "500" },
  optionTitleActive: { color: COLORS.primary, fontWeight: "700" },

  coverPhotoContainer: {
    height: 160,
    backgroundColor: "#e2e8f0",
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 12,
  },
  coverPhoto: { width: "100%", height: "100%" },
  changePhotoBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    justifyContent: "center",
  },
  changePhotoText: { fontSize: 12, color: COLORS.gray },
  safetyContainer: {
    backgroundColor: "#fff7ed",
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  safetyHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  safetyTitle: { color: COLORS.orange, fontWeight: "700", fontSize: 14 },
  safetyText: { color: "#9a3412", fontSize: 12, lineHeight: 18 },

  // --- REVIEW SUMMARY STYLES ---
  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  summarySectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.gray,
    marginBottom: 16,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  summaryRow: { flexDirection: "row", gap: 12, marginBottom: 8 },
  summaryIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#f8fafc",
    alignItems: "center",
    justifyContent: "center",
  },
  summaryLabel: { fontSize: 12, color: COLORS.gray, marginBottom: 2 },
  summaryValue: { fontSize: 16, color: COLORS.dark, fontWeight: "600" },
  summarySubValue: { fontSize: 13, color: COLORS.slate600, marginTop: 2 },
  summaryDivider: {
    height: 1,
    backgroundColor: "#f1f5f9",
    marginVertical: 16,
    marginLeft: 44,
  },
  miniTag: {
    backgroundColor: "#f1f5f9",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  miniTagText: { fontSize: 12, color: COLORS.slate600, fontWeight: "500" },
  aiBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 16,
    backgroundColor: COLORS.green200,
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 100,
  },
  aiBadgeText: { fontSize: 12, color: COLORS.greenText, fontWeight: "600" },
});
