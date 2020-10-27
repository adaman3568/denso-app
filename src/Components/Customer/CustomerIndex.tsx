import React, {FC, useContext, useState} from 'react';
import CustomerItem from "./CustomerItem";
import Title from "../Common/Title";
import {DataContext} from "../../Context/DataContextProvider";
import LinkButton from "../Common/LinkButton";
import {PathList} from "../../Routing/path";
import ModalWindow from "../Common/ModalWindow";
import AddCustomer from "./AddCustomer";
import {Button} from "@material-ui/core";
import {CustomerInfo} from "../../Context/DataTypeList";

const CustomerIndex : FC = () => {

    const editedBtnHandler = (cus : CustomerInfo) => {
        setEditCustomer(cus)
        console.log(['click editBtn',cus])
        // 何故かmodalが開かない
        setOpen(true)
    }

    const handleClose = () => {
        setEditCustomer(initialCus)
        setOpen(false)
    }

    const initialCus : CustomerInfo = {id : '',Name : '',Address : ''}
    const [open,setOpen] = useState<boolean>(false);
    const [editCustomer,setEditCustomer] = useState<CustomerInfo>(initialCus)
    const {Customer} = useContext(DataContext);
    return (
        <div>
            <Title>this is CustomerIndex page.</Title>
            <Button size={'small'} color={"primary"} variant="contained" onClick={() => setOpen(true)}>顧客追加</Button>
            {Customer.Data.map((cu,index) => <CustomerItem key={index} Customer={cu} EditBtnAction={editedBtnHandler}/> )}
            <ModalWindow IsOpen={open} handleClose={handleClose} ChildComponent={<AddCustomer editCustomer={editCustomer}/>}/>
        </div>
    );
};

export default CustomerIndex;