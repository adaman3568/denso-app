import React, {FC, useEffect, useState} from 'react';
import {TextField,Button,Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {CustomerInfo} from "../../Context/DataTypeList";
import Cookies from "js-cookie";
import axios from "axios";
import {apiEndPointBase} from "../../Firebase";

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

const CustomerCreateEdit : FC<Props> = ({editCustomer,successOpenEvent}) => {
    const classes = useStyle();

    const [isEdit , setIsEdit] = useState<boolean>(editCustomer !== undefined)

    const [cusName,setCusName] = useState<string>('');
    const [address,setAddress] = useState<string>('');
    useEffect(() => {
        if(editCustomer){
            setCusName(editCustomer.name);
            setAddress(editCustomer.address);
        }
    },[editCustomer]);

    const btnEvent = () => {

        if(isEdit){
            PutCustomer()
        }else{
            PostCustomer();
        }
        successOpenEvent();
    };


    const PostCustomer = () => {
        const token = Cookies.get("denso-app-jwt-token");
        const newCustomer = {name : cusName,address : address};
        axios.post(`${apiEndPointBase}customers`,newCustomer,{headers :
                {'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }}).then(res =>
            {
                alert("顧客を追加しました。");
                console.log(res)
            }
        ).catch(err =>
        {
            alert("顧客を追加できませんでした。");
            console.log(err)
        });
    }

    const PutCustomer = () => {
        const token = Cookies.get("denso-app-jwt-token");
        const newCustomer = {...editCustomer, name : cusName,address : address};
        axios.put(`${apiEndPointBase}customers/${editCustomer?.id}`,newCustomer,{headers :
                {'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }}).then(res =>
            {
                alert("顧客を追加しました。");
                console.log(res)
            }
        ).catch(err =>
        {
            alert("顧客を追加できませんでした。");
            console.log(err)
        });
    }

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
                    <Button className={classes.submitBtn} variant={'contained'} color={'primary'} onClick={() => btnEvent()}>登録</Button>
                </Grid>
            </Grid>
        </div>
    );
};

export const InsertCustomer = (successOpenEvent : () => void) => {
    return <CustomerCreateEdit successOpenEvent={successOpenEvent}/>
};

export const EditCustomer = (Data : CustomerInfo ,successOpenEvent : () => void) => {
    return <CustomerCreateEdit editCustomer={Data} successOpenEvent={successOpenEvent}/>
};

export default CustomerCreateEdit