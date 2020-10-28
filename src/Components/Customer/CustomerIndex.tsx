import React, {FC, useContext, useState} from 'react';
import CustomerItem from "./CustomerItem";
import Title from "../Common/Title";
import {DataContext} from "../../Context/DataContextProvider";
import ModalWindow from "../Common/ModalWindow";
import AddCustomer from "./AddCustomer";
import {Button} from "@material-ui/core";
import {CustomerInfo} from "../../Context/DataTypeList";

const CustomerIndex : FC = () => {

    const [isEdit,setIsEdit] = useState<boolean>(false);
    const [editCus,setEditCus] = useState<CustomerInfo>();
    const [open,setOpen] = useState<boolean>(false);
    const {Customer} = useContext(DataContext);

    const editEvent = (cus : CustomerInfo) => {
        setEditCus(cus);
        setIsEdit(true);
        setOpen(true);
    };

    const handleClose = () => {
        setEditCus({} as CustomerInfo);
        setIsEdit(false);
        setOpen(false)
    };

    const AddCustomerComponent = () => {
        return(
            isEdit ? <AddCustomer editCustomer={editCus}/> : <AddCustomer/>
        )
    };

    return (
        <div>
            <Title>this is CustomerIndex page.</Title>
            <Button size={'small'} color={"primary"} variant="contained" onClick={() => setOpen(true)}>顧客追加</Button>
            {Customer.Data.map((cu,index) => <CustomerItem key={index} Customer={cu} EditEvent={editEvent}/> )}
            <ModalWindow IsOpen={open} handleClose={handleClose} ChildComponent={<AddCustomerComponent/>}/>
        </div>
    );
};

export default CustomerIndex;