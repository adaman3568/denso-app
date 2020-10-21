import React, {FC, useContext} from 'react';
import CustomerItem from "./CustomerItem";
import Title from "../Common/Title";
import {DataContext} from "../../Context/DataContextProvider";

const CustomerIndex : FC = () => {

    const {Customer} = useContext(DataContext);
    return (
        <div>
            <Title>this is CustomerIndex page.</Title>
            // todo 顧客追加ボタンを作成
            {Customer.Data.map((cu,index) => <CustomerItem key={index} Customer={cu}/> )}
        </div>
    );
};

export default CustomerIndex;