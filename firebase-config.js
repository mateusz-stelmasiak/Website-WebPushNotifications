import {initializeApp, getApps, getApp} from "firebase/app";
import {getDatabase} from "firebase/database";

// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAYR75On_Y2oVJWX1Z-2oXNi07Rw_dvRNE",
    authDomain: "empushnotifications.firebaseapp.com",
    databaseURL: "https://empushnotifications-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "empushnotifications",
    storageBucket: "empushnotifications.appspot.com",
    messagingSenderId: "175860235754",
    appId: "1:175860235754:web:847a13037a2c996b778693"
};


let firebase = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const firebaseApp = firebase;
export const firebaseDb = getDatabase(firebaseApp);





