import React, {createContext, FC, useEffect, useReducer} from 'react';
import AuthReducer, {AuthActions, AuthReducerStateType, LoginAction, LogOutAction} from "../Reducers/AuthReducer";
import firebase from "../Firebase";
import {fdatasync} from "fs";

export const AuthContext = createContext<IAuthContextState>({} as IAuthContextState)

type SignInFuncType = (mail : string,pass : string) => Promise<boolean>
type SignOutFuncType = () => void;

export interface IAuthContextState {
    isLogin : boolean,
    func : {
        SignIn : SignInFuncType,
        SignOut : SignOutFuncType
    }
    dispatch : (action : AuthActions) => void
}

const AuthContextProvider : FC = ({children}) => {

    const SignIn : SignInFuncType = async (mail : string,pass : string) : Promise<boolean> => {
        const auth = await firebase.auth().signInWithEmailAndPassword(mail,pass)
        if(auth.user){ // ログインできたらこっち
            console.log(auth.user);
            dispatch(LoginAction());
            return true
        }else{
            dispatch(LogOutAction());
            return false;
        };
    };

    const SignOut : SignOutFuncType = async () => {
        await firebase.auth().signOut();
    };

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                dispatch(LoginAction())
            }
        })
    },[]);

    const [state, dispatch] = useReducer<typeof AuthReducer>(AuthReducer,{isLogin : false})

    return (
        <AuthContext.Provider value={
            {isLogin : state.isLogin,
            func : {SignIn,SignOut},
            dispatch}
        }>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;