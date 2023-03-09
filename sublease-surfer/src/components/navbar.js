// ================ FIX THIS FILE IMPORTANT ================ 

import React from 'react';
import { Link } from 'react-router-dom';
import {auth, removeAllEntries} from './backend';

// import web app pages and variables
import '../App.css';

function Navbar()
{
    let user = auth.currentUser;
    return (
        <div className='navbar'>
            {user ? <p>Welcome: {auth.currentUser.displayName}</p> : <p></p>}
            {user.uid == "wRcRifVMqVUuxGpiPyKMdYuFbjI3" ? 
                <>
                <button color="red" onClick={() => {
                    if (window.confirm("Confirm purge of all posts?"))
                        removeAllEntries();
                }}>Delete All Posts</button>
                <button color="red" onClick={() => {
                    if (window.confirm("Confirm purge of all profiles?"))
                        removeAllEntries();
                }}>Delete All Profiles</button>
                </>
            : <p></p>}
            <Link to='/' className='navbutton'> Home </Link>
            <Link to='/browse' className='navbutton'> Browse </Link>
            <Link to='/add-listing' className='navbutton'> Add Listing </Link>
            <Link to='/profile' className='navbutton'> Profile </Link>
            <Link to='/frontpage' className='navbutton' onClick={() => auth.signOut()}> Logout </Link>
        </div>  
    );
}

export default Navbar;
