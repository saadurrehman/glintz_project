"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.app = void 0;
const app_1 = require("firebase/app");
const storage_1 = require("firebase/storage");
const firebaseConfig = {
    apiKey: "AIzaSyAQnwopFR9iN7WPgOjuUurhRW2tqQthqU0",
    authDomain: "glintz-e11b0.firebaseapp.com",
    projectId: "glintz-e11b0",
    storageBucket: "glintz-e11b0.appspot.com",
    messagingSenderId: "679769109700",
    appId: "1:679769109700:web:2f76df00269434cef28591",
    measurementId: "G-MVFXR3T1S3",
};
exports.app = (0, app_1.initializeApp)(firebaseConfig);
exports.storage = (0, storage_1.getStorage)(exports.app);
