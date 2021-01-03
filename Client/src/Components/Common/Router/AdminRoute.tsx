import React, {FC} from 'react';
import {Route, RouteProps} from "react-router-dom";
interface IProps {
    isAdmin : boolean
}
interface Props extends RouteProps,IProps{}

const AdminRoute : FC<Props>  = (props : Props) => {

    return (
        (props.isAdmin) ? <Route {...props}/> : <h1>現在の権限ではアクセス権が認められていません。</h1>
    );
};

export default AdminRoute;