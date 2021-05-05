import React, {useRef, useState} from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import './App.css';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
    //initialize app
    apiKey: "AIzaSyCaIA2dvxoRHDCTg98HJ6eRUvF4K_fNmkU",
    authDomain: "arpit-superchat-app.firebaseapp.com",
    projectId: "arpit-superchat-app",
    storageBucket: "arpit-superchat-app.appspot.com",
    messagingSenderId: "6731822626",
    appId: "1:6731822626:web:5db1c77618d402a79cfc7b"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
      <h1>SuperChat 🔥</h1>
        <SignOut/>
      </header>
      <section>
        {user? <ChatRoom/>:<SignIn/>}
      </section>
    </div>
  );
}

function ChatRoom() {
  const firestoreRef = firestore.collection('messages');
  const query = firestoreRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});
  const [formValue, setFormValue] = useState('');
  const dummy = useRef();

  const sendMessage = async(event) => {

    event.preventDefault();
    const {uid, photoURL} = auth.currentUser;

    await firestoreRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });

    setFormValue('');
    dummy.current.scrollIntoView({behavior : 'smooth'});


  }

  return (
    <div>
    <main>
      {messages && messages.map(msg => <ChatMessage key = {msg.id} message={msg}/>)}
      <div ref={dummy}></div>
    </main>

    <form onSubmit={sendMessage}>
      <input value = {formValue} onChange={(event) => {setFormValue(event.target.value)}}/>
      <button type='submit'> Send </button>
    </form>
    </div>
  )
}

const ChatMessage = (props) => {

  const {text, uid, photoURL } = props.message;
  const messageClass  = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
  <div className = {`message ${messageClass}`}>
    <img src={photoURL} alt={`${uid} user icon`}/>
    <p> {text} </p>
   </div>
  )
}

function SignIn() {
  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <button onClick={signInWithGoogle}> SignIn with Google </button>
  )
}

function SignOut() {
   return auth.currentUser && (<button onClick={() => auth.signOut()}>Sign Out</button>);
}

export default App;
