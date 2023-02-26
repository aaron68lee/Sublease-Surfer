import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../components/backend.js';
import ExpandedView from './expandedView.js';

function HomeFeed() {
  const postsRef = db.collection('posts');
  const query = postsRef.orderBy('createdAt', 'desc').limit(25);

  const [posts] = useCollectionData(query, { idField: 'id' });
  const [selectedPost, setSelectedPost] = useState(null);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  }

  return (
    <div className='post-grid'>
      <p>Browse Posts</p>
      {posts && posts.map(post => (
        <div className='post' key={post.id} onClick={() => handlePostClick(post)}>
          <h2>Owner: {post.name}</h2>
          <img src={post.picture} alt='post image' />
          <p>Address: {post.address}</p>
          <p>Details: {post.description}</p> {/* fix typo here */}
          <p>Dates: {post.startDate} to {post.endDate}</p> 
          <p>Price: {post.price}</p>
          <p>Contact: {post.contact}</p>
        </div>
      ))}
      {selectedPost && <ExpandedView post={selectedPost} />}
    </div>
  );
}

export default HomeFeed;
