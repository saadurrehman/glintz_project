import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAQnwopFR9iN7WPgOjuUurhRW2tqQthqU0",
  authDomain: "glintz-e11b0.firebaseapp.com",
  projectId: "glintz-e11b0",
  storageBucket: "glintz-e11b0.appspot.com",
  messagingSenderId: "679769109700",
  appId: "1:679769109700:web:2f76df00269434cef28591",
  measurementId: "G-MVFXR3T1S3",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
