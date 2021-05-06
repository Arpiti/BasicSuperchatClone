import React from 'react';
import firebase from 'firebase';

export const SignIn = () => {

    const auth = firebase.auth();

    function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    return (
        <div>
            <h1> Login in now to be a part of community <br/> #TeamTanay</h1>
           <button className="sign-in" onClick={signInWithGoogle}>Sign In using Google</button>
        </div>
    )
}