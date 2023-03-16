
import React from 'react';
import { Link } from 'react-router-dom';
import {auth, removeAllEntries, calculateDistance} from './backend';

// import web app pages and variables
import '../styles/App.css';

function Navbar()
{
    let user = auth.currentUser;

    return (
        <div>
            {user ? <p className='displayname'>Welcome {auth.currentUser.displayName} !</p> : <p></p>}
        <div className='navbar'>
            {user.uid == "DELETEME_wRcRifVMqVUuxGpiPyKMdYuFbjI3" ? 
                <>
                <button color="red" onClick={() => {
                    if (window.confirm("Confirm purge of all posts?"))
                        removeAllEntries('posts');
                }}>Delete All Posts</button>
                <button color="red" onClick={() => {
                    if (window.confirm("Confirm purge of all profiles?"))
                        removeAllEntries('users');
                }}>Delete All Profiles</button>

                </>
            : <p></p>}
            <Link to='/' className='navbutton'> Home </Link>
            <Link to='/browse' className='navbutton'> Browse </Link>
            <Link to='/add-listing' className='navbutton'> Add Listing </Link>
            <Link to='/profile' className='navbutton'> Profile </Link>
            <Link to='/frontpage' className='navbutton' onClick={() => auth.signOut()}> Logout </Link>
        </div>  
        </div>
    );
}

export default Navbar;
