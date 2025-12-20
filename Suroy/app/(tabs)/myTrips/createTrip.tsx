import React, { useState, useMemo, useRef } from "react";
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
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import {
  MapPin,
  Calendar as CalendarIcon,
  Plus,
  Info,
  Wallet,
  X,
  ChevronLeft,
  ChevronRight,
  Sun,
  Clock,
  Heart,
  Sparkles,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pill } from "@/components/pill";

// Enable LayoutAnimation
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width, height } = Dimensions.get("window");
const SHEET_PADDING = 24;
const SHEET_WIDTH = width; // The width of one slide
const CONTENT_WIDTH = width - SHEET_PADDING * 2;

// Colors
const COLORS = {
  primary: "#ef4444",
  secondary: "#06b6d4",
  dark: "#172554",
  gray: "#64748b",
  bg: "#f4f4f5",
  orange: "#fb923c",
  green200: "#bbf7d0",
  greenText: "#164e63",
  pillBg: "#fecaca", // red-200
  pillText: "#083344", // cyan-950
};

export default function CreateTripScreen() {
  // Change this to 0, 1, or 2 to test the progress bar positions
  const [activeStep, setActiveStep] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollRef = useRef<ScrollView>(null);

  // --- PLACES LOGIC ---
  const [inputText, setInputText] = useState("");
  const [addedPlaces, setAddedPlaces] = useState<string[]>([]);

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

  // --- STEP 1: CALENDAR & BUDGET LOGIC ---
  const [currentDate, setCurrentDate] = useState(new Date(2025, 1, 1));
  const [startDate, setStartDate] = useState<number | null>(null);
  const [endDate, setEndDate] = useState<number | null>(null);
  const [budgetType, setBudgetType] = useState<"Budget" | "Mid" | "Premium">(
    "Mid",
  );

  // --- STEP 2: PREFERENCES LOGIC ---
  const [availability, setAvailability] = useState(["Morning"]);
  const [interests, setInterests] = useState(["Mountains"]);
  const [aiEnabled, setAiEnabled] = useState(true);
  const [notes, setNotes] = useState(
    "I visited Sandbar Beach in Australia, and I liked it so much. I want to see if there’s a similar beach here",
  );

  const toggleSelection = (item: string, list: string[], setList: Function) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  // --- NAVIGATION & ANIMATION ---
  const handleSaveAndContinue = () => {
    if (activeStep < 2) {
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);
      scrollViewRef.current?.scrollTo({
        x: width * nextStep,
        y: 0,
        animated: true,
      });
    }
  };

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const page = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveStep(page);
  };

  // --- FIXED STEPPER WIDTH CALCULATION ---
  const getStepperWidth = () => {
    // 48 is total horizontal padding (24 * 2)
    const containerW = width - 48;

    // Dot positions:
    // Dot 1 center: 30 (left) + 10 (half width) = 40px
    // Dot 2 center: 50% = containerW / 2
    // Dot 3 center: right 30 + 10 = containerW - 40px

    switch (activeStep) {
      case 0:
        return 40;
      case 1:
        return containerW / 2; // Exact middle
      case 2:
        return containerW - 40;
      default:
        return 40;
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

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://placehold.co/672x885" }}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <SafeAreaView style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton}>
          <ChevronLeft size={24} color={COLORS.dark} />
        </TouchableOpacity>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.sheetContainer}>
          <View style={styles.handleBar} />

          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Create a Trip</Text>
            <TouchableOpacity>
              <X size={24} color={COLORS.gray} />
            </TouchableOpacity>
          </View>

          {/* Stepper */}
          <View style={styles.stepperContainer}>
            <View style={styles.stepperLineBase} />
            {/* The width is now calculated precisely in getStepperWidth() */}
            <View
              style={[styles.stepperLineActive, { width: getStepperWidth() }]}
            />

            <View
              style={[
                styles.stepDot,
                { left: 30, borderColor: COLORS.secondary },
              ]}
            >
              <View
                style={[styles.innerDot, { backgroundColor: COLORS.secondary }]}
              />
            </View>
            <View
              style={[
                styles.stepDot,
                {
                  left: "50%",
                  marginLeft: -12,
                  borderColor: activeStep >= 1 ? COLORS.secondary : "#e5e7eb",
                  backgroundColor: activeStep >= 1 ? COLORS.secondary : "white",
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

            <View
              style={[
                styles.stepDot,
                {
                  right: 30,
                  borderColor: activeStep >= 2 ? COLORS.secondary : "#e5e7eb",
                  backgroundColor: activeStep >= 2 ? COLORS.secondary : "white",
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
                Preferences
              </Text>
              <Text
                style={[
                  styles.stepText,
                  activeStep >= 2 && styles.stepTextActive,
                ]}
              >
                Group Setup
              </Text>
            </View>
          </View>

          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false} // Disable manual swipe to force button use, or set true
            onMomentumScrollEnd={onMomentumScrollEnd}
            style={{ width: width, marginLeft: -24 }} // Offset the padding of parent
          >
            {/* --- SLIDE 1: DETAILS --- */}
            <View style={{ width: width, paddingHorizontal: 24 }}>
              {/* --- SECTION: PLACE --- */}
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
                      placeholder="Enter destination (e.g. Cebu)"
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

              {/* --- SECTION: DATE --- */}
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
                        startDate &&
                        endDate &&
                        day > startDate &&
                        day < endDate;
                      const isToday = day === 15;

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
                          <View
                            style={[
                              isToday &&
                                !isStart &&
                                !isEnd &&
                                styles.todayCircle,
                            ]}
                          >
                            <Text
                              style={[
                                styles.dateText,
                                (isStart || isEnd) && {
                                  color: "white",
                                  fontWeight: "bold",
                                },
                                (isInRange || isToday) && {
                                  color: COLORS.orange,
                                },
                              ]}
                            >
                              {day}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              </View>

              {/* --- OTHER SECTIONS --- */}
              <View style={[styles.sectionContainer, { marginTop: 24 }]}>
                <View style={styles.iconLabelRow}>
                  <Info size={20} color={COLORS.gray} />
                  <Text style={styles.fieldLabel}>About Trip</Text>
                </View>
                <Text style={styles.helperText}>
                  Share what this trip is about
                </Text>

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
                <Text style={styles.helperText}>
                  Budget per day, per person
                </Text>

                <View style={styles.sliderContainer}>
                  <Text style={styles.sliderLabelLeft}>
                    Php {budgetData.min}
                  </Text>
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
                        styles.chip,
                        budgetType === type && styles.chipActive,
                      ]}
                      onPress={() => setBudgetType(type as any)}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          budgetType === type && styles.chipTextActive,
                        ]}
                      >
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={styles.footerNote}>
                  This helps us match you with travelers who have similar
                  spending expectations.
                </Text>
              </View>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveAndContinue}
              >
                <Text style={styles.saveButtonText}>Save and Continue</Text>
                <ChevronRight size={20} color="white" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  backgroundImage: {
    position: "absolute",
    top: -50,
    left: 0,
    width: width,
    height: height * 0.6,
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
  scrollContent: { paddingTop: 720, paddingBottom: 0 },
  sheetContainer: {
    backgroundColor: COLORS.bg,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    minHeight: height,
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
    backgroundColor: "#e5e7eb",
    width: "100%",
    position: "absolute",
    top: 10,
  },
  // Updated stepperLineActive to use left: 0 to ensure it starts from the edge
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
  stepTextActive: { color: COLORS.primary, fontWeight: "bold" },
  // Dots contain a 2px border, total visual size is roughly 24px.
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

  // --- PLACE STYLES ---
  sectionContainer: { marginBottom: 10 },
  iconLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 10,
  },
  fieldLabel: { fontSize: 18, fontWeight: "600", color: COLORS.gray },
  inputCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    paddingLeft: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  flagIcon: { fontSize: 16, marginRight: 8 },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.dark,
    fontWeight: "500",
    paddingVertical: 8,
  },
  addButton: {
    width: 44,
    height: 44,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f1f5f9",
    elevation: 1,
  },
  addText: {
    fontSize: 10,
    color: COLORS.orange,
    fontWeight: "bold",
    marginTop: 2,
  },

  // --- GREEN TAGS ---
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  greenTag: {
    backgroundColor: COLORS.green200,
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    height: 32,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 11,
    elevation: 3,
  },
  greenTagText: {
    color: COLORS.greenText,
    fontSize: 12,
    fontWeight: "500",
    marginRight: 0,
  },

  // Calendar
  calendarControlRow: { flexDirection: "row", gap: 12, marginBottom: 16 },
  pillButtonActive: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  pillButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  pillTextWhite: { color: "white", fontSize: 12 },
  pillTextOrange: { color: COLORS.orange, fontSize: 12 },
  calendarCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    elevation: 1,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  monthTitle: { fontSize: 14, fontWeight: "600", color: COLORS.dark },
  gridRow: { flexDirection: "row", marginBottom: 8 },
  dayLabel: { flex: 1, textAlign: "center", fontSize: 12, color: COLORS.dark },
  gridContainer: { flexDirection: "row", flexWrap: "wrap" },
  dateCell: {
    width: (width - 48 - 32) / 7,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  dateCellRange: { backgroundColor: "rgba(251, 146, 60, 0.1)" },
  dateCellSelectedLeft: {
    backgroundColor: COLORS.orange,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  dateCellSelectedRight: {
    backgroundColor: COLORS.orange,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  todayCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.orange,
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: { fontSize: 12, color: COLORS.gray },

  // Rest
  textAreaContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    height: 100,
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  textArea: { fontSize: 12, color: "#334155", textAlignVertical: "top" },
  sliderContainer: {
    height: 40,
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 10,
  },
  sliderLabelLeft: {
    position: "absolute",
    top: -15,
    left: 0,
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "600",
  },
  sliderLabelRight: {
    position: "absolute",
    top: -15,
    right: 0,
    fontSize: 12,
    color: COLORS.secondary,
    fontWeight: "600",
  },
  sliderTrack: {
    height: 8,
    backgroundColor: "#cffafe",
    borderRadius: 4,
    width: "100%",
    position: "relative",
  },
  sliderRange: {
    position: "absolute",
    height: 8,
    backgroundColor: "#60a5fa",
    opacity: 0.7,
  },
  sliderKnob: {
    position: "absolute",
    top: -6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 4,
    borderColor: COLORS.secondary,
    marginLeft: -10,
  },
  chipRow: { flexDirection: "row", gap: 10 },
  chip: {
    backgroundColor: "#e2e8f0",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chipActive: {
    backgroundColor: "#fecaca",
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  chipText: { fontSize: 12, color: COLORS.gray, fontWeight: "600" },
  chipTextActive: { color: COLORS.dark },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 50,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  footerNote: {
    marginTop: 16,
    fontSize: 12,
    color: COLORS.gray,
    textAlign: "center",
    lineHeight: 18,
  },
  helperText: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: -8,
    marginBottom: 12,
    marginLeft: 30,
  },
});
