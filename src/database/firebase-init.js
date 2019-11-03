 
import firebase from 'firebase/app'
import 'firebase/firestore'


// Your web app's Firebase configuration
 
 var firebaseConfig = {
    apiKey: "**",
    authDomain: "vue-project-b2da4.firebaseapp.com",
    databaseURL: "https://vue-project-b2da4.firebaseio.com",
    projectId: "vue-project-b2da4",
    storageBucket: "vue-project-b2da4.appspot.com",
    messagingSenderId: "348945924030",
    appId: "1:348945924030:web:7705285bf4aaa174"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);
export const db = firestore;
