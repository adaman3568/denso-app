import React, {FC, useContext, useEffect, useState} from 'react';
import CustomerItem from "./CustomerItem";
import Title from "../Common/Title";
import {DataContext} from "../../Context/DataContextProvider";
import {CustomerInfo} from "../../Context/DataTypeList";

const CustomerIndex : FC = () => {

    const {CustomerFunc} = useContext(DataContext);
    const [cusList , setCusList] = useState<CustomerInfo[]>([]);
    useEffect(() => {
        setCusList(CustomerFunc.GetAllCustomerData())
    },[])
    return (
        <div>
            <Title>this is CustomerIndex page.</Title>
            {cusList.map(cu => <CustomerItem key={cu.id} Customer={cu}/> )}
        </div>
    );
};

export default CustomerIndex;