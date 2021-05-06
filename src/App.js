import './App.css';
import {firebase} from './firebase/config.js';
import {ChatRoom} from './comps/ChatRoom.js';
import {SignIn} from './comps/SignIn.js';
import {SignOut} from './comps/SignOut.js'

import { useAuthState } from 'react-firebase-hooks/auth';

function App() {

  const [user] = useAuthState(firebase.auth());

  return (
    <div className="App">
    <header>
    <h1>Chat App 🤘🏻</h1>
      <SignOut/>
    </header>
    <section>
      {user? <ChatRoom/>:<SignIn/>}
    </section>
  </div>
  );
}

export default App;
