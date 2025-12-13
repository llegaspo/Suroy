// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence, getAuth, browserLocalPersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_KHThnlEh2Y0uNyz1MA6w4fMB8wUbnds",
  authDomain: "suroy-6fbc0.firebaseapp.com",
  databaseURL:
    "https://suroy-6fbc0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "suroy-6fbc0",
  storageBucket: "suroy-6fbc0.firebasestorage.app",
  messagingSenderId: "403471940832",
  appId: "1:403471940832:web:20585a559854c953fee485",
  measurementId: "G-7E0H98LWBQ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);

export const auth = Platform.OS === 'web'
  ? getAuth(app) // Use default web auth (includes browserLocalPersistence by default)
  : initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });

export const db = getFirestore(app);

// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });
// export const db = getFirestore(app);
