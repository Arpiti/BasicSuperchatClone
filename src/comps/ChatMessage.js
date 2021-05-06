import React from 'react';
import { firebase } from '../firebase/config.js';

export const ChatMessage = (props) => {
    const { text, uid, photoURL } = props.message;
    const messageClass = uid === firebase.auth().currentUser.uid ? 'sent' : 'received';

    return (
        <div className={`message ${messageClass}`}>
            <img src={photoURL} alt={`${uid} user icon`} />
            <p> {text} </p>
        </div>
    )
}