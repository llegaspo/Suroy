import * as Font from "expo-font";
import { Platform } from "react-native";

export const loadFonts = async () => {
  try {
    await Font.loadAsync({
      "SF-Display-Regular": require("../assets/SanFrancisco/SF-Pro-Display-Regular.otf"),
      "SF-Display-Bold": require("../assets/SanFrancisco/SF-Pro-Display-Regular.otf"),
      "SF-Display-Medium": require("../assets/SanFrancisco/SF-Pro-Display-Regular.otf"),
      "SF-Display-Light": require("../assets/SanFrancisco/SF-Pro-Display-Regular.otf"),
      "SF-Rounded-Regular": require("../assets/SanFrancisco/SF-Pro-Display-Regular.otf"),
      "SF-Rounded-Bold": require("../assets/SanFrancisco/SF-Pro-Display-Regular.otf"),
      "SF-Rounded-Medium": require("../assets/SanFrancisco/SF-Pro-Display-Regular.otf"),
      "SF-Rounded-Light": require("../assets/SanFrancisco/SF-Pro-Display-Regular.otf"),
      "SF-Text-Regular": require("../assets/SanFrancisco/SF-Pro-Display-Regular.otf"),
      "SF-Text-Bold": require("../assets/SanFrancisco/SF-Pro-Display-Regular.otf"),
      "SF-Text-Medium": require("../assets/SanFrancisco/SF-Pro-Display-Regular.otf"),
      "SF-Text-Light": require("../assets/SanFrancisco/SF-Pro-Display-Regular.otf"),
    });
    return true;
  } catch (error) {
    console.warn("Failed to load custom fonts:", error);
    return false;
  }
};

// map specific font names to their logical structure
export const fontConfig = {
  SFDisplay: {
    regular: "SF-Display-Regular",
    bold: "SF-Display-Bold",
    medium: "SF-Display-Medium",
    light: "SF-Display-Light",
  },
  SFRounded: {
    regular: "SF-Rounded-Regular",
    bold: "SF-Rounded-Bold",
    medium: "SF-Rounded-Medium",
    light: "SF-Rounded-Light",
  },
  SFText: {
    regular: "SF-Text-Regular",
    bold: "SF-Text-Bold",
    medium: "SF-Text-Medium",
    light: "SF-Text-Light",
  },
};

type FontFamily = keyof typeof fontConfig; // "Britti" | "SFDisplay" | "SFRounded" | "SFText"
type FontWeight = "regular" | "bold" | "medium" | "light";

// System font fallbacks for Android
const systemFontFallbacks = {
  regular: Platform.OS === "ios" ? "System" : "Roboto",
  bold: Platform.OS === "ios" ? "System" : "Roboto",
  medium: Platform.OS === "ios" ? "System" : "Roboto",
  light: Platform.OS === "ios" ? "System" : "Roboto",
};

export const getFontFamily = (
  family: FontFamily = "SFText",
  weight: FontWeight = "regular",
  fontsLoaded: boolean = true,
) => {
  if (fontsLoaded) {
    return fontConfig[family][weight];
  }
  return systemFontFallbacks[weight];
};
