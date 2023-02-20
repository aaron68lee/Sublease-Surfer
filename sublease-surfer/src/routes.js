import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // <Routes> replaces <Switch> in dom version 6
import Frontpage from './frontpage';
import Homefeed from './components/homefeed.js';
import Profile from '/.components/profile.js';
import /*{ PostField, getSliderValue }*/ Posts from './components/posts.js';
import { SignIn, SignOut, auth, db} from './components/backend.js';
//import { CurrentUserProfile } from './components/profile.js';

// import BACKEND packages
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import {useAuthState, useSignInWithGoogle} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

  
function PrivateRoute({ component: Component, authed, ...rest }) {
    // only users who are authenticated can visit this kind of route
    // get user authentication token
    const [user] = useAuthState(auth);

    return (
        <Route
            {...rest}
            render={(props) =>
                auth.currentUser ? (
                    <Component {...props} />
                ) : (
                    <Navigate
                        to={{
                            pathname: '/login',
                            state: { from: props.location },
                            // pass the path to the login component, so that the
                            //  user will be redirected to the page they were trying
                            // to get to after logging in
                        }}
                    />
                )
            }
        />
    );
}


const Routes = () => {
    return (
        <Routes>
            <Route exact path="/frontpage" component={Frontpage}></Route>
            <PrivateRoute path="/browse" component={Homefeed}> </PrivateRoute>
            <PrivateRoute path="/add-listing" component={Posts}> </PrivateRoute>
            <PrivateRoute path="/profile" element={Profile}> </PrivateRoute>
        </Routes>
    );
};

export default Links;

