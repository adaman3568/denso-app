import React, {FC, useContext, useEffect, useState} from 'react';
import Title from "../Common/Title";
import useEditModal from "../../CustomHooks/useEditModal";
import {EmployeeInfo} from "../../Context/DataTypeList";
import useDeleteModal from "../../CustomHooks/useDeleteModal";
import {EmpCreate, EmpEdit} from "./EmpCreateEdit";
import {DeleteEmployee} from "./EmpDelete";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import useInsertModal from "../../CustomHooks/useInsertModal";
import Loading from "../Common/Loading";
import {EmpDataContext} from "../../Context/EmpDataContext";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    tableContainer : {
        marginTop : theme.spacing(2),
    },
    table : {
        minWidth : 650,
    },
    button : {
        margin : theme.spacing(1)
    }
}))

const EmployeeManage : FC = () => {

    const classes = useStyles();
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

    return (
        <div>
            <Title>This is Emp page.</Title>
            <Button size={'small'} color={"primary"} variant="contained" onClick={insertModal.OpenModal}>従業員登録</Button>
            <TableContainer className={classes.tableContainer} component={Paper}>
                <Table className={classes.table} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">登録名</TableCell>
                            <TableCell align="center">メールアドレス</TableCell>
                            <TableCell align="center">コメント数</TableCell>
                            <TableCell align="center">ログインユーザー</TableCell>
                            <TableCell align="center">管理</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {emp.map((emp,index) =>
                            <TableRow key={index}>
                                <TableCell align="center">{emp.name}</TableCell>
                                <TableCell align="center">{emp.mail}</TableCell>
                                <TableCell align="center">{emp.commentCnt}</TableCell>
                                <TableCell align="center">********</TableCell>
                                <TableCell align="center">
                                    <Button className={classes.button} size={'small'} color={"primary"} variant="contained"  onClick={() => deleteModal.OpenModal(emp)}>削除</Button>
                                    <Button className={classes.button} size={'small'} color={"primary"} variant="contained"  onClick={() => editModal.OpenModal(emp)} >編集</Button>
                                </TableCell>
                            </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
            {editModal.Modal()}
            {deleteModal.Modal()}
            {insertModal.Modal()}
        </div>
    );
};

export default EmployeeManage;