import React, {FC, useEffect, useState} from 'react';
import {TextField,Button,Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {CustomerInfo} from "../../Context/DataTypeList";

const useStyle = makeStyles((theme) => ({
    btnCenter : {
        display : 'flex',
        justifyContent : 'center',
        marginTop : theme.spacing(2)
    },
    submitBtn : {
        width : '80%'
    },
    tokuisakiTextField : {
        width : '90%'
    },
    addWindow : {
        width : '500px'
    }
}))

type Props = {
    editCustomer? : CustomerInfo
    successOpenEvent : () => void
}

const AddCustomer : FC<Props> = ({editCustomer,successOpenEvent}) => {
    const classes = useStyle();

    const [cusName,setCusName] = useState<string>('');
    const [address,setAddress] = useState<string>('');
    useEffect(() => {
        if(editCustomer){
            setCusName(editCustomer.Name);
            setAddress(editCustomer.Address);
        }
    },[]);

    return (
        <div>
            <Grid container className={classes.addWindow}>
                <Grid item xs={12} className={classes.btnCenter}>
                    <TextField label={'得意先名'} className={classes.tokuisakiTextField} value={cusName} onChange={(e) => setCusName(e.target.value)}/>
                </Grid>
                <Grid item xs={12} className={classes.btnCenter}>
                    <TextField label={'住所'} className={classes.tokuisakiTextField} value={address} onChange={(e) => setAddress(e.target.value)}/>
                </Grid>
                <Grid item xs={12} className={classes.btnCenter}>
                    <Button className={classes.submitBtn} variant={'contained'} color={'primary'} onClick={() => successOpenEvent()}>登録</Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default AddCustomer;