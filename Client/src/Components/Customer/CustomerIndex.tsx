import React, {FC, useContext, useEffect, useState} from 'react';
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
import {makeStyles} from "@material-ui/core/styles";
import CustomTable, {
    createColumnInfo,
    DeleteModalOpenFunctionType,
    EditModalOpenFunctionType
} from "../Common/MasterBaseTable";
import MasterBaseTable from "../Common/MasterBaseTable";

const useStyle = makeStyles((theme) => ({
    button : {
        margin : theme.spacing(1)
    }
}));

const CustomerIndex : FC = () => {

    const editModal = useEditModal<CustomerInfo>(EditCustomer);
    const insertModal = useInsertModal(InsertCustomer);
    const deleteModal = useDeleteModal<CustomerInfo>(DeleteCustomer);
    const {Data,Func,isLoading} = useContext(CustomerDataContext)
    const [customer,setCustomer] = useState<CustomerInfo[]>([]);
    useEffect(() => {
        setCustomer(Data)
    },[Data]);

    if(isLoading)
        return <Loading/>;

    const displayColumn = [
        createColumnInfo('name',"顧客名"),
        createColumnInfo('address',"住所"),
        createColumnInfo('commentCnt',"コメント数"),
        createColumnInfo('detail',"詳細"),
    ];

    return (
        <div>
            <Title>this is CustomerIndex page.</Title>
            <Button size={'small'} color={"primary"} variant="contained" onClick={insertModal.OpenModal}>顧客追加</Button>
            <MasterBaseTable
                ColumnInfoList={displayColumn}
                Data={customer}
                OpenModal={editModal.OpenModal as EditModalOpenFunctionType}
                DeleteModal={deleteModal.OpenModal as DeleteModalOpenFunctionType}/>
            {editModal.Modal()}
            {insertModal.Modal()}
            {deleteModal.Modal()}
        </div>
    );
};

export default CustomerIndex;