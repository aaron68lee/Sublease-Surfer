import {React, useState, useEffect} from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db, readPosts } from '../components/backend.js';
import {orderBy, onSnapshot, limit, doc, collection, addDoc, getDocs, updateDoc, setDoc, query, where} from "firebase/firestore";

function HomeFeed() {

  //const [posts] = useCollectionData(query, { idField: 'id' });
  const [searchTerm, setSearchTerm] = useState('');
  const [priceLow, setPriceLow] = useState('');
  const [priceHigh, setPriceHigh] = useState('');
  const [tags, setTags] = useState([]);
  const [posts, setPosts] = useState([]);

  let maxPosts = 25;
  const q = query(collection(db, "posts"), orderBy("creationDate", "desc"), limit(maxPosts));
  //const [posts] = useCollectionData(q, { idField: 'id' }); // listen for changes to the collection of posts
  const querySnapshot = readPosts(tags);
  
  useEffect(() => {
    const q = query(
      collection(db, 'posts'),
      orderBy('creationDate', 'desc'),
      limit(25),
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if(tags.length == 0)
      {
        const filteredPosts = querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((post) => tags.every((tag) => post.tags.includes(tag)));
        setPosts(filteredPosts);
      }
      else {
        const filteredPosts = querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        setPosts(filteredPosts); 
      }
    });
    return unsubscribe;
  }, [tags]);

  console.log("Posts: " + JSON.stringify(q));
  console.log("Num Posts: " + posts.length); // add this line to check the value of the posts array
    
  if (!posts) {
    return <div>...Loading Posts...</div>;
  }

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
    post.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (priceLow === '' || post.price >= priceLow) &&
    (priceHigh === '' || post.price <= priceHigh)
  );

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
  
      {filteredPosts && filteredPosts.map(post => (
        <div className='post' key={post.id}>
          <h2>Owner: {post.name}</h2>
          <img src={post.picture} alt="post image" />
          <p>Address: {post.address}</p>
          <p>Details: {post.description}</p>
          <p>Dates: {post.startDate} to {post.endDate}</p>
          <p>Price: {post.price}</p>
          <p>Contact: {post.contact}</p>
        </div>
      ))}
  
    </div>
  );
  
}

export default HomeFeed;