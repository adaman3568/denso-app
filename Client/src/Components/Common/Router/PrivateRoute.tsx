import React, {FC} from 'react';
import {Redirect, Route, RouteProps} from "react-router-dom";
interface IProps {
    isLogin : boolean
}
interface Props extends RouteProps,IProps{}

const PrivateRoute : FC<Props>  = (props : Props) => {

    return (
        (props.isLogin) ? <Route {...props}/> : <Redirect to={'/login'}/>
    );
};

export default PrivateRoute;