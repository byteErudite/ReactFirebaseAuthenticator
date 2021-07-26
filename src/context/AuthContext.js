import React,{useContext,useState,useEffect} from 'react'
import auth from '../firebase'
import { Children } from 'react';

const AuthContext = React.createContext();
export function useAuth() {
    return useContext(AuthContext);
}
export  function AuthProvider() {
    const[currentUser,setCurrentUser] = useState();

    function signup(email,password) {
        return auth.createUserWithEmailAndPassword(email,password);
    }

    useEffect(() => {
        const unsubscribed = auth.onAuthStateChanged(user=> {
            setCurrentUser(user);
        })
        return unsubscribed;
    }, [])

    const value = {
        signup, currentUser
    }
    return (
       <AuthContext.Provider value={value}>
           {Children}
       </AuthContext.Provider>
    )
}
