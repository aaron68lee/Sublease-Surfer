//import logo from './logo.svg';

// import FRONTEND packages
import React, {useRef, useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';


// import BACKEND packages
import firebase from 'firebase/compat/app';
//import * as firebaseui from 'firebaseui';
//import 'firebaseui/dist/firebaseui.css';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import {useAuthState, useSignInWithGoogle} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

// import web app pages and variables
import './App.css';

import {ChatRoom, 
  ChatMessage, 
  SignIn, 
  SignOut, 
  post,
  read,
  auth} from './backend';

//import {ChatRoom} from './backend.js';

// ========================== initialize backend: Google Firebase ===========================

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// ========================== Frontend Diplay Components' Functions ===========================

// ========================== Main Page Display ===========================

function App() {

  // get user authentication token
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <p>Website Exists</p>
        <h1>Hello, {user ? user.displayName : " sign-in here"}</h1> {/*Dyanmic component dependent on user login status*/}
        <section>
          {/*<ChatRoom />*/}
          {user ? <SignOut /> : <SignIn />} {/* Conditonal CSS displays different components based on User Login STATE*/}
        </section>

        <div>
          {/*user ? <postField /> : <defaultDisplay />*/}
        </div>

        {/* 
        // DEFAULT REACT PAGE 
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
