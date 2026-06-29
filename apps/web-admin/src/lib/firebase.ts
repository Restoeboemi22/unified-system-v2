import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { env } from "@/utils/env";

const firebaseConfig = {
  apiKey: "AIzaSyAtagZsTUB6CT0ZVc4rr9l5OrqKBYgJorY",
  authDomain: "v2-portalkita-smpn3.firebaseapp.com",
  projectId: "v2-portalkita-smpn3",
  storageBucket: "v2-portalkita-smpn3.firebasestorage.app",
  messagingSenderId: "1043293333665",
  appId: "1:1043293333665:web:cfb4a739812f83bbb8e8e0",
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
