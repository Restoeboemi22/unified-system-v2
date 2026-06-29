import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { env } from "@/utils/env";

const firebaseConfig = {
  apiKey: "AIzaSyDhNn60YGopgeG5heXpcEFFZ6qX5HB3ho0",
  authDomain: "smpn3pacet-app.firebaseapp.com",
  databaseURL: "https://smpn3pacet-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smpn3pacet-app",
  storageBucket: "smpn3pacet-app.firebasestorage.app",
  messagingSenderId: "786816320664",
  appId: "1:786816320664:web:e8823c4d1451a03101bced",
};

// Initialize Firebase (Singleton pattern to avoid multiple instances)
function getOrInitDefaultApp() {
  const existing = getApps().find((a) => a.name === '[DEFAULT]');
  if (existing) return existing;
  try {
    return getApp();
  } catch {
    return initializeApp(firebaseConfig);
  }
}

export const app = getOrInitDefaultApp();
export const auth = getAuth(app);
