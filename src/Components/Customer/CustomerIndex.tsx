import React, {FC, useContext} from 'react';
import CustomerItem from "./CustomerItem";
import Title from "../Common/Title";
import {DataContext} from "../../Context/DataContextProvider";

const CustomerIndex : FC = () => {

    const {Customer} = useContext(DataContext);
    return (
        <div>
            <Title>this is CustomerIndex page.</Title>
            {Customer.Data.map((cu,index) => <CustomerItem key={index} Customer={cu}/> )}
        </div>
    );
};

export default CustomerIndex;