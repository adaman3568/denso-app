import React, {FC, useContext, useState} from 'react';
import CustomerItem from "./CustomerItem";
import Title from "../Common/Title";
import {DataContext} from "../../Context/DataContextProvider";
import LinkButton from "../Common/LinkButton";
import {PathList} from "../../Routing/path";
import ModalWindow from "../Common/ModalWindow";
import AddCustomer from "./AddCustomer";
import {Button} from "@material-ui/core";

const CustomerIndex : FC = () => {

    const [open,setOpen] = useState<boolean>(false);

    const {Customer} = useContext(DataContext);
    return (
        <div>
            <Title>this is CustomerIndex page.</Title>
            <Button size={'small'} color={"primary"} variant="contained" onClick={() => setOpen(true)}>顧客追加</Button>
            {Customer.Data.map((cu,index) => <CustomerItem key={index} Customer={cu}/> )}
            <ModalWindow IsOpen={open} handleClose={() => setOpen(false)} ChildComponent={<AddCustomer/>}/>
        </div>
    );
};

export default CustomerIndex;