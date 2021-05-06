import React, { useRef, useState } from 'react';
import { ChatMessage } from './ChatMessage.js'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { projectFS, firebase } from '../firebase/config.js';

export const ChatRoom = () => {

    const firestoreRef = projectFS.collection('messages');
    const query = firestoreRef.orderBy('createdAt').limit(250);

    const [messages] = useCollectionData(query, { idField: 'id' });

    const [formValue, setFormValue] = useState('');
    const dummy = useRef();

    const sendMessage = async (event) => {

        event.preventDefault();
        console.log('formValue>> ',formValue);
        if(formValue !== '' && formValue !== null){

        const {uid, photoURL} = firebase.auth().currentUser;
        await firestoreRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
          });
          dummy.current.scrollIntoView({behavior : 'smooth'});
        }
        setFormValue('');
       
    }
    return (
        <div>
            <h3> Welcome to the chatroom </h3>
            <main>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
                <div ref={dummy}></div>
            </main>

            <form onSubmit={sendMessage}>
                <input value={formValue} onChange={(event) => { setFormValue(event.target.value) }} />
                <button type='submit'> Send </button>
            </form>
        </div>
    )

}