
import React from 'react';
import './App.css';
import CustomMap, { decodeLocations } from './components/map.js';

import {SignIn} from './components/backend';

// displayed when user is NOT signed in

function Frontpage()
{
    return (
        <div text-align="center" className="page-container">
            
            <header className="App-header">
                <div className='App-title'>
                 <h1>Sublease Surfer</h1>
                <h1>Sublease Surfer</h1>   
                </div>                
                <SignIn />
                <br/>
                <br/>
            </header>

            <div text-align="center" className="CustomMap" width="800%">
                    <CustomMap multipleMarkers = {true} address="308 Westwood Plaza"/>
            </div>

            <br/>
            <br/>

            <footer>
                <p>A web application made at UCLA for CS35L by Aaron, Ethan, Jason, Kenzie, and Michael. 🏄‍♂️ </p>
            </footer>
        </div>
    );
}

export default Frontpage;