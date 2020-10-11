import React, {createContext, FC, useEffect, useState} from 'react';
import firebase from "../Firebase";

type AuthContextState = {
    initializing : boolean,
    user : any
}

export const AuthContext = createContext<AuthContextState>({initializing: true,user : null})

const AuthContextProvider : FC = ({children}) => {

    const [state ,setState] = useState(() => {
        const user = firebase.auth().currentUser
        return {
            initializing: !user,
            user,
        }
    });

    const onChange = (user : any) => {
        setState({initializing: false,user})
    };

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(onChange)
        return () => unsubscribe()
    },[]);

    return (
        <AuthContext.Provider value={{initializing : state.initializing,user : state.user}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;