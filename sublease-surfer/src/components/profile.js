import React, {useEffect, useState} from 'react';
import ImageUploading from 'react-images-uploading';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {auth, db, postProfile, removePreviousProfiles} from '../components/backend.js';
import { doc, QuerySnapshot } from 'firebase/firestore';

function Profile()
{
  //React hooks for profile  
  const [loading, setLoading] = useState(true);
  const [pictures, setPictures] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [contact, setContact] = useState('');
  const [profiles, setProfiles] = useState([]);
  const [currUser, setCurrUser] = useState(null);

  // Handle image uploading
  const onChange = (imageList, addUpdateIndex) => {
    setPictures(imageList);
  };

  const removeImage = (index) => {
    const newPictures = [...pictures];
    newPictures.splice(index, 1);
    setPictures(newPictures);
  };

  useEffect(() => {
    const getDatabaseData = [];
    const user = db
    .collection("users")
    .onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        //console.log("Data: " + JSON.stringify(doc.data().uid));
        if(doc.data().uid == auth.currentUser.uid)
        {
          //console.log("I'M IN DATABASE");
          setCurrUser(doc.data());
          setBio(doc.data().bio);
          setContact(doc.data().contact);
        }
        
        getDatabaseData.push({
          ...doc.data(), //spread operator
          key: doc.id,
        });
      });
      //set profiles and finish loading when done
      setProfiles(getDatabaseData);
      setLoading(false);
    });
    // returns cleanup function
    return () => user();
  }, []); //empty dependencies array => useEffect only called


  //Returns a different page if the firebase data is loading
  if (loading) {
    return <h1>loading data...</h1>;
  }


  const handleSubmit = event =>
  {
      // Add this profile to the database
      let profileObj = {
        picture: pictures,
        name: name,
        bio: bio,
        contact: contact,
      };

      // reset all post field values 
      setPictures('');
      setName('');
      setBio('');
      setContact('');

    // CREATE A FUNCTION TO STORE PROFILES TO DB
    removePreviousProfiles(auth.currentUser.uid).then(() => {
      postProfile(pictures, name, bio, contact);
    });
  }

    // Render the form
    return (
    <div>
      {/* Create input fields for the various form fields */}
      <p> Edit your profile...</p>
      <textarea
        value={bio}
        onChange={e => setBio(e.target.value)}
        placeholder={"About you..."} //auth.currentUser ? auth.currentUser.uid : "About you..."}
      />
      <br />
      <textarea
        value={contact}
        onChange={e => setContact(e.target.value)}
        placeholder="Contact info..."
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
      
      {/* Create a button to submit the form */}
      <button className='signIn' onClick={handleSubmit}>Save Profile</button>
    </div>
  );
}

export default Profile;