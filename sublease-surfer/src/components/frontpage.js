
import React from 'react';
import '../styles/App.css';
import CustomMap, { decodeLocations } from './map.js';

import {SignIn} from './backend';

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
            </header>

            <SignIn />

            <br/>
            <br/>

            <h2>UCLA Sublease Community</h2>
            <div text-align="center" className="CustomMap" width="200%">
                <CustomMap multipleMarkers = {true}/>
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