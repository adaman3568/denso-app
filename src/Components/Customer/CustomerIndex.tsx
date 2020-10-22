import React, {FC, useContext} from 'react';
import CustomerItem from "./CustomerItem";
import Title from "../Common/Title";
import {DataContext} from "../../Context/DataContextProvider";
import LinkButton from "../Common/LinkButton";
import {PathList} from "../../Routing/path";

const CustomerIndex : FC = () => {

    const {Customer} = useContext(DataContext);
    return (
        <div>
            <Title>this is CustomerIndex page.</Title>
            <LinkButton path={PathList.customerCreate} value={'顧客追加'}/>
            {Customer.Data.map((cu,index) => <CustomerItem key={index} Customer={cu}/> )}
        </div>
    );
};

export default CustomerIndex;