// import FRONTEND packages
import React, {useRef, useState} from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';

// import BACKEND packages
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {doc, collection, addDoc, getDocs, updateDoc, setDoc, query, where} from "firebase/firestore"; 

// import web app pages and variables
import '../App.css'; //.. is used because App.css isn't in the components folder, it's in components' parent directory

// ========================== initialize backend: Google Firebase ===========================

// Import the functions you need from the SDKs you need
import { initializeApp, getFirestore} from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Initialize Firebase Backend
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBysQ6DRQtUpCZKvcW0mhYNP-wp_KRUrto",
    authDomain: "sublease-surfer.firebaseapp.com",
    projectId: "sublease-surfer",
    storageBucket: "sublease-surfer.appspot.com",
    messagingSenderId: "520847563465",
    appId: "1:520847563465:web:e1c4f6beb69e6e94104b18",
    measurementId: "G-HF52PR1GMX"
  };

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore(); // db = firebase.firestore() for database access

// write data to the database, db, creating a new sublease post for User === uid
// ========================== Write: Create Post ===========================
async function post(picture, title, body) 
{
  
  const ref = collection(db, 'posts');
    try {
      /*
      db.collection('posts').add({
        uid: auth.currentUser,
        username: auth.currentUser.displayName,
        picture: picture, // find way to uplaod file
        title: title,
        description: body,
      });
      */
     readPosts();
     console.log(auth.currentUser);
        const docRef = await addDoc(collection(db, "posts"), {
          uid: auth.currentUser.uid,
          username: auth.currentUser.displayName,
          picture: picture, // find way to uplaod file
          title: title,
          description: body,
        }).then(
          alert("Post made"),
        );
      
        console.log("Document written");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    
}

// ========================== Post Button ===========================
// post button component
function PostButton({picture, title, body}) // uid, username, picture, title, body 
{
  const navigate = useNavigate();
  return (
    <>
    <button className="post" 
      onClick={() =>{
        post(picture, title, body);
        //initializePost();
        //post("pic", "title", Date.now().toString);
        navigate("/feed");
      }}>Submit Posting</button>
    </>
  );
}

// ========================== Delete Post ===========================
async function deletePost(uid, username, picture, title, body) 
{
    try {
        console.log("Post deleted");
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}

// read data from the database, db
// ========================== Read ____ ===========================
// tags is an arrayof tag filters for querying criteria
async function readPosts(tags) 
{
    const q = query(collection(db, "posts"), where("Price", ">", 3000)); // add conditional criteria?
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        console.log(doc.get("Price"));
    });
}

// component displayed when user NOT signed in 
// ========================== Sign In ===========================

function SignIn()
{
  const navigate = useNavigate();
  return (
    <button className="signIn" 
      onClick={() =>{
        //useSignInWithGoogle();
        navigate("/feed");

        const provider = new firebase.auth.GoogleAuthProvider();
        signInWithPopup(auth, provider) // use signInWithRedirect for mobile devices preferred
          .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            //alert("Sign In Error occurred.");
          });

      }}>Sign in with Google</button>
  );
}

function useSignInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  signInWithPopup(auth, provider) // use signInWithRedirect for mobile devices preferred
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      //alert("Sign In Error occurred.");
    });
  console.log("Login clicked!");
  }


// ========================== SignOut ===========================
// component displayed when user IS signed in 
function SignOut()
{
  return auth.currentUser && (
    <div>
    <button className="signOut" onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  )
}

// ========================== Event Listeners ===========================
// Bindings on load event listeners


/**
 * Starts listening for new posts and populates posts lists.
 */
// ========================== Database Querying ===========================
/*
function startDatabaseQueries() {
  var myUserId = firebase.auth().currentUser.uid;
  var topUserPostsRef = firebase.database().ref('user-posts/' + myUserId).orderByChild('starCount');
  var recentPostsRef = firebase.database().ref('posts').limitToLast(100);
  var userPostsRef = firebase.database().ref('user-posts/' + myUserId);

  var fetchPosts = function(postsRef, sectionElement) {
    postsRef.on('child_added', function(data) {
      var author = data.val().author || 'Anonymous';
      var containerElement = sectionElement.getElementsByClassName('posts-container')[0];
      containerElement.insertBefore(
        createPostElement(data.key, data.val().title, data.val().body, author, data.val().uid, data.val().authorPic),
        containerElement.firstChild);
    });
    postsRef.on('child_changed', function(data) {
      var containerElement = sectionElement.getElementsByClassName('posts-container')[0];
      var postElement = containerElement.getElementsByClassName('post-' + data.key)[0];
      postElement.getElementsByClassName('mdl-card__title-text')[0].innerText = data.val().title;
      postElement.getElementsByClassName('username')[0].innerText = data.val().author;
      postElement.getElementsByClassName('text')[0].innerText = data.val().body;
      postElement.getElementsByClassName('star-count')[0].innerText = data.val().starCount;
    });
    postsRef.on('child_removed', function(data) {
      var containerElement = sectionElement.getElementsByClassName('posts-container')[0];
      var post = containerElement.getElementsByClassName('post-' + data.key)[0];
      post.parentElement.removeChild(post);
    });
  };

  // Fetching and displaying all posts of each sections.
  fetchPosts(topUserPostsRef, topUserPostsSection);
  fetchPosts(recentPostsRef, recentPostsSection);
  fetchPosts(userPostsRef, userPostsSection);

  // Keep track of all Firebase refs we are listening to.
  listeningFirebaseRefs.push(topUserPostsRef);
  listeningFirebaseRefs.push(recentPostsRef);
  listeningFirebaseRefs.push(userPostsRef);
}

// Cleanups the UI and removes all Firebase listeners.
 
// ========================== UI Cleanup ===========================
function cleanupUi() {
  // Remove all previously displayed posts.
  topUserPostsSection.getElementsByClassName('posts-container')[0].innerHTML = '';
  recentPostsSection.getElementsByClassName('posts-container')[0].innerHTML = '';
  userPostsSection.getElementsByClassName('posts-container')[0].innerHTML = '';

  // Stop all currently listening Firebase listeners.
  listeningFirebaseRefs.forEach(function(ref) {
    ref.off();
  });
  listeningFirebaseRefs = [];
}
*/

// ========================== Test Functions ===========================

/**
 * Triggers every time there is a change in the Firebase auth state (i.e. user signed-in or user signed out).
 */
/*
function onAuthStateChanged(user) {
  // We ignore token refresh events.
  if (user && currentUID === user.uid) {
    return;
  }

  cleanupUi();
  if (user) {
    currentUID = user.uid;
    splashPage.style.display = 'none';
    writeUserData(user.uid, user.displayName, user.email, user.photoURL);
    startDatabaseQueries();
  } else {
    // Set currentUID to null.
    currentUID = null;
    // Display the splash page where you can sign-in.
    splashPage.style.display = '';
  }
}

// Chatroom Functionality 
function ChatRoom()
{
  const dummy = useRef();
  const messagesRef = db.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'}); // use React Hooks to detect component change and re-render()

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    // this object HAS TO MATCH backend collection object type with SAME FIELDS
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!formValue}>🕊️</button>

    </form>
  </>)

}

// Chat message component logic
function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{text}</p>
    </div>
  </>)
}
*/

export {SignIn, 
        SignOut, 
        PostButton,
        post,
        readPosts,
        auth, db};