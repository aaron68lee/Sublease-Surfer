import React, {useState} from 'react';
import { Component } from 'react';
import ImageUploading from 'react-images-uploading';

// import BACKEND packages
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {doc, collection, addDoc, getDocs, updateDoc} from "firebase/firestore"; 

import {auth, post, calculateDistance} from '../components/backend.js';
import Navbar from '../components/navbar.js';

const campus = "308 Westwood Plaza";

function PostField() // consider making user page its own class to use this.state.value and onChange function
{

  const [pictures, setPictures] = useState('');
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [contact, setContact] = useState('');
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState('');

  // Handle image uploading
  const onChange = (imageList, addUpdateIndex) => {
    setPictures(imageList);
  };

  const removeImage = (index) => {
    const newPictures = [...pictures];
    newPictures.splice(index, 1);
    setPictures(newPictures);
  };

  async function handleSubmit(event)
  {
      // Add this new post to the database
      let postObj = {
        picture: pictures,
        title: title,
        description: description,
        address: address,
        name: name,
        startDate: startDate,
        endDate: endDate,
        contact: contact,
        price: price,
      };

      //console.log("Post this Object: \n" + JSON.stringify(postObj));
      
      try {
        // calculate distance to campus and wait for Promise to be resolved
        const distance = await calculateDistance(address, campus);
        // submit post with these fields to backend
        
        try {
          post(pictures, imageUrl, title, description, address, name, startDate, endDate, contact, price, distance); // will alert on success
          // reset all post field values 
          setPictures('');
          setTitle('');
          setDescription('');
          setAddress('');
          setName('');
          setDescription('');
          setStartDate('');
          setEndDate('');
          setContact('');
          setPrice(0);
          setImageUrl('');
        } catch(e) {
          console.error("One or more post fields invalid!" + e);
          alert("One or more post fields invalid!");
        }
      } catch(error) {
        console.error("Distance Calc Error: " + error);
        alert("Invalid Address");
      }
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
      <p>Add information about your listing here...</p>
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
      <p>Start Date:</p>{' '}
      <input
        type='date'
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        style={{color: '#96c93d'}}
      />
      <br />
      <p>End Date:  </p>{' '}
      <input
        type='date'
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        style={{color: '#96c93d'}}
        
      />
      <br />
      <br />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
      />
      <br />
      <input
        type='text'
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder='Image URL'
      />
      <br />
      
      {/* Add image uploading function
    <ImageUploading
        multiple
        value={pictures}
        onChange={onChange}
        maxNumber={1}
        dataURLKey="data_url"
      >
        {({
          onImageUpload,
          onImageRemoveAll,
          imageList,
          isDragging,
          dragProps,
        }) => (
          // display images and allow removal
          <div>
            <button
              className="upload__image-wrapper"
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop your Profile Picture here
            </button>
            &nbsp;
            <br/>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.data_url} alt="" width="500" />
                <div className="image-item__btn-wrapper">
                  <button className='remove' onClick={() => removeImage(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading> */}

      <input
        type='text'
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        placeholder='Contact Info:'
      />
      <br />
      {/* Create a price input field */}
      <br />
      {/* Display the current price value */}
      <span>Sublease Price / month: $</span>
      <input
        type='number'
        value={price}
        onChange={handlePriceChange}
        placeholder='Enter Exact Price Here'
        style={{ width: '16%'}}
      />
      <br />

      {/* Create a button to submit the form */}
      <button className='signIn' onClick={handleSubmit}>Submit Posting</button>
    </div>
  );
}

// Export the PostField component so it can be used in other files
export { PostField };


        