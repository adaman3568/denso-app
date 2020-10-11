import React, {FC} from 'react';
import {Redirect, Route, RouteProps} from "react-router-dom";
interface IProps {
    user : any
}
interface Props extends RouteProps,IProps{}

const PrivateRoute : FC<Props>  = (props : Props) => {

    return (
        (props.user) ? <Route {...props}/> : <Redirect to={'/login'}/>
    );
};

export default PrivateRoute;