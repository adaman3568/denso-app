import React, {FC, useContext, useEffect, useState} from 'react';
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
import MasterBaseTable,{
    createColumnInfo,
    DeleteModalOpenFunctionType,
    EditModalOpenFunctionType
} from "../Common/MasterBaseTable";



const EmployeeManage : FC = () => {

    const editModal = useEditModal<EmployeeInfo>(EmpEdit);
    const deleteModal = useDeleteModal<EmployeeInfo>(DeleteEmployee);
    const insertModal = useInsertModal(EmpCreate);

    const {Data,isLoading} = useContext(EmpDataContext)

    const [emp,setEmp] = useState<EmployeeInfo[]>([]);
    useEffect(() => {
        setEmp(Data)
    },[Data]);

    if(isLoading)
        return <Loading/>;

    const displayColumn = [
        createColumnInfo('name',"登録名"),
        createColumnInfo('mail',"登録名"),
        createColumnInfo('commentCnt',"登録名"),
    ]

    return (
        <div>
            <Title>This is Emp page.</Title>
            <Button size={'small'} color={"primary"} variant="contained" onClick={insertModal.OpenModal}>従業員登録</Button>
            <MasterBaseTable
                ColumnInfoList={displayColumn}
                Data={emp}
                OpenModal={editModal.OpenModal as EditModalOpenFunctionType}
                DeleteModal={deleteModal.OpenModal as DeleteModalOpenFunctionType}/>
            {editModal.Modal()}
            {deleteModal.Modal()}
            {insertModal.Modal()}
        </div>
    );
};

export default EmployeeManage;