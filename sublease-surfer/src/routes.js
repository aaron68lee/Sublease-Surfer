import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // <Routes> replaces <Switch> in dom version 6
import Frontpage from './frontpage';
import { PostField, getSliderValue } from './components/posts.js';
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


const Links = () => {
    return (
        <Routes>
            <Route path="/frontpage" element={<Frontpage/>}></Route>
            <PrivateRoute path="/upload" element={<PostField/>} /> {/* Create a Post Page! */}

            {/* Pages that haven't been done */}
            {//<PrivateRoute path="/feed" element={<MainFeed/>} /> {/* Main Page of Postings */}
            }
            {//<PrivateRoute path="/profile" element={<EditProfile/>} /> {/* Edit Own Profile */}
            }

        </Routes>
    );
};

export default Links;

