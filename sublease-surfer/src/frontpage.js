
import React, { Component, useState} from 'react';
import { Link } from "react-router-dom";
import './App.css';
import Navbar from "./components/navbar.js";
import {SignIn, 
    SignOut, 
    PostButton,
    post,
    readPosts,
    auth, db} from './components/backend';

// displayed when user is NOT signed in

function Frontpage()
{
    const [picture, setPic] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleChange = event =>
    {
        setPic(event.target.value);
        setTitle(event.target.value);
        setBody(event.target.value);
    }

    return (
        <div className="page-container">
            
            <header className="App-header">

                <h1>Sublease Surfer</h1>
                <SignIn />
                
                <PostButton picture={picture} title={title} body={body}/>
                <button>Read Database</button>
                <input type="text" onChange={(event) => {setPic(event.target.value)}} value={picture}/>
                <input type="text" onChange={(event) => {setTitle(event.target.value)}}value={title}/>
                <input type="text" onChange={(event) => {setBody(event.target.value)}} value={body}/>
                <p>Input: {picture}</p>
                {/*<button>Toggle Theme, NOT working! Don't Click</button>*/}
            </header>   //
            
        </div>
    );
}

export default Frontpage;