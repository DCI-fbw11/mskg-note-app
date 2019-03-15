//firebase & firestore
import { createStore, combineReducers, compose } from "redux";
// firebase stuff
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import "firebase/firestore"; // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable
import { reduxFirestore, firestoreReducer } from "redux-firestore"; // <- needed if using firestore

import { composeWithDevTools } from "redux-devtools-extension";

const firebaseConfig = {
  apiKey: "AIzaSyAxn3J6s-W4qP7EBYzaeptb1QGWkVjM1MU",
  authDomain: "note-app-3c2e0.firebaseapp.com",
  databaseURL: "https://note-app-3c2e0.firebaseio.com",
  projectId: "note-app-3c2e0",
  storageBucket: "note-app-3c2e0.appspot.com",
  messagingSenderId: "210936294413"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
firebase.firestore(); // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
});

// Create store with reducers and initial state
const initialState = {};
export const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(composeWithDevTools(reactReduxFirebase(firebase)))
);
