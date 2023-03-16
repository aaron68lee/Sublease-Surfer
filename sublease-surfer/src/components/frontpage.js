
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
            <h2>A platform dedicated to subleasing apartments in the UCLA community.</h2>
            <SignIn />

            <br/>
            <br/>

            
            <div text-align="center" className="CustomMap" width="200%">
                <CustomMap multipleMarkers = {true}/>  
            </div>

            {/*<div text-align="center" className="CustomMap" width="200%">
            <CustomMap multipleMarkers = {false} address={"308 Westwood Plaza"}/>
            </div>*/}

            <br/>
            <br/>

            <footer>
                <p>A web application made at UCLA for CS35L by Aaron, Ethan, Jason, Kenzie, and Michael. 🏄‍♂️ </p>
            </footer>
        </div>
    );
}

export default Frontpage