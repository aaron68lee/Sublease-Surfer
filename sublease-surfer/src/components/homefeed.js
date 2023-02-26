import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../components/backend.js';

function HomeFeed() {
  const postsRef = db.collection('posts');
  const query = postsRef.orderBy('createdAt', 'desc').limit(25);

  const [posts] = useCollectionData(query, { idField: 'id' });
  
  console.log(posts); // add this line to check the value of the posts array
  
  return (
    <div className='post-grid'>
      <p>Browse Posts</p>
      {posts && posts.map(post => (
        <div className='post' key={post.id}>
          <h2>Owner: {post.name}</h2>
          <img src={post.picture} alt='post image' />
          <p>Address: {post.address}</p>
          <p>Details: {post.description}</p> {/* fix typo here */}
          <p>Dates: {post.startDate} to {post.endDate}</p> 
          <p>Price: {post.price}</p>
          <p>Contact: {post.contact}</p>
        </div>
      ))}
    </div>
  );
}

export default HomeFeed;
