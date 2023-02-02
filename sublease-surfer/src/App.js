//import logo from './logo.svg';

// import FRONTEND packages
import React from 'react';
import ReactDOM from 'react-dom/client';


// import BACKEND packages
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

/* SECTION START: RUNNING THIS WILL CRASH SITE
firebase.initializeApp({
  // firebase config
})

const auth = firebase.auth();
const firestore = firebase.firestore();
// SECTION END
*/

// ========================== Main Application ===========================

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Website Exists</p>
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
