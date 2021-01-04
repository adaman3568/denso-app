import React, {createContext, FC, useEffect, useState} from 'react';
import firebase, {apiEndPointBase, firebaseAuthPath, firebaseRefreshAuthPath} from "../Firebase";
import axios from 'axios'
import Cookies from "js-cookie";
import {EmpApiDataManager} from "./ApiFunctions/EmpApiDataManager";

type AuthContextState = {
    initializing : boolean,
    isLogined : boolean,
    isAdmin : boolean,
    isError : boolean,
    func : {SignIn : SignInFuncType,SignOut : SignOutFuncType}
}

type SignInFuncType = (mail : string ,pass : string) => Promise<void>
type SignOutFuncType = () => void

export const AuthContext = createContext<AuthContextState>({} as AuthContextState)

const AuthContextProvider : FC = ({children}) => {

    const [state ,setState] = useState(() => {
        return {
            initializing: true,
            isLogined : false,
            isAdmin : false,
            isError : false
        }
    });
    type getDataType = {
        idToken : string
        refreshToken : string
    }

    const SignIn : SignInFuncType = async (mail : string,pass : string) : Promise<void> => {
        axios.post(firebaseAuthPath,
            {"email" : mail,
                "password" : pass,
                "returnSecureToken": "true"},{headers: {
                    'Content-Type': 'application/json'
                }}).then(res => {
            const d = res.data as getDataType;
            Cookies.set("denso-app-jwt-token",d.idToken);
            Cookies.set("denso-app-refresh-token",d.refreshToken);
            new EmpApiDataManager().IsAdminCheck().then(res => {
                setState({initializing: false,isLogined: true ,isAdmin: res,isError: false});
            });
        }).catch(err => {
            console.log(err);
            setState({...state,initializing: false,isLogined: false,isError: true});
        });
    };

    const SignOut : SignOutFuncType = async () => {
        await firebase.auth().signOut();
        setState({...state,initializing: false,isLogined : false,isError: false})
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
                    new EmpApiDataManager().IsAdminCheck().then(res => {
                        setState({initializing: false,isLogined: true ,isAdmin: res,isError: false})
                    });
                    return true;
            }).catch(res => {
                // 一定時間以上でのログアウトの場合、ここに処理を書く。
                    setState({...state,initializing: false,isLogined: false,isError: false});
                    // サーバー側でエラーが返ってきた場合CookieのrefreshTokenを見に行く。
                    return checkRefreshToken();
            })
        }else{
            // 無ければrefreshTokenを取得する。
            setState({...state,initializing: false,isLogined: false});
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
        <AuthContext.Provider value={{initializing : state.initializing, isLogined : state.isLogined,isAdmin : state.isAdmin,isError : state.isError,func : {SignIn,SignOut}}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;