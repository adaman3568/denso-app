import React, {FC, ReactNode, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button, Grid, TextField} from "@material-ui/core";
import {CarInfo, EmployeeInfo} from "../../Context/DataTypeList";

const useStyle = makeStyles((theme) => ({
    carCreateModalWrapper : {
        width : '500px'
    },
    addElementWrapper : {
        display : 'flex',
        justifyContent : 'center',
        marginBottom : theme.spacing(3)
    },
    addElement : {
        width : '80%'
    }
}));

type props = {
    successOpen : () => void,
    emp? : EmployeeInfo
}

const EmpCreateEdit : FC<props> = ({successOpen,emp}) => {
    const classes = useStyle();
    const [name , setName] = useState<string>(emp?.name ?? '');
    const [address , setAddress] = useState<string>(emp?.mail ?? '');

    return (
        <Grid container className={classes.carCreateModalWrapper}>
            <Grid item xs={12} className={classes.addElementWrapper}>
                <TextField label={'従業員名'} className={classes.addElement} value={name} onChange={e => setName(e.target.value)}/>
            </Grid>
            <Grid item xs={12} className={classes.addElementWrapper}>
                <TextField label={'メールアドレス'} className={classes.addElement} value={address} onChange={e => setAddress(e.target.value)}/>
            </Grid>
            <Grid item xs={12} className={classes.addElementWrapper}>
                <Button variant={'contained'} color={'primary'} className={classes.addElement} onClick={successOpen}>登録</Button>
            </Grid>
        </Grid>
    );
};

export const EmpCreate = (success : () => void) : ReactNode => {
    return <EmpCreateEdit successOpen={success}/>
};

export const EmpEdit = (Data : EmployeeInfo,success : () => void) : ReactNode => {
    return <EmpCreateEdit successOpen={success} emp={Data}/>
};

export default EmpCreateEdit;