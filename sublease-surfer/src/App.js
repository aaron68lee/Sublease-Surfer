//import logo from './logo.svg';

// import FRONTEND packages
import React, {useRef, useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { get } from 'https';
// import { TextDecoder } from 'text-encoding';
// const csv = require('csvtojson');

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
import './themes.css';
// ================ FIX THESE FILES BEFORE IMPORTING ================ 
//import './Login.js';
//import './Navbar.js';
//import './Login.js';

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


// Component for user to create new sublease posting / listing 
function PostField() // consider making user page its own class to use this.state.value and onChange function
{
  var slider = document.getElementById("slide");
  
  return (
    <div>
      {/*Create Text Description Field*/}
      <input defaultValue={"Full Address"} type = "text"></input><br></br>
      <input defaultValue={"Your Name"} type = "text"></input> 
      <p>Start Date: </p> <input type = "date"></input> 
      <p>End Date: </p> <input type = "date"></input> <br></br>
      <input defaultValue={"Description"} type = "text"></input><br></br>
      <input defaultValue={"Contact Info: "} type = "text"></input><br></br>
      {/*Create Price input slider*/}
      <input type="range" min="0" max="4000" id="slide"/><br></br>

      <p>Sublease Price / month: {slider}</p>
      <button onClick={console.log("Slider value: " + slider)}>Submit Posting</button>
    </div>
  // onClick={ TO DO - add posting data to database
  )
 
}

// temp dummy display for create post field if user NOT logged in
function DefaultDisplay() 
{
  return (
  <p>dummy component</p>
  )
}



// ========================== Main Page Display ===========================

function App() {

  // get user authentication token
  const [user] = useAuthState(auth);

  // Toggle dark / light mode TODO: CREATE TOGGLE ELEMENT UI/UX
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="App">
      <header className="App-header">
        <p>Website Exists</p>
        <div className={theme}>
          <button onClick={toggleTheme}>Toggle Theme, NOT working! Don't Click</button>
        </div>

        <h1>Hello, {user ? user.displayName : " sign-in here"}</h1> {/*Dyanmic component dependent on user login status*/}
        <section>
          {/*<ChatRoom />*/}
          {user ? <SignOut /> : <SignIn />} {/* Conditonal CSS displays different components based on User Login STATE*/}
          <div>
          {user ? <PostField /> : <DefaultDisplay />}
          </div>
        </section>



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
