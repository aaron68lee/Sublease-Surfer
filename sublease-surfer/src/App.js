//import logo from './logo.svg';

// import FRONTEND packages
import React from 'react';
import ReactDOM from 'react-dom/client';


// import BACKEND packages
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import {useAuthState, useSignInWithGoogle} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

// import web app pages
import './App.css';

// ========================== initialize backend: Google Firebase ===========================

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBysQ6DRQtUpCZKvcW0mhYNP-wp_KRUrto",
  authDomain: "sublease-surfer.firebaseapp.com",
  projectId: "sublease-surfer",
  storageBucket: "sublease-surfer.appspot.com",
  messagingSenderId: "520847563465",
  appId: "1:520847563465:web:e1c4f6beb69e6e94104b18",
  measurementId: "G-HF52PR1GMX"
};

// Initialize Firebase Backend

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore(); // db = firebase.firestore() for database access

//const app = initializeApp(firebaseConfig);
// we don't case about analytics for the project yet
//const analytics = getAnalytics(app);

// SECTION START: RUNNING THIS WILL CRASH SITE
// SECTION END

function SignIn()
{
  const useSignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
  }
  
  return (
    <button className="signIn" onClick={useSignInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut()
{
  return auth.currentUser && (
    <button className="signOut" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom()
{
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'}); // use React Hooks to detect component change and re-render()
}

// ========================== Main Application ===========================

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <p>Website Exists</p>
        <section>
          {user ? <ChatRoom /> : <SignIn />}
        </section>

        {/*
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      */}

      </header>
    </div>
  );
}

export default App;
