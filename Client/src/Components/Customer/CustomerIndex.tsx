import React, {FC, useContext, useEffect, useState} from 'react';
import CustomerItem from "./CustomerItem";
import Title from "../Common/Title";
import {Button} from "@material-ui/core";
import {CommentInfo, CustomerInfo} from "../../Context/DataTypeList";
import useDeleteModal from "../../CustomHooks/useDeleteModal";
import useEditModal from "../../CustomHooks/useEditModal";
import useInsertModal from "../../CustomHooks/useInsertModal";
import {DeleteCustomer} from "./ComfirmDeleteCustomer";
import {EditCustomer, InsertCustomer} from "./CustomerCreateEdit";
import Cookies from "js-cookie";
import axios from "axios";
import {apiEndPointBase} from "../../Firebase";

const CustomerIndex : FC = () => {

    const editModal = useEditModal<CustomerInfo>(EditCustomer);
    const insertModal = useInsertModal(InsertCustomer);
    const deleteModal = useDeleteModal<CustomerInfo>(DeleteCustomer);

    const [customer,setCustomer] = useState<CustomerInfo[]>([]);

    useEffect(() => {
        const token = Cookies.get("denso-app-jwt-token");
        axios.get(`${apiEndPointBase}customers`,{headers :
                {'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }}).then(res => {
                const d = res.data as CustomerInfo[];
                setCustomer(d)
            }
        );
    },[])

    return (
        <div>
            <Title>this is CustomerIndex page.</Title>
            <Button size={'small'} color={"primary"} variant="contained" onClick={insertModal.OpenModal}>顧客追加</Button>
            {customer.map((cu,index) => <CustomerItem key={index} Data={cu} EditModalOpen={editModal.OpenModal} DeleteModalOpen={deleteModal.OpenModal}/> )}

            {editModal.Modal()}
            {insertModal.Modal()}
            {deleteModal.Modal()}
        </div>
    );
};

export default CustomerIndex;