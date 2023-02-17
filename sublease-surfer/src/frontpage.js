
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
            <Navbar/>
            <header className="App-header">
                <p>Sublease Surfer</p>
                <SignIn />
                <button onClick={() => {alert(Date.now().toLocaleString());}}>Post default shit test backend</button>
                {/*<button>Toggle Theme, NOT working! Don't Click</button>*/}
        
            </header>
        </div>
    );
}

export default Frontpage;