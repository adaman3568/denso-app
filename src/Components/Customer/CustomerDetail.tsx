import React, {FC, useContext, useEffect, useState} from 'react';
import {RouteComponentProps} from "react-router";
import {DataContext} from "../../Context/DataContextProvider";
import {CustomerInfo} from "../../Context/DataTypeList";

type pageProps = {} & RouteComponentProps<{id : string}>

const CustomerDetail : FC<pageProps> = ({match}) => {
    const {Customer} = useContext(DataContext);
    const [customer , setCustomer] = useState<CustomerInfo>({} as CustomerInfo);
    useEffect(() => {

        const c = Customer.Data.find(item => item.id == parseInt(match.params.id));
        if (c !== undefined)setCustomer(c);
    });

    return (
        <div>
            <h2>this is id:{match.params.id}'s customer detail page</h2>
            <p>{customer.id}</p>
            <p>{customer.LastCommentDate}</p>
            <p>{customer.CommentCount}</p>
            <p>{customer.CarCount}</p>
            <p>{customer.customerName}</p>
            <p>{customer.Address}</p>
        </div>
    );
};

export default CustomerDetail;