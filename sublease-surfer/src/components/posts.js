//import React from 'react';
import React, { useState } from 'react';
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


// Importing the useState hook and the addDoc function from the Firebase Firestore library
function PostField() {
  // Initializing state variables for the various fields of the form
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [price, setPrice] = useState(0);

  // Function to handle form submission
  const handleSubmit = async () => {
    // Add the new post to the "posts" collection in Firestore
    await addDoc(collection(db, 'posts'), {
      address,
      name,
      startDate,
      endDate,
      description,
      contactInfo,
      price
    });
    // Alert the user that the posting was submitted successfully
    alert('Posting submitted successfully!');
  };

  // Function to handle changes in the price input field and slider
  const handlePriceChange = (event) => {
    let newPrice = event.target.value;
    // If the new price is less than 0, set it to 0
    if (newPrice < 0) {
      newPrice = 0;
    }
    // If the new price is greater than 5000, set it to 5000
    else if (newPrice > 5000)
    {
      newPrice = 5000;
    }
    // Set the price state variable to the new price
    setPrice(newPrice);
  };  

  // Render the form
  return (
    <div>
      {/* Create input fields for the various form fields */}
      <input
        type='text'
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder='Full Address'
      />
      <br />
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Your Name'
      />
      <br />
      <p>Start Date: </p>{' '}
      <input
        type='date'
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <br />
      <p>End Date: </p>{' '}
      <input
        type='date'
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <br />
      <input
        type='text'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder='Description'
      />
      <br />
      <input
        type='text'
        value={contactInfo}
        onChange={(e) => setContactInfo(e.target.value)}
        placeholder='Contact Info:'
      />
      <br />
      {/* Create a price input slider */}
      <input
        type='range'
        min='0'
        max='5000'
        id='slide'
        value={price}
        style={{ width: '90%', height: '50px' }} 
        step="5"
        onChange={handlePriceChange}
      />
      {/* Create a price input field */}
      <br />
      <input
        type='number'
        value={price}
        onChange={handlePriceChange}
        placeholder='Enter Exact Price Here'
        style={{ width: '10%'}}
      />
      <br />
      {/* Display the current price value */}
      <p>Sublease Price / month: ${price}</p>
      {/* Create a button to submit the form */}
      <button onClick={handleSubmit}>Submit Posting</button>
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


        