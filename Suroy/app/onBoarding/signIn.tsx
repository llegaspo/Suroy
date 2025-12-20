import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Platform,
  TouchableOpacity,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  Easing,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";
const { width, height } = Dimensions.get("window");

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      router.replace("../(tabs)/myTrips");
    } catch (e: any) {
      console.log(e);
      alert("Sign In Failed: " + e.message);
    }
  };

  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const keyboardShowListener = Keyboard.addListener(showEvent, (e) => {
      const keyboardHeight = e.endCoordinates.height;
      Animated.timing(translateY, {
        toValue: -keyboardHeight * 0.8,
        duration: 250,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start();
    });

    const keyboardHideListener = Keyboard.addListener(hideEvent, () => {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }).start();
    });

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  return (
    // REPLACED: View -> ImageBackground
    <ImageBackground
      style={styles.container}
      // Replace this URL with your own image URL or local require('./image.png')
      source={{
        uri: "https://drive.google.com/uc?export=view&id=1umlPYXvh8pAm6UpvL0y-A0gPL-9Ju52n",
      }}
      resizeMode="cover"
    >
      {/* Removed the <Video> component entirely */}

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.contentWrapper}>
          <Animated.View
            style={[
              styles.bottomSheet,
              { transform: [{ translateY: translateY }] },
            ]}
          >
            {/* Handle Bar */}
            <View style={styles.handleBar} />

            {/* Welcome Text */}
            <Text style={styles.welcomeText}>Welcome back to Suroy! 🌴</Text>

            {/* Google Sign In Button */}
            <TouchableOpacity style={styles.googleButton}>
              <Image
                source={{
                  uri: "https://drive.google.com/uc?export=view&id=1fBSxUmfjqnlxgQ5IcB6I6G_o7TXQUPvk",
                }}
                style={styles.googleLogoImage}
              />
              <Text style={styles.googleButtonText}>Sign in with Google</Text>
            </TouchableOpacity>

            {/* Divider Line */}
            <View style={styles.dividerLine} />

            {/* Inputs Container */}
            <View style={styles.inputGroupContainer}>
              <TextInput
                placeholder="Email or username"
                placeholderTextColor="#083344"
                style={styles.inputField}
                onChangeText={setEmail}
                value={email}
                autoCapitalize="none"
              />
              <View style={styles.inputDivider} />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#083344"
                secureTextEntry
                style={styles.inputField}
                onChangeText={setPassword}
                value={password}
              />
            </View>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={signIn}>
              <Text style={styles.loginButtonText}>Log in</Text>
            </TouchableOpacity>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotButton}>
              <Text style={styles.forgotText}>Forgot your password?</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black", // Fallback color if image fails to load
  },
  // Removed backgroundVideo style as it is no longer needed
  contentWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  bottomSheet: {
    height: 452,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
    alignItems: "center",
    paddingTop: 20,
    overflow: "hidden",
  },
  handleBar: {
    width: 96,
    height: 4,
    backgroundColor: "#083344",
    borderRadius: 2,
    marginBottom: 48,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#0c4a6e",
    marginBottom: 24,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  googleButton: {
    width: 320,
    height: 64,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#f4f4f5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 11,
    elevation: 2,
  },
  googleIconContainer: {
    width: 28,
    height: 28,
    position: "absolute",
    left: 20,
  },
  gShape: {
    position: "absolute",
    opacity: 0.95,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#083344",
  },
  dividerLine: {
    width: 320,
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 12,
  },
  inputGroupContainer: {
    width: 320,
    height: 96,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#f4f4f5",
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 11,
    elevation: 2,
  },
  inputField: {
    flex: 1,
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: "500",
    color: "#083344",
  },
  inputDivider: {
    height: 1,
    width: "100%",
    backgroundColor: "#f5f5f5",
  },
  loginButton: {
    width: 320,
    height: 40,
    backgroundColor: "#fb923c",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 11,
    elevation: 2,
    borderWidth: 2,
    borderColor: "#f4f4f5",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  forgotButton: {
    marginTop: 4,
    paddingBottom: 20,
  },
  forgotText: {
    color: "#64748b",
    fontSize: 14,
    fontWeight: "500",
  },
});
