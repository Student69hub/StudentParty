// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, get, set, child, push, remove, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCzJxqnulMiNH_yyjJhuNwhOKTf49zqmL4",
    authDomain: "students-party.firebaseapp.com",
    databaseURL: "https://students-party-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "students-party",
    storageBucket: "students-party.firebasestorage.app",
    messagingSenderId: "382151217353",
    appId: "1:382151217353:web:6e8ec1ad891fc9763c7d18",
    measurementId: "G-PF2SHZX7FB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Make necessary methods globally accessible for our static HTML files
window.firebaseDB = database;
window.firebaseRef = ref;
window.firebaseGet = get;
window.firebaseSet = set;
window.firebaseChild = child;
window.firebasePush = push;
window.firebaseRemove = remove;
window.firebaseOnValue = onValue;
