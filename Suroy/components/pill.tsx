import { TouchableOpacity, Text, Stylesheet } from "react-native";

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

export const Pill = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.pill, selected && styles.pillSelected]}
  >
    <Text style={[styles.pillText, selected && styles.pillTextSelected]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = Stylesheet.create({
  pillContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  pill: {
    backgroundColor: COLORS.pillBg,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
  },
  pillSelected: {
    backgroundColor: "#fff",
    borderColor: COLORS.primary, // Red border when selected
  },
  pillText: { fontSize: 13, fontWeight: "600", color: COLORS.pillText },
  pillTextSelected: { color: COLORS.primary },
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
});
