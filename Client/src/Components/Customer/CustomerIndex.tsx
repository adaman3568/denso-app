import React, {FC, useContext, useEffect, useState} from 'react';
import CustomerItem from "./CustomerItem";
import Title from "../Common/Title";
import {Button} from "@material-ui/core";
import {CustomerInfo} from "../../Context/DataTypeList";
import useDeleteModal from "../../CustomHooks/useDeleteModal";
import useEditModal from "../../CustomHooks/useEditModal";
import useInsertModal from "../../CustomHooks/useInsertModal";
import {DeleteCustomer} from "./ComfirmDeleteCustomer";
import {EditCustomer, InsertCustomer} from "./CustomerCreateEdit";
import Loading from "../Common/Loading";
import {CustomerDataContext} from "../../Context/CustomerDataContext";

const CustomerIndex : FC = () => {

    const editModal = useEditModal<CustomerInfo>(EditCustomer);
    const insertModal = useInsertModal(InsertCustomer);
    const deleteModal = useDeleteModal<CustomerInfo>(DeleteCustomer);
    const {Data,Func,isLoading} = useContext(CustomerDataContext)

    if(isLoading)
        return <Loading/>

    return (
        <div>
            <Title>this is CustomerIndex page.</Title>
            <Button size={'small'} color={"primary"} variant="contained" onClick={insertModal.OpenModal}>顧客追加</Button>
            {Data?.map((cu,index) => <CustomerItem key={index} Data={cu} EditModalOpen={editModal.OpenModal} DeleteModalOpen={deleteModal.OpenModal}/> )}

            {editModal.Modal()}
            {insertModal.Modal()}
            {deleteModal.Modal()}
        </div>
    );
};

export default CustomerIndex;