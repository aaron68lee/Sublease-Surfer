
import React, { Component, useState} from 'react';
import { Link } from "react-router-dom";
import './App.css';
import Navbar from "./components/navbar.js";
import {SignIn, 
    SignOut, 
    PostButton,
    post,
    read,
    auth, db} from './components/backend';

// displayed when user is NOT signed in

function Frontpage()
{
    const [input, setInput] = useState('');

    const handleChange = event =>
    {
        setInput(event.target.value);
    }
    return (
        <div className="page-container">
            <Navbar/>
            <header className="App-header">
                <p>Sublease Surfer</p>
                <SignIn />
                <PostButton props={input}/>
                <input type="text" onChange={handleChange} value={input}/>
                <p>Input: {input}</p>
                {/*<button>Toggle Theme, NOT working! Don't Click</button>*/}
        
            </header>
        </div>
    );
}

export default Frontpage;