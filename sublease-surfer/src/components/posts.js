import React from 'react';
// import BACKEND packages
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import {useAuthState, useSignInWithGoogle} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {doc, collection, addDoc, getDocs, updateDoc} from "firebase/firestore"; 

import { Link } from 'react-router-dom';

import { SignIn, SignOut, auth, db} from '../components/backend.js';
import Navbar from '../components/navbar.js';


// TODO: MAKE THIS A CLASS

// Component for user to create new sublease posting / listing 
function PostField() // consider making user page its own class to use this.state.value and onChange function
{
  
  return (
    <div>
      {/*Create Text Description Field*/}
      <input defaultValue={"Full Address"} type = "text"></input><br></br>
      <input defaultValue={"Your Name"} type = "text"></input> 
      <p>Start Date: </p> <input type = "date"></input> 
      <p>End Date: </p> <input type = "date"></input> <br></br>
      <input defaultValue={"Description"} type = "text"></input><br></br>
      <input defaultValue={"Contact Info: "} type = "text"></input><br></br>
      {/*Create Price input slider*/}
      <input type="range" min="0" max="4000" id="slide"/><br></br>

      <p>Sublease Price / month: {}</p>
      <button onClick={alert("submit clicked")}>Submit Posting</button>
    </div>
  // onClick={ TO DO - add posting data to database
  )

}

// doesn't work, 
function getSliderValue()
{
  var slider = slider ? document.getElementById("slide").value : 0;
  alert(slider);
  alert("hi");
}

export {getSliderValue, 
        PostField,};
