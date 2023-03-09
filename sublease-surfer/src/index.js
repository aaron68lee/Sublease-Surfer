import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals';
import { PostField } from './components/posts';
//import { BrowserRouter, Router, Link, Routes, Route, Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom'; // <Routes> replaces <Switch> in dom version 6
//import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
