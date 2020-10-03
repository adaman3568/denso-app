import React, {FC, useContext, useEffect, useState} from 'react';
import {RouteComponentProps} from "react-router";
import {DataContext} from "../../Context/DataContextProvider";
import {CustomerInfo} from "../../Context/DataTypeList";
import CarItem from "../Car/CarItem";

type pageProps = {} & RouteComponentProps<
    {
        id : string
    }>

const CustomerDetail : FC<pageProps> = ({match}) => {
    const {Customer} = useContext(DataContext);
    const [customer , setCustomer] = useState<CustomerInfo>({} as CustomerInfo);
    // useEffect(() => {
    //     const c = Customer.Data.find(item => item?.id == parseInt(match.params.id));
    //     if (c !== undefined)setCustomer(c);
    // },[Customer.Data]);

    return (
        <div>
            <h2>this is id:{match.params.id}'s customer detail page</h2>
            <p>{customer.uid}</p>
            <p>{customer.Name}</p>
            {/*{customer.Cars?.map((item,index) => <CarItem key={index} Car={item}/>)}*/}
        </div>
    );
};

export default CustomerDetail;