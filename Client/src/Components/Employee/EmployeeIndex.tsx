import React, {FC, useContext, useEffect, useState} from 'react';
import EmployeeItem from "./EmpItem";
import Title from "../Common/Title";
import useEditModal from "../../CustomHooks/useEditModal";
import {EmployeeInfo} from "../../Context/DataTypeList";
import useDeleteModal from "../../CustomHooks/useDeleteModal";
import {EmpCreate, EmpEdit} from "./EmpCreateEdit";
import {DeleteEmployee} from "./EmpDelete";
import {Button} from "@material-ui/core";
import useInsertModal from "../../CustomHooks/useInsertModal";
import Loading from "../Common/Loading";
import {EmpDataContext} from "../../Context/EmpDataContext";

const EmployeeIndex : FC = () => {

    const editModal = useEditModal<EmployeeInfo>(EmpEdit);
    const deleteModal = useDeleteModal<EmployeeInfo>(DeleteEmployee);
    const insertModal = useInsertModal(EmpCreate);

    const {Data,isLoading} = useContext(EmpDataContext)

    if(isLoading)
        return <Loading/>

    return (
        <div>
            <Title>This is Emp page.</Title>
            <Button size={'small'} color={"primary"} variant="contained" onClick={insertModal.OpenModal}>従業員登録</Button>
            {Data.map((emp,index) => <EmployeeItem key={index} Data={emp} DeleteModalOpen={deleteModal.OpenModal} EditModalOpen={editModal.OpenModal}/>)}
            {editModal.Modal()}
            {deleteModal.Modal()}
            {insertModal.Modal()}
        </div>
    );
};



export default EmployeeIndex;