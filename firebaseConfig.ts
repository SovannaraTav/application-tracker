import { initializeApp, FirebaseOptions } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Google Firebase application configuration object
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
};

// Initializes Google Firebase application with the provided configuration
const app = initializeApp(firebaseConfig);

// Checks if Google Analytics is supported in the current environment
let analytics;
// If Google Analytics is supported, it is then initialized
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
// Otherwise, displays an error message
}).catch((error) => {
  console.error("Google Analytics not supported:", error);
});

// Initializes Firebase Authentication
const auth = getAuth(app);

// Initializes Cloud Firestore
const db = getFirestore(app);

// Initializes Cloud Storage
const storage = getStorage(app);

// Exports the initialized instances
export { app, analytics, auth, db, storage };
