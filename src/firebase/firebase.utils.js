import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyAWMY_Lgd344MMi6jKQ8iLWVj8qBJYnlt0",
    authDomain: "e-commerce-react-7d2b4.firebaseapp.com",
    databaseURL: "https://e-commerce-react-7d2b4.firebaseio.com",
    projectId: "e-commerce-react-7d2b4",
    storageBucket: "e-commerce-react-7d2b4.appspot.com",
    messagingSenderId: "885271012515",
    appId: "1:885271012515:web:df5328ee46c8d4d6c00b16",
    measurementId: "G-DX2341M02R"
  };

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
