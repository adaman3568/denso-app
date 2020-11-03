import React, {FC, useContext} from 'react';
import CustomerItem from "./CustomerItem";
import Title from "../Common/Title";
import {DataContext} from "../../Context/DataContextProvider";
import {Button} from "@material-ui/core";
import {CustomerInfo} from "../../Context/DataTypeList";
import useDeleteModal from "../../CustomHooks/useDeleteModal";
import useEditModal from "../../CustomHooks/useEditModal";
import useInsertModal from "../../CustomHooks/useInsertModal";
import {DeleteCustomer} from "./ComfirmDeleteCustomer";
import {EditCustomer, InsertCustomer} from "./AddCustomer";

const CustomerIndex : FC = () => {

    const editModal = useEditModal<CustomerInfo>(EditCustomer);
    const insertModal = useInsertModal(InsertCustomer);
    const deleteModal = useDeleteModal<CustomerInfo>(DeleteCustomer);

    const {Customer} = useContext(DataContext);

    const editEvent = (cus : CustomerInfo) => {
        editModal.setData(cus);
        editModal.editModalOpen();
    };

    const deleteEvent = (cus : CustomerInfo) => {
        deleteModal.setData(cus);
        deleteModal.modalOpen();
    };

    return (
        <div>
            <Title>this is CustomerIndex page.</Title>
            <Button size={'small'} color={"primary"} variant="contained" onClick={insertModal.insertModalOpen}>顧客追加</Button>
            {Customer.Data.map((cu,index) => <CustomerItem key={index} Customer={cu} EditEvent={editEvent} DeleteEvent={deleteEvent}/> )}

            {editModal.EditModal()}
            {insertModal.InsertModal()}
            {deleteModal.Modal()}
        </div>
    );
};

export default CustomerIndex;