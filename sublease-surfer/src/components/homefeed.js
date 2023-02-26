import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../components/backend.js';

function HomeFeed() {
  const postsRef = db.collection('posts');
  const query = postsRef.orderBy('createdAt', 'desc').limit(25);

  const [posts] = useCollectionData(query, { idField: 'id' });
  const [searchTerm, setSearchTerm] = useState('');
  const [priceLow, setPriceLow] = useState('');
  const [priceHigh, setPriceHigh] = useState('');

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
      {filteredPosts && filteredPosts.map(post => (
        <div className='post' key={post.id}>
          <h2>Owner: {post.name}</h2>
          <img src={post.picture} alt='post image' />
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
