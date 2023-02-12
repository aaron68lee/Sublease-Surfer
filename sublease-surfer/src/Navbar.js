// ================ FIX THIS FILE ================ 

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Awards from './pages/awards';
import Gallery from './pages/gallery';

function Navbar() {
    return (
        
        <Router>
            <Navbar />
            <Routes>
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
        </Router>
    );
}

export default Navbar;