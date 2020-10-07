import React, {createContext, FC, useEffect, useReducer, useState} from 'react';
import firebase from "../Firebase";

export const AuthContext = createContext<IAuthContextState>({} as IAuthContextState)

type SignInFuncType = (mail : string,pass : string) => Promise<boolean>
type SignOutFuncType = () => void;

export interface IAuthContextState {
    currentUser : any,
    isLoading : boolean,
    func : {
        SignIn : SignInFuncType,
        SignOut : SignOutFuncType
    }
}

const AuthContextProvider : FC = ({children}) => {

    const [currentUser,setCurrentUser] = useState<any>(null);
    const [isLoading , setIsLoading] = useState<boolean>(true)
    const SignIn : SignInFuncType = async (mail : string,pass : string) : Promise<boolean> => {
        const auth = await firebase.auth().signInWithEmailAndPassword(mail,pass)
        if(auth.user){ // ログインできたらこっち
            setCurrentUser(auth.user)
            return true
        }else{
            setCurrentUser(null);
            return false;
        };
    };

    const SignOut : SignOutFuncType = async () => {
        await firebase.auth().signOut();
    };

    useEffect(() => {
        const unsub = firebase.auth().onAuthStateChanged(user =>
        {
            setCurrentUser(user)
            setIsLoading(false);
        });
    },[]);

    return (
        <AuthContext.Provider value={
            {currentUser,isLoading,
            func : {SignIn,SignOut}}
        }>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;