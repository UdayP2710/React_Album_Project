// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4HQlBoXmZYRhXiSkyqGMnIoz1PtnMmsw",
  authDomain: "albumsdb-ce2e4.firebaseapp.com",
  projectId: "albumsdb-ce2e4",
  storageBucket: "albumsdb-ce2e4.appspot.com",
  messagingSenderId: "872840660491",
  appId: "1:872840660491:web:b80e10d0ac0443eeafa90e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
