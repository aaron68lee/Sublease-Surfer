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

function Navbar()
{
    return (
        <div>
            <Link to='/feed'> Home </Link>
            <Link to='/frontpage' onClick={() => auth.signOut()}> Logout </Link>
            <Link to='/insert-page-here'> Create Post </Link>
            <Link to='/profile'> Edit Profile </Link>
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