import firebase from 'firebase/compat/app';
import  'firebase/compat/firestore';
import { getAuth } from 'firebase/auth';


// Ensure that all required environment variables are defined
const requiredEnvVars = [
  'REACT_APP_FIREBASE_API_KEY',
  'REACT_APP_FIREBASE_AUTH_DOMAIN',
  'REACT_APP_FIREBASE_PROJECT_ID',
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`${envVar} is not defined`);
  }
}

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET?.trim() || undefined,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID?.trim() || undefined,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  console.error('Failed to initialize Firebase:', err);
}

const firestore = firebase.firestore();

firestore.enablePersistence()
.catch((err) => {
  if (err.code === 'failed-precondition') {
    alert("Error Multiple tabs open");
    console.log("Error Multiple tabs open");
 
  } else if (err.code === 'unimplemented') {
    alert("Browser not supported");
    console.log("Error Multiple tabs open");
  }
});
const auth = getAuth();

export { firestore, auth };
