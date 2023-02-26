import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../components/backend.js';

/* This ABOVE block imports the necessary packages and initializes the HomeFeed function. */

function HomeFeed() {
  const postsRef = db.collection('posts');
  const query = postsRef.orderBy('createdAt', 'desc').limit(25); // get the 25 most recent posts

  /* This ABOVE block gets a reference to the posts collection in the Firebase database, 
  and creates a query to retrieve the 25 most recent posts, sorted in descending order by their createdAt field. */

  const [posts] = useCollectionData(query, { idField: 'id' }); // listen for changes to the collection of posts

  /* This ABOVE LINE uses the useCollectionData hook from the react-firebase-hooks package to listen for changes to the 
  posts collection. The idField option specifies that the id field should be used as the unique identifier for each post. */


  return (
    
    <div className='post-grid'>
      <p>Browse Posts</p>
      {posts && posts.map(post => (
        <div className='post' key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <img src={post.imageUrl} alt='post image' />
        </div>
      ))}
    </div>
  );

  /* This ABOVE block returns a list of posts in an HTML grid format. It first checks if posts exists (i.e., is not null or undefined) 
  using the && operator. Then, it maps over each post in the posts array, and creates a <div> element for each one, with a unique
  key attribute set to the post's id. The post's title, content, and imageUrl fields are displayed within each <div>. The className 
  attributes are used to apply CSS styles to the elements. */
}

export default HomeFeed;