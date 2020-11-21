import React, {createContext, FC, useEffect, useState} from 'react';
import firebase, {apiEndPointBase, firebaseAuthPath} from "../Firebase";
import axios from 'axios'
import Cookies from "js-cookie";

type AuthContextState = {
    initializing : boolean,
    isLogined : boolean,
    func : {SignIn : SignInFuncType,SignOut : SignOutFuncType}
}

type SignInFuncType = (mail : string ,pass : string) => void
type SignOutFuncType = () => void

export const AuthContext = createContext<AuthContextState>({} as AuthContextState)

const AuthContextProvider : FC = ({children}) => {

    const [state ,setState] = useState(() => {
        return {
            initializing: true,
            isLogined : false,
        }
    });

    const SignIn : SignInFuncType = async (mail : string,pass : string) => {
        const res = await axios.post(firebaseAuthPath,
            {"email" : mail,
                "password" : pass,
                "returnSecureToken": "true"},{headers: {
                    'Content-Type': 'application/json'
                }});

        console.log(res)
        type getDataType = {
            idToken : string
        }
        if(res.status === 200){
            const d = res.data as getDataType;
            Cookies.set("denso-app-jwt-token",d.idToken);
            setState({initializing: false,isLogined: true})
        }else{
            setState({initializing: false,isLogined: false})
        }
    };

    const SignOut : SignOutFuncType = async () => {
        await firebase.auth().signOut()
        setState({initializing: false,isLogined : false})
    };

    const LoginCheck = () => {
        const jwtToken = Cookies.get("denso-app-jwt-token");
        // クッキーの情報にdenso-app-jwt-tokenがあればそのトークンが使えるか否かのチェックをする。
        // 使えればsetStateに値を入れる

        if(jwtToken){
            const apiPath = `${apiEndPointBase}profile/myprofile`;
                axios.get(apiPath,{
                headers :
                    {'Content-Type' : 'application/json',
                        'Authorization' : `Bearer ${jwtToken}`
                    }}).then(res => {
                    setState({initializing: false,isLogined: true})
                    console.log(res)
            }).catch(res => {
                    setState({initializing: false,isLogined: false})
                    console.log(res)
            })
        }else{
            setState({initializing: false,isLogined: false})
        }
    };

    useEffect(() => {
        LoginCheck();
    },[]);

    return (
        <AuthContext.Provider value={{initializing : state.initializing, isLogined : state.isLogined,func : {SignIn,SignOut}}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;