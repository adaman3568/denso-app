import React, {FC, useContext, useEffect, useState} from 'react';
import CustomerItem from "./CustomerItem";
import Title from "../Common/Title";
import {Button, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {CustomerInfo} from "../../Context/DataTypeList";
import useDeleteModal from "../../CustomHooks/useDeleteModal";
import useEditModal from "../../CustomHooks/useEditModal";
import useInsertModal from "../../CustomHooks/useInsertModal";
import {DeleteCustomer} from "./ComfirmDeleteCustomer";
import {EditCustomer, InsertCustomer} from "./CustomerCreateEdit";
import Loading from "../Common/Loading";
import {CustomerDataContext} from "../../Context/CustomerDataContext";
import {makeStyles} from "@material-ui/core/styles";
import CustomTable from "../Common/CustomTable";

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

    const classes = useStyle();

    if(isLoading)
        return <Loading/>;

    return (
        <div>
            <Title>this is CustomerIndex page.</Title>
            <Button size={'small'} color={"primary"} variant="contained" onClick={insertModal.OpenModal}>顧客追加</Button>
            <CustomTable>
                <TableHead>
                    <TableRow>
                        <TableCell align={'center'}>顧客名</TableCell>
                        <TableCell align={'center'}>住所</TableCell>
                        <TableCell align={'center'}>コメント数</TableCell>
                        <TableCell align={'center'}>詳細</TableCell>
                        <TableCell align={'center'}>管理</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customer.map((cus,index) => (
                    <TableRow>
                        <TableCell align={'center'}>{cus.name}</TableCell>
                        <TableCell align={'center'}>{cus.address}</TableCell>
                        <TableCell align={'center'}>{cus.commentCnt}</TableCell>
                        <TableCell align={'center'}>{cus.detail}</TableCell>
                        <TableCell align={'center'}>
                            <Button className={classes.button} size={'small'} color={"primary"} variant="contained"  onClick={() => deleteModal.OpenModal(cus)}>
                                削除
                            </Button>
                            <Button className={classes.button} size={'small'} color={"primary"} variant="contained"  onClick={() => deleteModal.OpenModal(cus)}>
                                編集
                            </Button>
                        </TableCell>
                    </TableRow>))}
                </TableBody>
            </CustomTable>
            {editModal.Modal()}
            {insertModal.Modal()}
            {deleteModal.Modal()}
        </div>
    );
};

export default CustomerIndex;