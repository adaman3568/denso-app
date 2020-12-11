import React, {createContext, FC, useEffect, useState} from 'react';
import firebase, {apiEndPointBase, firebaseAuthPath, firebaseRefreshAuthPath} from "../Firebase";
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
            refreshToken : string
        }
        if(res.status === 200){
            const d = res.data as getDataType;
            Cookies.set("denso-app-jwt-token",d.idToken);
            Cookies.set("denso-app-refresh-token",d.refreshToken);
            setState({initializing: false,isLogined: true})
        }else{
            setState({initializing: false,isLogined: false})
        }
    };

    const SignOut : SignOutFuncType = async () => {
        await firebase.auth().signOut()
        setState({initializing: false,isLogined : false})
    };

    // CookieにAccessTokenを持ってたら有効なトークンか否かを返す。
    const LoginCheck = () : boolean => {
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
                    return true;
            }).catch(res => {
                    setState({initializing: false,isLogined: false})
                    console.log(res)
                    // サーバー側でエラーが返ってきた場合CookieのrefreshTokenを見に行く。
                    return checkRefreshToken();
            })
        }else{
            // 無ければrefreshTokenを取得する。
            setState({initializing: false,isLogined: false})
            return false
        }
        return false;
    };

    // refreshTokenを用いて新たにトークンが取得できるかチェック。
    // 取得できれば新たにaccess_tokenとid_tokenをCookieに入れてTrueを返す。
    // 取得できないもしくは、そもそもCookieにrefreshTokenがない場合エラーを返す。
    const checkRefreshToken = () : boolean => {
        type resData = {
            "access_token" : string
            "refresh_token" : string
        }
        const refreshToken = Cookies.get('denso-app-refresh-token');
        if(refreshToken){
            const apiPath = firebaseRefreshAuthPath
            axios.post(apiPath,{"grant_type" : "refresh_token",
                "refresh_token":`"${refreshToken}"`},{headers : {'Content-Type' : 'application/json'}})
                .then(res => {
                    const d = res.data as resData
                    Cookies.set("denso-app-jwt-token",d.access_token);
                    Cookies.set("denso-app-refresh-token",d.refresh_token);
                    return true
                }).catch(
                    e => {return false}
            )
        }else{
            return false
        }
        return false
    }

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