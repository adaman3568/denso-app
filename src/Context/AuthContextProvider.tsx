import React, {createContext, FC, useEffect, useState} from 'react';
import firebase from "../Firebase";
import {createDeflateRaw} from "zlib";

type AuthContextState = {
    initializing : boolean,
    user : any,
    func : {SignIn : SignInFuncType,SignOut : SignOutFuncType}
}

type SignInFuncType = (mail : string ,pass : string) => void
type SignOutFuncType = () => void

export const AuthContext = createContext<AuthContextState>({} as AuthContextState)

const AuthContextProvider : FC = ({children}) => {

    const [state ,setState] = useState(() => {
        const user = firebase.auth().currentUser
        return {
            initializing: !user,
            user,
        }
    });

    const SignIn : SignInFuncType = async (mail : string,pass : string) => {
        const res = await firebase.auth().signInWithEmailAndPassword(mail,pass);
        if(res.user){
            setState({initializing: false, user :  res.user})
        }else{
            setState({initializing: false, user :  null})
        }
    };

    const SignOut : SignOutFuncType = async () => {
        await firebase.auth().signOut()
        setState({initializing: false,user : null})
    };

    const onChange = (user : any) => {
        setState({initializing: false,user})
    };

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(onChange)
        return () => unsubscribe()
    },[]);

    return (
        <AuthContext.Provider value={{initializing : state.initializing,user : state.user,func : {SignIn,SignOut}}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;