import {React, useState, useEffect} from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db, readPosts } from '../components/backend.js';
import {orderBy, onSnapshot, limit, doc, collection, addDoc, getDocs, updateDoc, setDoc, query, where} from "firebase/firestore";

function HomeFeed() {
  /* This ABOVE block gets a reference to the posts collection in the Firebase database, 
  and creates a query to retrieve the 25 most recent posts, sorted in descending order by their createdAt field. */

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

  /* 
  // snapshots don't work
  querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      //console.log(doc.get("price"));
  });
  */

  // This ABOVE LINE uses the useCollectionData hook from the react-firebase-hooks package to listen for changes to the 
  // posts collection. The idField option specifies that the id field should be used as the unique identifier for each post.

  console.log("Posts: " + JSON.stringify(q));
  console.log("Num Posts: " + posts.length); // add this line to check the value of the posts array
    
  if (!posts) {
    return <div>...Loading Posts...</div>;
  }

  return (
    <div className='post-grid'>
      <p>Browse Posts</p>
 
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <h2>Owner: {post.name}</h2>
          <img src={post.picture} alt="post image" />
          <p>Address: {post.address}</p>
          <p>Details: {post.description}</p>
          <p>Dates: {post.startDate} to {post.endDate}</p>
          <p>Price: {post.price}</p>
          <p>Contact: {post.contact}</p>
        </div>
      ))}

      {/*}
      {posts && posts.map(post => (

        <div className='post' key={post.id}>
          <h2>Owner: {post.name}</h2>
          <img src={post.picture} alt='post image' />
          <p>Address: {post.address}</p>
          <p>Details: {post.description}</p> 
          <p>Dates: {post.startDate} to {post.endDate}</p> 
          <p>Price: {post.price}</p>
          <p>Contact: {post.contact}</p>
        </div>
      ))} */}
      
    </div>
  );
}

export default HomeFeed;
