
// import FRONTEND packages
import React, {useRef, useState, useEffect} from 'react';
import { Router, Link, Routes, Route, Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom'; // <Routes> replaces <Switch> in dom version 6

// import BACKEND packages

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

// import web app pages and components
import './styles/App.css';
import './styles/themes.css';
import Frontpage from './components/frontpage';
import HomeFeed from './components/homefeed.js';
import Profile from './components/profile';
import Navbar from './components/navbar';

import { PostField } from './components/posts.js';

// ================ FIX THESE FILES BEFORE IMPORTING ================ 

// importing backend functions and components

import {
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

     {user ? <Navbar /> : <></>}

     {/* Add Page Routes Here to link to different component's pages */}
        <Routes>
          <Route path="/" element={<Frontpage />} /> 
          <Route path="/browse" element={<HomeFeed />} /> 
          <Route path="/add-listing" element={<PostField />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/frontpage" element={<Frontpage/>} />
        </Routes> 

    </div>
  )

}

export default App;