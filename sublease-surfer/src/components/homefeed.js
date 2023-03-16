import React, {useState, useEffect} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db, auth, deletePost, getPostCreator, post } from '../components/backend.js';
import { Link } from 'react-router-dom';
import {orderBy, onSnapshot, limit, doc, collection, updateDoc, setDoc, query, where} from "firebase/firestore";
import { CustomMap } from './map.js';
import ExpandedView from './expandedView.js';

// import styling
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/pictureScroll.css';


function HomeFeed() {

  // useState for dynamic field data regarding posts and search terms
  const [expandedPost, setExpandedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceLow, setPriceLow] = useState('');
  const [priceHigh, setPriceHigh] = useState('');
  const [tags, setTags] = useState([]);
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [currProfile, setCurrProfile] = useState([]);
  const [deleted, setDeleted] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleCloseProfile = () => setShowProfile(false);
  const handleShowProfile = () => setShowProfile(true);

  let maxPosts = 25;

  // use effect to query database and update post values
  useEffect(() => {
    const q = query(
      collection(db, 'posts'),
      limit(25),
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      //if(tags.length == 0)
        const postdata = querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((post) => tags.every((tag) => post.tags.includes(tag)));
        setPosts(postdata);
    });
    return unsubscribe;
  }, [tags]);


  //useEffect hook to retrieve info about a person's post
  useEffect(() => {
    const getDatabaseData = [];
    const user = db
    .collection("users")
    .onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        //console.log("Data: " + JSON.stringify(doc.data().uid));
        if(doc.data().uid == expandedPost.uid) //(auth.currentUser.uid)
        {
          console.log("UID found: " + expandedPost.uid);
          setCurrProfile(doc.data());
        }
        getDatabaseData.push({
          ...doc.data(), //spread operator
          key: doc.id,
        });
      });
      //set profiles and finish loading when done
      setProfiles(getDatabaseData);
    });
    // returns cleanup function
    return () => user();
  }, [expandedPost]); //empty dependencies array => useEffect only called

  function getExpandedProfileHash() {
    
  }

  // posts do not exist then return loading screen
  if (posts.length == 0) {
    return <div>...Loading Posts...</div>;
  }

  // useState for search query for users
  const handlePriceLowChange = (e) => {
    if (e.target.value === '') {
      setPriceLow('');
    } else {
      const value = parseInt(e.target.value);
      if (!isNaN(value) && value >= 0) {
        setPriceLow(value);
      }
    }
  };

  const handlePriceHighChange = (e) => {
    if (e.target.value === '') {
      setPriceHigh('');
    } else {
      const value = parseInt(e.target.value);
      if (!isNaN(value) && value >= 0) {
        setPriceHigh(value);
      }
    }
  };
  
  // filter posts based on price and search terms
  const filteredPosts = posts && posts.filter(post =>
    (post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.contact.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (priceLow === '' || post.price >= parseInt(priceLow)) &&
    (priceHigh === '' || post.price <= parseInt(priceHigh))
  );
  

  return (
    <div>
      <div className='search-container'>
        <input className = 'search-filter'
          type='text'
          placeholder='Search'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input className = 'search-filter'
          type='number'
          placeholder='Low'
          value={priceLow}
          onChange={handlePriceLowChange}
        />
        <input className = 'search-filter'
          type='number'
          placeholder='High'
          value={priceHigh}
          onChange={handlePriceHighChange}
        />
      </div>
      <div className='post-grid'>
      {filteredPosts && filteredPosts.map
      (post => (
        <div className='post' key={post.id} onClick={async () => {
          handleShowModal();
          setExpandedPost(post);
          // setCurrProfile(currProfile)
        }}>
          <h2> {/*<img src= "./assets/address.png" alt="imgWalk" />*/} 📍{post.address}</h2>
          <h3> {/*<img src="./assets/walk.png" alt="imgAddress"/>*/} 🚶{(post.distance !== null) ? (post.distance) + " miles to UCLA" : ""} </h3>
          <img src={post.imageUrl} alt="post image" className='main-listing-image'/>
          <h1 className='price'>${post.price}</h1>
          {/* Delete button only appears for user who made post*/}
          {(auth.currentUser.uid == post.uid) ? <button onClick={() => {
            //alert("Post id: " + post.id)
            deletePost(post.id);
            setDeleted(true);
            }}>Delete Post</button> : <></>} 
          {/*<CustomMap multipleMarkers = {false} address={post.address}/>*/} {/* REMOVE LATER PUT IN MODAL */}
        </div>
      ))}
      </div>
   
    
    {/* ================================== EXPANDED MODAL ========================================= */}
    {showModal ? 
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
          <Modal.Title>{expandedPost.address}</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <p>Owner: {expandedPost.name}</p>
          <div class="picture-scroller">
            <div class="pictures">
              <img src={expandedPost.imageUrl} alt='post image' /> {/* ADD MORE PICS HERE FOR SCROLLING */}
            </div>
            {/*<button class="scroll-button left">&lt;</button>
            <button class="scroll-button right">&gt;</button>*/}
          </div>
          {/*
          <div text-align="center" className="CustomMap" width="200%">
            <CustomMap multipleMarkers = {false} address={expandedPost.address}/>
          </div>
          */}
         
          <br></br>
          <p>{expandedPost.description}</p>
          <p>Available: {expandedPost.startDate} to {expandedPost.endDate}</p>
          <p>Price: ${expandedPost.price}</p>
          <p>Contact: {expandedPost.contact}</p>  

        </Modal.Body>

        <Modal.Footer>

          {/* Nested modal */}
          <Modal show={showProfile} onHide={handleCloseProfile}>
            <Modal.Header closeButton>
              <Modal.Title>User Profile</Modal.Title>
            </Modal.Header>
            {currProfile ? 
            <Modal.Body>
              Name: {currProfile.username}
              <br></br>
              <br></br>
              About them: {currProfile.bio}
              <br></br>
              <br></br>
              Contact Info: {currProfile.contact}
              <br></br>
              <br></br>
            </Modal.Body>
            : <></>
            }
          </Modal>

          {/* Button to show profiles */}
          <Button variant="primary" onClick={() => setShowProfile(true)}>
           Open User Profile
          </Button>   

          <Button variant='secondary' onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
    </Modal>
    :
    <></>
    }
      
  </div>
  );
}

export default HomeFeed;