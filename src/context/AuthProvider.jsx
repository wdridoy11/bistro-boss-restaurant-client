import React, { createContext, useEffect, useState } from 'react';
import {
    getAuth,
    signOut,
    updateProfile,
    signInWithPopup,
    GithubAuthProvider,
    GoogleAuthProvider,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
} from 'firebase/auth'
import app from '../utils/firebase/firebase.config';
import axios from 'axios';
export const AuthContetxt = createContext();

const AuthProvider = ({children}) => {
    const [user,setUser] = useState();
    const [loading, setLoading] = useState(true);
    const auth = getAuth(app)
    
    // create user using google 
    const createUserUsingGoogle=()=>{
        setLoading(true)
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth,googleProvider)
    }

    // create user using github 
    const createUserUsingGithub=()=>{
        const githubProvider = new GithubAuthProvider();
        signInWithPopup(auth,githubProvider)
        .then((res)=>{
            const user = res.user;
            console.log(user)
        })
        .catch((error)=>{
            console.log(error.message)
        })
    }
    // create user using email and pasword
    const createUserUsingEmail=(email,password)=>{
       setLoading(true)
       return createUserWithEmailAndPassword(auth,email,password)
    }
    // user login
    const userLogin =(email,password)=>{
       return userLogin(auth,email,password)
    }

    // user logout
    const userLogout =()=>{
        setLoading(true)
       return signOut(auth)
    }

    // user profile updata
    const userProfileUpdate=(name,photo)=>{
      return updateProfile(auth.currentUser,{
            displayName:name,
            photoURL:photo
        })
    }

    // user active check
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            // access_token set localStorage
            if(currentUser){
                axios.post("http://localhost:5000/jwt",{email: currentUser.email})
                .then((data)=>{
                    localStorage.setItem("access_token",data.data)
                    setLoading(false)
                })
            }else{
                localStorage.removeItem("access_token")
            }
        })
        return()=>{
           return unSubscribe();
        }
    },[])
    // user info
    const userInfo={
        user,
        loading,
        userLogin,
        userLogout,
        userProfileUpdate, 
        createUserUsingEmail,
        createUserUsingGoogle,
        createUserUsingGithub
    }

  return (
    <AuthContetxt.Provider value={userInfo}>
        {children}
    </AuthContetxt.Provider>
  )
}

export default AuthProvider