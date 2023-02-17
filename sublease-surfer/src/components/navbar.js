// ================ FIX THIS FILE IMPORTANT ================ 

import React from 'react';
import { Link } from 'react-router-dom';

import {auth} from './backend';

/* 

REWRITE ACCORDINGLY

import Home from './pages';
import About from './pages/about';
import Awards from './pages/awards';
import Gallery from './pages/gallery';
*/

// import web app pages and variables
import '../App.css';

function Navbar()
{
    return (
        <div className='navbar'>
            <Link to='/feed' className='navbutton'> Browse </Link>
            <Link to='/insert-page-here' className='navbutton'> Add Listing </Link>
            <Link to='/profile' className='navbutton'> Edit Profile </Link>
            <Link to='/frontpage' className='navbutton' onClick={() => auth.signOut()}> Logout </Link>
        </div>
        
    );
}

export default Navbar;

/*

{<div>
            <Link to='/insert-page-here'>Edit Profile</Link>
            <Link to='/insert-page-here'>Create Post</Link>
        </div> 
       

OLD CODE: 

<Routes>
    <Link to='/insert-page-here'></Link>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/awards" element={<Awards />} />
    <Route path="/gallery" element={<Gallery />} />
</Routes>
<div class = "navbar">
    <NavLink to="/">Home </NavLink>
    <NavLink to="/about">About </NavLink>
    <NavLink to="/awards">Awards </NavLink>
    <NavLink to="/gallery">Gallery </NavLink>
</div>

*/