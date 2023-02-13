
// import FRONTEND packages
import React, {useRef, useState, useEffect} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // <Routes> replaces <Switch> in dom version 6

// import BACKEND packages

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import {useAuthState, useSignInWithGoogle} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

// import web app pages and variables
import './App.css';
import './themes.css';
import Frontpage from './frontpage';
//import Frontpage from './frontpage';
//import { PostField } from './components/posts.js';
//import Links from './routes';

// ================ FIX THESE FILES BEFORE IMPORTING ================ 
//import './Login.js';
//import './Navbar.js';
//import './Login.js';

// importing backend functions and components

import {
  SignIn, 
  SignOut, 
  post,
  read,
  auth} from './components/backend';


// ========================== Frontend Diplay Components' Functions ===========================


// ========================== Main Page Display ===========================

function App() {

  // get user authentication token
  const [user] = useAuthState(auth);

  /*
  // Toggle dark / light mode TODO: CREATE TOGGLE ELEMENT UI/UX
  const [theme, setTheme] = useState('light');
        
  const toggleTheme = () => {
      if (theme === 'light') {
        setTheme('dark');
      } else {
        setTheme('light');
      }
  };

  //
    useEffect(() => {
      document.body.className = theme;
    }, [theme]);
  */

  return (
    <div className='App'>
      <Frontpage />
    </div>
  )

}

export default App;

/*

import React from "react";
import PageLogin from "./pages/PageLogin";
import PagePosts from "./pages/PagePosts";
import PageProfile from "./pages/PageProfile";
import Error from "./components/404";

import { Switch, Route, Routes, BrowserRouter } from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<PageLogin />} />
                <Route exact path="/Postings" element={<PagePosts />} />
                <Route exact path="/Profile" element={<PageProfile />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
};

*/