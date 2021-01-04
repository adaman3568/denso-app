import React, {FC} from 'react';
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {CarInfo, CustomerInfo, EmployeeInfo} from "../../Context/DataTypeList";

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
}));

type ColumnInfo = {
    colID : string,
    DisplayName : string,
}

type OpenModalFuncType = (data : CarInfo | EmployeeInfo | CustomerInfo) => void;

export const createColumnInfo = (colID : string,DisplayName : string) : ColumnInfo => ({colID,DisplayName});

export type EditModalOpenFunctionType = (data : CarInfo | EmployeeInfo | CustomerInfo) => void;
export type DeleteModalOpenFunctionType = (data : CarInfo | EmployeeInfo | CustomerInfo) => void;

type CustomTableProps = {
    ColumnInfoList : ColumnInfo[],
    Data : (CarInfo | EmployeeInfo | CustomerInfo)[],
    OpenModal : EditModalOpenFunctionType,
    DeleteModal : DeleteModalOpenFunctionType
};

const MasterBaseTable : FC<CustomTableProps> = ({ColumnInfoList,Data,OpenModal,DeleteModal}) => {
    const classes = useStyles();
    return (
        <TableContainer className={classes.tableContainer} component={Paper}>
            <Table className={classes.table} size="small">
                <TableHead>
                    <TableRow>
                        {ColumnInfoList.map((col,index) => (<TableCell align={'center'} key={index}>{col.DisplayName}</TableCell>))}
                        <TableCell align={'center'}>管理</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Data.map((d,index) =>
                        (
                            <TableRow>
                                {ColumnInfoList.map((col) => (<TableCell key={index} align={'center'}>{d[col.colID]}</TableCell>))}
                                <TableCell align={'center'}>
                                    <Button className={classes.button} size={'small'} color={"primary"} variant="contained"  onClick={() => DeleteModal(d)}>
                                        削除
                                    </Button>
                                    <Button className={classes.button} size={'small'} color={"primary"} variant="contained"  onClick={() => OpenModal(d)}>
                                        編集
                                    </Button>
                                </TableCell>
                            </TableRow>
                            )
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MasterBaseTable;