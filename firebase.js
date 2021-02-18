// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyB9ju9FJCX4IvX6K3B-oWu3lqYmRik2m54",
    authDomain: "whats-app-abba6.firebaseapp.com",
    projectId: "whats-app-abba6",
    storageBucket: "whats-app-abba6.appspot.com",
    messagingSenderId: "1036517972290",
    appId: "1:1036517972290:web:ef486776ef7282858b10db",
    measurementId: "G-29P6331CEX"
  };
const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();
const auth=firebase.auth();
const provider =new firebase.auth.GoogleAuthProvider();
export {auth, provider};
export default db;