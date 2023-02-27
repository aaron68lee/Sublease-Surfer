import React, {useState} from 'react';
import ImageUploading from 'react-images-uploading';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {auth, db, postProfile} from '../components/backend.js';

function Profile()
{
  //React hooks for profile  
  const [pictures, setPictures] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [contact, setContact] = useState('');

  // Handle image uploading
  const onChange = (imageList, addUpdateIndex) => {
    setPictures(imageList);
  };

  const removeImage = (index) => {
    const newPictures = [...pictures];
    newPictures.splice(index, 1);
    setPictures(newPictures);
  };

  const handleSubmit = event =>
  {
      // Add this profile to the database
      let profileObj = {
        picture: pictures,
        name: name,
        bio: bio,
        contact: contact,
      };

      console.log("Post this Object: \n" + JSON.stringify(profileObj));

      // reset all post field values 
      setPictures('');
      setName('');
      setBio('');
      setContact('');

    // CREATE A FUNCTION TO STORE PROFILES TO DB
    postProfile(pictures, name, bio, contact);
}
    // Render the form
    return (
    <div>
      {/* Create input fields for the various form fields */}
      <p> Edit your profile...</p>
      <textarea
        value={bio}
        onChange={e => setBio(e.target.value)}
        placeholder="About you..."
      />
      <br />
      <textarea
        value={contact}
        onChange={e => setContact(e.target.value)}
        placeholder="Contact info..."
      />
      <br />

    {/* Add image uploading function */}
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
      </ImageUploading>
      
      {/* Create a button to submit the form */}

      <button className='signIn' onClick={handleSubmit}>Save Profile</button>
    </div>
  );
}

export default Profile;