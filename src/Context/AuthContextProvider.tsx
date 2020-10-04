import React, {createContext, FC, useReducer} from 'react';
import AuthReducer, {AuthActions, AuthReducerStateType} from "../Reducers/AuthReducer";
import {type} from "os";

export const AuthContext = createContext<IAuthContextState>({} as IAuthContextState)

export interface IAuthContextState {
    isLogin : boolean
    dispatch : (action : AuthActions) => void
}

const AuthContextProvider : FC = ({children}) => {

    const [state, dispatch] = useReducer<typeof AuthReducer>(AuthReducer,{isLogin : false})

    return (
        <AuthContext.Provider value={
            {isLogin : false,
            dispatch}
        }>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;