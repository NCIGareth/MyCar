// Import packages
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// Check that required environment variables are defined
if (!process.env.REACT_APP_FIREBASE_API_KEY) {
  throw new Error('REACT_APP_FIREBASE_API_KEY is not defined');
}
if (!process.env.REACT_APP_FIREBASE_AUTH_DOMAIN) {
  throw new Error('REACT_APP_FIREBASE_AUTH_DOMAIN is not defined');
}
if (!process.env.REACT_APP_FIREBASE_PROJECT_ID) {
  throw new Error('REACT_APP_FIREBASE_PROJECT_ID is not defined');
}

// Set Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase and Firestore
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const auth = firebase.auth();

// Export modules
export { firestore, auth };
