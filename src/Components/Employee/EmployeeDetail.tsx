import React, {FC} from 'react';
import {RouteComponentProps} from "react-router-dom";

type pageProps = {} & RouteComponentProps<{id : string}>

const EmployeeDetail : FC<pageProps> = ({match}) => {
    return (
        <div>
            <h2>this is id:{match.params.id}'s emp page.</h2>
        </div>
    );
};

export default EmployeeDetail;