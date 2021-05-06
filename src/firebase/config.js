import firebase from 'firebase';

var firebaseConfig = {
    // apiKey: "AIzaSyBwCYn38Bf1RLHC_AzagV66KzszEBZ6p10",
    // authDomain: "arpit-chat-app.firebaseapp.com",
    // projectId: "arpit-chat-app",
    // storageBucket: "arpit-chat-app.appspot.com",
    // messagingSenderId: "318208025802",
    // appId: "1:318208025802:web:e4a49d928dfa01a1fe0033"

    apiKey: "AIzaSyCaIA2dvxoRHDCTg98HJ6eRUvF4K_fNmkU",
    authDomain: "arpit-superchat-app.firebaseapp.com",
    projectId: "arpit-superchat-app",
    storageBucket: "arpit-superchat-app.appspot.com",
    messagingSenderId: "6731822626",
    appId: "1:6731822626:web:5db1c77618d402a79cfc7b"

  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const projectFS = firebase.firestore();

  export {projectFS, firebase};

