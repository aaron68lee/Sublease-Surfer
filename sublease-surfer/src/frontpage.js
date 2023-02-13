
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './App.css';
import Navbar from "./components/navbar.js";
import {
    SignIn, 
    SignOut, 
    } from './components/backend';
import {getSliderValue, PostField,} from './components/posts';

function Frontpage()
{
    return (
        <div className="page-container">
            {/*<Navbar/> DOESN'T WORK*/}
            <header className="App-header">
                <p>Website Exists</p>
                <SignIn />
                <SignOut/>
                <button>Toggle Theme, NOT working! Don't Click</button>
        
            </header>
        </div>
    );
}

export default Frontpage;