import React, {FC, useContext, useState} from 'react';
import CustomerItem from "./CustomerItem";
import Title from "../Common/Title";
import {DataContext} from "../../Context/DataContextProvider";
import ModalWindow from "../Common/ModalWindow";
import AddCustomer from "./AddCustomer";
import {Button, Snackbar, Typography} from "@material-ui/core";
import {CustomerInfo} from "../../Context/DataTypeList";
import {Alert} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
    textCenter : {
        textAlign : 'center'
    }
}));

const CustomerIndex : FC = () => {

    const [isEdit,setIsEdit] = useState<boolean>(false);
    const [editCus,setEditCus] = useState<CustomerInfo>();
    const [open,setOpen] = useState<boolean>(false);
    const [successOpen,setSuccessOpen] = useState<boolean>(false);
    const [deleteConfirmOpen,setDeleteConfirmOpen] = useState<boolean>(false);
    const [deleteOpen,setDeleteOpen] = useState<boolean>(false);
    const [deleteCus,setDeleteCus] = useState<CustomerInfo>({} as CustomerInfo);
    const {Customer} = useContext(DataContext);

    const editEvent = (cus : CustomerInfo) => {
        setEditCus(cus);
        setIsEdit(true);
        setOpen(true);
    };

    const deleteEvent = (cus : CustomerInfo) => {
        setDeleteCus(cus);
        setDeleteOpen(true);
    };

    const handleClose = () => {
        setEditCus({} as CustomerInfo);
        setIsEdit(false);
        setOpen(false)
    };

    const deleteHandleClose = () => {
        setDeleteCus({} as CustomerInfo);
        setDeleteOpen(false)
    };

    const deleteNotiShow = () => {
        setDeleteConfirmOpen(true);
        setDeleteOpen(false);
    }

    const successOpenEvent = () => {
        setSuccessOpen(true);
        setOpen(false)
    }

    const AddCustomerComponent = () => {
        return(
            isEdit ? <AddCustomer editCustomer={editCus} successOpenEvent={successOpenEvent}/> : <AddCustomer successOpenEvent={successOpenEvent}/>
        )
    };

    type pr = {
        cus : CustomerInfo
    }

    const DeleteConfirm : FC<pr> = ({cus}) => {
        const classes = useStyle();

        return (
            <div className={classes.textCenter}>
                <div className={classes.textCenter}>
                    <Typography display={'inline'} variant={'h3'}>顧客名：{cus.Name}</Typography>
                </div>
                <div className={classes.textCenter}>
                    <Typography display={'inline'} variant={'h3'}>住所：{cus.Name}</Typography>
                </div>
                <div className={classes.textCenter}>
                    上記顧客を本当に削除しますか？
                </div>
                <div className={classes.textCenter}>
                    <Button variant={'contained'} color={'primary'} onClick={deleteNotiShow}>削除</Button>
                </div>
            </div>
            )
    };

    return (
        <div>
            <Title>this is CustomerIndex page.</Title>
            <Button size={'small'} color={"primary"} variant="contained" onClick={() => setOpen(true)}>顧客追加</Button>
            {Customer.Data.map((cu,index) => <CustomerItem key={index} Customer={cu} EditEvent={editEvent} DeleteEvent={deleteEvent}/> )}
            <ModalWindow IsOpen={open} handleClose={handleClose} ChildComponent={<AddCustomerComponent/>}/>
            <ModalWindow IsOpen={deleteOpen} handleClose={deleteHandleClose} ChildComponent={<DeleteConfirm cus={deleteCus}/>}/>
            <Snackbar open={successOpen} autoHideDuration={6000} onClose={() => setSuccessOpen(false)}>
                <Alert onClose={() => setSuccessOpen(false)} severity="success">
                    データを登録しました。
                </Alert>
            </Snackbar>
            <Snackbar open={deleteConfirmOpen} autoHideDuration={6000} onClose={() => setDeleteConfirmOpen(false)}>
                <Alert onClose={() => setDeleteConfirmOpen(false)} severity="warning">
                    データを削除しました。
                </Alert>
            </Snackbar>
        </div>
    );
};

export default CustomerIndex;