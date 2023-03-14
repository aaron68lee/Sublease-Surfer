import React, {useState, useEffect} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db, auth, deletePost } from '../components/backend.js';
import { Link } from 'react-router-dom';
//import {TrackingProvider, TrackingContext} from '@vrbo/react-event-tracking';
import {orderBy, onSnapshot, limit, doc, collection, updateDoc, setDoc, query, where} from "firebase/firestore";
import { CustomMap } from './map.js';
import ExpandedView from './expandedView.js';

// import styling
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/pictureScroll.css';


function HomeFeed() {

  //const [posts] = useCollectionData(query, { idField: 'id' });
  // useState for dynamic field data regarding posts and search terms
  const [expandedPost, setExpandedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceLow, setPriceLow] = useState('');
  const [priceHigh, setPriceHigh] = useState('');
  const [tags, setTags] = useState([]);
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [deleted, setDeleted] = useState(false)

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleCloseProfile = () => setShowProfile(false);
  const handleShowProfile = () => setShowProfile(true);

  let maxPosts = 25;

  /* // use Effect to asynch update the walking distance from returned promise not necessary anymore
  const [walkingDistance, setWalkingDistance] = useState(null); 
  useEffect(() => {
    async function fetchWalkingDistance() {
      if (true)
      {
        console.log("ADDRESS: " + address)
        const distance = await calculateDistance(address, campusAddress);
        setWalkingDistance(distance);
        console.log('DISTANCE: ' + distance)
      }
      
    }
    fetchWalkingDistance();
  }, [address, campusAddress]);
  */

  // use effect to query database and update post values
  useEffect(() => {
    const q = query(
      collection(db, 'posts'),
      //orderBy('creationDate', 'desc'),
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

  // debug stuff
  //console.log("Posts: " + JSON.stringify(q));
  //console.log("Num Posts: " + posts.length); // add this line to check the value of the posts array

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
  
  //alert("Posts: " + filteredPosts.length + "\n" + JSON.stringify(filteredPosts));

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
        <div className='post' key={post.id} onClick={() => {
          
          handleShowModal();
          setExpandedPost(post);
        }}>
          <h3>{post.address}</h3>
          <h3> Walking Distance: {(post.distance !== null) ? (post.distance) + " miles" : ""} </h3>
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
   
    {/* DOESN'T WORK: Only show the expanded view if post has been clicked using Parent-Child state tracking*/}
    {/*}
    <TrackingProvider show={showModal} onClick={() => handleCloseModal()}>  
      {!showModal ? <ExpandedView post = {expandedPost}/> : <></>}
    </TrackingProvider>
    */}
    
    {/* ================================== EXPANDED MODAL ========================================= */}
    {showModal ? 
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
          <Modal.Title>{expandedPost.address}</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>

          <div class="picture-scroller">
            <div class="pictures">
              <img src={expandedPost.imageUrl} alt='post image' /> {/* ADD MORE PICS HERE FOR SCROLLING */}
            </div>
            {/*<button class="scroll-button left">&lt;</button>
            <button class="scroll-button right">&gt;</button>*/}
          </div>
          {/*<CustomMap multipleMarkers = {false} address={expandedPost.address}/>*/}
          <br/>
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
            <Modal.Body>Nested Modal Content</Modal.Body>
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