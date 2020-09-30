import React, {FC} from 'react';
import {RouteComponentProps} from "react-router";

type pageProps = {} & RouteComponentProps<{id : string}>

const CustomerDetail : FC<pageProps> = ({match}) => {
    return (
        <div>
            <h2>this is id:{match.params.id}'s customer detail page</h2>
        </div>
    );
};

export default CustomerDetail;