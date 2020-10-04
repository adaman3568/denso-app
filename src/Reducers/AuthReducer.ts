import React from "react";

const ToLogin = 'Login' as const;
const ToLogOut = 'Login' as const;

export const LoginAction = () => ({
    type : ToLogin,
});

export const LogOutAction = () => ({
    type : ToLogOut,
});

export type AuthReducerStateType = {
    isLogin : boolean
}

export type AuthActions = ReturnType<typeof LoginAction> | ReturnType<typeof LogOutAction>

const AuthReducer : React.Reducer<AuthReducerStateType,AuthActions> = (status , action) : AuthReducerStateType => {
    switch (action.type) {
        case ToLogin:
            return {isLogin : true};
        case ToLogOut:
            return {isLogin : false}
        default:
            return status;
    }
};

export default AuthReducer;