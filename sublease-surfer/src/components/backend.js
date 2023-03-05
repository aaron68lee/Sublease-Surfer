// import FRONTEND packages
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';

// import BACKEND packages
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {orderBy, onSnapshot, limit, doc, collection, addDoc, getDocs, updateDoc, setDoc, query, where} from "firebase/firestore"; 

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

// ========================== Geodecode Location from Street Address ===========================

async function getLocationFromAddress(address) {
  const apiKey = apiKey;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.status !== 'OK') {
    throw new Error(`Geocoding error: ${data.status}`);
  }
  const result = data.results[0];
  const location = result.geometry.location;
  return {
    lat: location.lat,
    lng: location.lng,
  };
}

async function decodeLocations()
{
  
  const q = query(collection(db, "posts"));
  const querySnapshot = await getDocs(q);
    
  querySnapshot.forEach((doc) => {
      let address = address == '' ? '330 De Neve Drive' : doc.get('address');
      const location = getLocationFromAddress(address);
      console.log(location);
      console.log(doc.id, " => ", doc.data());
      console.log("Price: " + doc.get("price"));
  });
  
}


// write data to the database, db, creating a new sublease post for User === uid
// ========================== Write: Create Post for Listing ===========================
async function post(picture, title, body, address, name, startDate, endDate, contact, price) 
{
  
  let user = auth.currentUser;
  const ref = collection(db, 'posts');
    try {
     console.log(auth.currentUser);

        const docRef = await addDoc(collection(db, "posts"), {
          uid: user ? user.uid : null,
          username: user ? user.displayName : null,
          picture: picture, // find way to uplaod file with url?
          title: title,
          description: body,
          address: address,
          name: name,
          startDate: startDate,
          endDate: endDate,
          contact: contact,
          price: price,
        }).then(
          alert("Post made"),
        );
      
        console.log("Document written");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    
}

// ========================== Write: Create Profile ===========================
async function postProfile(picture, name, bio, contact) 
{
  
  let user = auth.currentUser;
  const ref = collection(db, 'users');
    try {
        const docRef = await addDoc(collection(db, "users"), {
          uid: user ? user.uid : null,
          username: user ? user.displayName : null,
          picture: picture, // find way to uplaod file with url?
          name: name, //Can be different than username associated with login
          contact: contact,
          bio: bio,
        }).then(
          alert("Profile Edited"),
        );
      
        console.log("Profile Document written");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    
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
    // get only latest 25 posts by creation date 
    let maxPosts = 25;
    const q = query(collection(db, "posts"), limit(maxPosts)); //orderBy("creationDate", "desc")) implement later
    //const [posts] = useCollectionData(q, { idField: "id" }); // listen for changes in the database as new posts get added
    const querySnapshot = await getDocs(q);
    
    
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        console.log("Price: " + doc.get("price"));
    });
    
    /*
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        console.log("Price: " + doc.get("price"));
      });
    });
    return unsubscribe;
    */
    //return querySnapshot;
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
        const provider = new firebase.auth.GoogleAuthProvider();
        signInWithPopup(auth, provider) // use signInWithRedirect for mobile devices preferred
          .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            navigate("/browse");
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
  const navigate = useNavigate();
  return auth.currentUser && (
    <div>
    <button className="signOut" onClick={() => {
      navigate('/');
      auth.signOut();
      }}>Sign Out
    </button>
    </div>
  )
}

export {SignIn, 
        SignOut,
        post,
        readPosts,
        postProfile,
        getLocationFromAddress,
        decodeLocations,
        auth, db};