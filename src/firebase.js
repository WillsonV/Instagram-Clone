import firebase from "firebase";

//put the config in initializeApp() function
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCbXCuiAiKp7l1E6ADYdiMYcj_F8aVWubk",
  authDomain: "insta-clone-40521.firebaseapp.com",
  databaseURL: "https://insta-clone-40521.firebaseio.com",
  projectId: "insta-clone-40521",
  storageBucket: "insta-clone-40521.appspot.com",
  messagingSenderId: "68495841641",
  appId: "1:68495841641:web:4967395829595f320c05f8",
  measurementId: "G-4W1X9VXL2Z",
});

//creating three services of Firebase
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };
