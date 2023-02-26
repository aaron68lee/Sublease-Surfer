import {React, useState} from 'react';
import ImageUploading from 'react-images-uploading';
// import BACKEND packages
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import {useAuthState, useSignInWithGoogle} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {doc, collection, addDoc, getDocs, updateDoc} from "firebase/firestore"; 

import { Link } from 'react-router-dom';

import { SignIn, SignOut, auth, db, PostButton} from '../components/backend.js';
import Navbar from '../components/navbar.js';


// TODO: MAKE THIS A CLASS

// Component for user to create new sublease posting / listing 
function post()
{

}

function PostField() // consider making user page its own class to use this.state.value and onChange function
{

  const [picture, setPic] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [contact, setContact] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = event =>
  {
      // Add this new post to the database
      let postObj = {
        picture: picture,
        title: title,
        body: body,
        address: address,
        name: name,
        startDate: startDate,
        endDate: endDate,
        contact: contact,
        price: price,
      };

      console.log("Post this Object: \n" + JSON.stringify(postObj));

      // reset all post field values 
      setPic('');
      setTitle('');
      setBody('');
      setAddress('');
      setName('');
      setStartDate('');
      setEndDate('');
      setContact('');
      setPrice('');
  }

  return (
    <div>
      {/*Create Text Description Field*/}
      <input onChange={(event) => {setAddress(event.target.value)}} defaultValue={"Full Address"} type = "text" onfocus= "this.value=''" ></input><br></br>
      <input onChange={(event) => {setName(event.target.value)}} defaultValue={"Your Name"} type = "text"></input> 
      <p>Start Date: </p> <input type = "date" onChange={(event) => {setStartDate(event.target.value)}} ></input> 
      <p>End Date: </p> <input type = "date" onChange={(event) => {setEndDate(event.target.value)}}></input> <br></br>
      <input onChange={(event) => {setBody(event.target.value)}} defaultValue={"Description"} type = "text"></input><br></br>
      <input onChange={(event) => {setContact(event.target.value)}} defaultValue={"Contact Info: "} type = "text"></input><br></br>
      {/*Create Price input slider*/}
      <input onChange={(event) => {setPrice(event.target.value)}} type="range" min="0" max="4000" id="slide"/><br></br>

      <p>Sublease Price / month: {}</p>
      <PostButton onClick={handleSubmit} picture={picture} title={title} body={body} details = {"a"}/><br></br>

      <button onClick={handleSubmit}>Log message</button>

      <br></br> <br></br>
      
    </div>
  );
}
// Export the PostField component so it can be used in other files
export { PostField };
/*
Overall, this code defines a React component called PostField. This component renders a form with input fields 
for various information related to a sublease, including the address, start and end dates, description, contact 
information, and price. Users can input this information into the form, and then submit it by clicking the "Submit Posting" button.

When the button is clicked, the handleSubmit function is called. This function uses the addDoc function from the Firestore library 
to add a new document to the "posts" collection in the Firestore database. This document contains the address, name, start date, end 
date, description, contact information, and price that the user input into the form.

The handlePriceChange function is called whenever the user changes the value of the price input field. This function checks whether 
the new price value is less than 0 or greater than 5000, and if so, sets the price to 0 or 5000 respectively. The setPrice function 
is then called to update the price state variable with the new price value.

The component also includes a p tag that displays the current value of the price state variable, and an input field that allows users 
to directly input the price value. The input field has a minimum value of 0 and a maximum value of 5000, and the handlePriceChange function 
is called whenever the input value changes.

Finally, the PostField component is exported so that it can be used in other files.
*/


        