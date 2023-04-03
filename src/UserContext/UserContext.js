import React from 'react';
import { createContext } from 'react';
import { 
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword
    , GoogleAuthProvider, GithubAuthProvider, onAuthStateChanged, signInWithPopup,
    updateProfile, sendPasswordResetEmail, signOut, sendEmailVerification
} from "firebase/auth";
import app from  '../firebase.config/firebase.config';
import { useState } from 'react';
export const AuthProvider =  createContext();
const auth = getAuth(app);

const UserContext = ({ children } ) => {
    //get user info
    const [user, setUser] = useState({});
   const [loading, setLoading] = useState(true) ;
    //google auth provider
    const googleProvider = new GoogleAuthProvider();
    //github auth provider
    const githubProvider = new GithubAuthProvider();
    //create new user 
    const createUser = (email, password) => {
        setLoading(true) ;
        return createUserWithEmailAndPassword(auth, email, password);
    }
    //update user profile
    const updateUserProfile = (name, profile) => {
        setLoading(true) ;
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: profile,
        })
    }
    //login user 
    const loginUser = (email, password) => {
        setLoading(true) ;
        return signInWithEmailAndPassword(auth, email, password);
    }
    //googel sign in
    const googelSignIn = () => {
        setLoading(true) ;
        return signInWithPopup(auth, googleProvider);
    }
    //github sign in 
    const githubSignIn = () => {
        return signInWithPopup(auth, githubProvider);
    }
    //get user information by on auth state change 
    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userInfo) => {
            if (userInfo) {
                setLoading(false) ;
                return setUser(userInfo);
            }
        })
        return () => unsubscribe();
    }, []);
    //log out user 
    const logOutUser = () => {
        return auth.signOut();
    }
    //reset password 
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

      //send email verification
      const sendEmailVerify = () => {
        setLoading(true) ;
        return sendEmailVerification(auth.currentUser);
    }

  //sign out user
  const signOutUser = () => {
    return signOut(auth) ;
    }

    //share data with all components
    const authInformation = {
        createUser, loginUser, user, setUser, updateUserProfile, logOutUser,
        googelSignIn, githubSignIn, resetPassword, loading , signOutUser, sendEmailVerify
    };
    return (
        <React.Fragment>
            <AuthProvider.Provider value={authInformation}>
                {children}
            </AuthProvider.Provider>
        </React.Fragment>
    )
};

export default UserContext;