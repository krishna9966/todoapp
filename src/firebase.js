// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {

// };
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBfONW0XBoiIq-aUR735nKgVT1JEBxO5ZA",
  authDomain: "todoapp-5e427.firebaseapp.com",
  projectId: "todoapp-5e427",
  storageBucket: "todoapp-5e427.appspot.com",
  messagingSenderId: "371451317937",
  appId: "1:371451317937:web:40ec4f9fb6091d7ca01c90",
  measurementId: "G-9M2KRX969E",
});
const db = firebaseApp.firestore();
export default db;
