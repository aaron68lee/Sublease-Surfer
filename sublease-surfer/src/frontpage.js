
import React from 'react';
import './App.css';
import CustomMap from './components/map.js';

import {SignIn} from './components/backend';

// displayed when user is NOT signed in

function Frontpage()
{
    return (
        <div className="page-container">
            
            <header className="App-header">

                <h1>Sublease Surfer</h1>
                <SignIn />
                <p>Interactive Map</p>
                <CustomMap/>
        
            </header>
        </div>
    );
}

export default Frontpage;