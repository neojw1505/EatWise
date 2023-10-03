// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYUyvvKubfLjeZsXiReRZNgIedyE3xwzE",
  authDomain: "wad2-9fe8a.firebaseapp.com",
  databaseURL: "https://wad2-9fe8a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wad2-9fe8a",
  storageBucket: "wad2-9fe8a.appspot.com",
  messagingSenderId: "359997596474",
  appId: "1:359997596474:web:7aecf1337a516e2ffda603",
  measurementId: "G-TSV6VF945H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig;