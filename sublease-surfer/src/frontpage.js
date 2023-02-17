
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
            {<Navbar/>} {/* Doesn't Work */}
            <header className="App-header">
                <p>Sublease Surfer</p>
                <SignIn />
            </header>
        </div>
    );
}

export default Frontpage;