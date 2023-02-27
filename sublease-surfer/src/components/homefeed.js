import React, {useState, useEffect} from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db, readPosts } from '../components/backend.js';
import { Link } from 'react-router-dom';
import {orderBy, onSnapshot, limit, doc, collection, addDoc, getDocs, updateDoc, setDoc, query, where} from "firebase/firestore";

function HomeFeed() {

  //const [posts] = useCollectionData(query, { idField: 'id' });
  // useState for dynamic field data regarding posts and search terms
  const [searchTerm, setSearchTerm] = useState('');
  const [priceLow, setPriceLow] = useState('');
  const [priceHigh, setPriceHigh] = useState('');
  const [tags, setTags] = useState([]);
  const [posts, setPosts] = useState([]);

  // query the database for posts
  let maxPosts = 25;
  //const [posts] = useCollectionData(q, { idField: 'id' }); // listen for changes to the collection of posts
  //readPosts(tags); // debug purposes to read posts

  
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
  
  
  const filteredPosts = posts && posts.filter(post =>
    post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.contact.toLowerCase().includes(searchTerm.toLowerCase()) &&
    ((priceLow === '' || post.price >= priceLow) &&
    (priceHigh === '' || post.price <= priceHigh))
  );
  
  //alert("Posts: " + filteredPosts.length + "\n" + JSON.stringify(filteredPosts));

  return (
    <div className='post-grid'>
      <div className='search-container'>
        <input type='text'
          placeholder='Search'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input type='number'
          placeholder='Low'
          value={priceLow}
          onChange={handlePriceLowChange}
        />
        <input type='number'
          placeholder='High'
          value={priceHigh}
          onChange={handlePriceHighChange}
        />
      </div>
  
      <p>Browse Posts</p>

      {/* Make Post component for every post in filteredPosts */}
      {filteredPosts && filteredPosts.map(post => (
        <div className='post' key = {post.id}>
          <h2>Owner: {post.name}</h2>
          <img src={post.picture} alt="post image" />
          <ul>
            <li>Address: {post.address}</li>
            <li>Details: {post.description}</li>
            <li>Dates: {post.startDate} to {post.endDate}</li>
            <li>Price: {post.price}</li>
            <li>Contact: {post.contact}</li>
          </ul>
          <Link to="/profile">{post.name}'s Profile</Link>
          
        </div>
      ))}
 
    </div>
  );
  
}

export default HomeFeed;
