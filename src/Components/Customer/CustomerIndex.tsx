import React, {FC, useContext} from 'react';
import CustomerItem from "./CustomerItem";
import Title from "../Common/Title";
import {DataContext} from "../../Context/DataContextProvider";

const CustomerIndex : FC = () => {

    const {Customer} = useContext(DataContext);
    return (
        <div>
            <Title>this is CustomerIndex page.</Title>
            {Customer.Data.map(cu => <CustomerItem key={cu.id} Customer={cu}/> )}
        </div>
    );
};

export default CustomerIndex;