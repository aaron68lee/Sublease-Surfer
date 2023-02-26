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
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [contact, setContact] = useState('');
  const [price, setPrice] = useState(0);

  const handleSubmit = event =>
  {
      // Add this new post to the database
      let postObj = {
        picture: picture,
        title: title,
        description: description,
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
      setDescription('');
      setAddress('');
      setName('');
      setDescription('');
      setStartDate('');
      setEndDate('');
      setContact('');
      setPrice(0);
  }

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
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
        style={{ width: '30%', height: '100px' }}
      />
      <br />
      <input
        type='text'
        value={contact}
        onChange={(e) => setContact(e.target.value)}
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


        