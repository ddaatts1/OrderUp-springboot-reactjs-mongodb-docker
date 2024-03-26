// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';
// import 'firebase/functions';
// import {initializeApp} from 'firebase/app'
// import {getFirestore} from '@firebase/firestore'
//
// const firebaseConfig = {
//     apiKey: "AIzaSyBeKFJZLSF6n3eVckKjD3DoNTc-lVvMPCo",
//     authDomain: "orderup-1678757977213.firebaseapp.com",
//     projectId: "orderup-1678757977213",
//     storageBucket: "orderup-1678757977213.appspot.com",
//     messagingSenderId: "79812574000",
//     appId: "1:79812574000:web:f8cc2cd153302428e6e6f5",
//     measurementId: "G-TVS2KTGT6C"
// };
//
// const  app =initializeApp(firebaseConfig);
//
// export const db =  getFirestore(app)
//
// export default app;
// // firebase.initializeApp(firebaseConfig);

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyBeKFJZLSF6n3eVckKjD3DoNTc-lVvMPCo",
    authDomain: "orderup-1678757977213.firebaseapp.com",
    projectId: "orderup-1678757977213",
    storageBucket: "orderup-1678757977213.appspot.com",
    messagingSenderId: "79812574000",
    appId: "1:79812574000:web:f8cc2cd153302428e6e6f5",
    measurementId: "G-TVS2KTGT6C"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };
export  default firebase
