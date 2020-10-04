import React, {createContext, FC} from 'react';

export const AuthContext = createContext<IAuthContextState>({} as IAuthContextState)

export interface IAuthContextState {
    isLogin : boolean
}


const AuthContextProvider : FC = ({children}) => {
    return (
        <AuthContext.Provider value={
            {isLogin : false}
        }>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;