import React, {FC, useContext} from 'react';
import {AuthContext} from "../../../Context/AuthContextProvider";
import {Redirect, Route, RouteProps} from "react-router-dom";

const PrivateRoute : FC<RouteProps>  = (props : RouteProps) => {

    const {isLogin} = useContext(AuthContext);
    return (
        (isLogin) ? <Route {...props}/> : <Redirect to={'/login'}/>
    );
};

export default PrivateRoute;