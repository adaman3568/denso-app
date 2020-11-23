import React, {FC, useContext, useEffect, useState} from 'react';
import EmployeeItem from "./EmpItem";
import Title from "../Common/Title";
import useEditModal from "../../CustomHooks/useEditModal";
import {CarInfo, EmployeeInfo} from "../../Context/DataTypeList";
import useDeleteModal from "../../CustomHooks/useDeleteModal";
import {EmpCreate, EmpEdit} from "./EmpCreateEdit";
import {DeleteEmployee} from "./EmpDelete";
import {Button} from "@material-ui/core";
import useInsertModal from "../../CustomHooks/useInsertModal";
import Cookies from "js-cookie";
import axios from "axios";
import {apiEndPointBase} from "../../Firebase";

const EmployeeIndex : FC = () => {

    const editModal = useEditModal<EmployeeInfo>(EmpEdit)
    const deleteModal = useDeleteModal<EmployeeInfo>(DeleteEmployee);
    const insertModal = useInsertModal(EmpCreate)

    const [employees,setEmployees] = useState<EmployeeInfo[]>([])

    useEffect(() => {
        const token = Cookies.get("denso-app-jwt-token");
        axios.get(`${apiEndPointBase}users`,{headers :
                {'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }}).then(res => {
                const d = res.data as EmployeeInfo[];
                setEmployees(d)
            }
        );
    },[]);

    return (
        <div>
            <Title>This is Emp page.</Title>
            <Button size={'small'} color={"primary"} variant="contained" onClick={insertModal.OpenModal}>従業員登録</Button>
            {employees.map((emp,index) => <EmployeeItem key={index} Data={emp} DeleteModalOpen={deleteModal.OpenModal} EditModalOpen={editModal.OpenModal}/>)}
            {editModal.Modal()}
            {deleteModal.Modal()}
            {insertModal.Modal()}
        </div>
    );
};



export default EmployeeIndex;