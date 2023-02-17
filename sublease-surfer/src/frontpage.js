
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './App.css';
import Navbar from "./components/navbar.js";
import {SignIn, 
    SignOut, 
    post,
    read,
    auth, db} from './components/backend';

// displayed when user is NOT signed in

function Frontpage()
{
    return (
        <div className="page-container">
            {<Navbar/>} {/* Doesn't Work */}
            <header className="App-header">
                <p>Welcome to Sublease Surfer!</p>
                <SignIn />
                
                {/*<button>Toggle Theme, NOT working! Don't Click</button>*/}
        
            </header>
        </div>
    );
}

export default Frontpage;