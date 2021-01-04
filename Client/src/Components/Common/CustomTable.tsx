import React, {FC} from 'react';
import {Paper, Table, TableContainer} from "@material-ui/core";
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

const CustomTable : FC = ({children}) => {
    const classes = useStyles();

    return (
        <TableContainer className={classes.tableContainer} component={Paper}>
            <Table className={classes.table} size="small">
                {children}
            </Table>
        </TableContainer>
    );
};

export default CustomTable;