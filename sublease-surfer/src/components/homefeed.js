import React, {useState, useEffect} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { calculateDistance, db, readPosts } from '../components/backend.js';
import { Link } from 'react-router-dom';
import {orderBy, onSnapshot, limit, doc, collection, updateDoc, setDoc, query, where} from "firebase/firestore";
import { campusAddress } from './map.js';
import ExpandedView from './expandedView.js';

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

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

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
          <h2>{post.address}</h2>
          <h2> Walking Distance: {(post.distance !== null) ? (post.distance) + " miles" : ""} </h2>
          <img src={post.picture} alt="post image" className='main-listing-image'/>
          <h1 className='price'>${post.price}</h1>
        </div>
      ))}
      </div>

    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Post Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <ExpandedView post={expandedPost} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>

  </div>
  );
}

export default HomeFeed;