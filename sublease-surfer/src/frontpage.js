
import React, { Component, useState} from 'react';
import { Link } from "react-router-dom";
import './App.css';
import Navbar from "./components/navbar.js";
import CustomMap from './components/map.js';

import {SignIn, 
    SignOut, 
    PostButton,
    post,
    readPosts,
    auth, db} from './components/backend';

// displayed when user is NOT signed in

function Frontpage()
{

    return (
        <div className="page-container">
            
            <header className="App-header">

                <h1>Sublease Surfer</h1>
                <SignIn />
                <button>Read Database</button>
                <p>Interactive Map</p>
                <CustomMap/>
        
            </header>
        </div>
    );
}

export default Frontpage;