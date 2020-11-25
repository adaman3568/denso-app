import {CustomerInfo} from "../../Context/DataTypeList";
import React, {FC} from "react";
import {Button, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Cookies from "js-cookie";
import axios from "axios";
import {apiEndPointBase} from "../../Firebase";
import CenteringGridItem from "../Common/CenteringGridItem";

type props = {
    cus : CustomerInfo,
    successOpen : () => void
    failedOpen : () => void
}

const useStyle = makeStyles((theme) => ({
    textCenter : {
        textAlign : 'center'
    }
}));

const DeleteConfirmCustomer : FC<props> = ({cus,successOpen,failedOpen}) => {
    const classes = useStyle();

    const customerDelete = () => {
        const token = Cookies.get("denso-app-jwt-token");
        axios.delete(`${apiEndPointBase}customers/${cus.id}`,{headers :
                {'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }}).then(res => {
                    successOpen();
                }).catch(err => {
                    failedOpen();
                });
    }

    return (
        <div className={classes.textCenter}>
            <CenteringGridItem xs={12}>
                <Typography display={'inline'} variant={'h4'}>削除確認</Typography>
            </CenteringGridItem>
            <CenteringGridItem xs={12}>
                <Typography display={'inline'} variant={'body1'}>
                    上記顧客を本当に削除しますか？<br/>
                    付随する車輌及びコメントも全て削除されます。
                </Typography>
            </CenteringGridItem>
            <CenteringGridItem xs={12}>
                <Typography display={'inline'} variant={'body1'}>顧客名：{cus.name}</Typography>
            </CenteringGridItem>
            <CenteringGridItem xs={12}>
                <Typography display={'inline'} variant={'body1'}>住所：{cus.address}</Typography>
            </CenteringGridItem>
            <CenteringGridItem xs={12}>
                <Button variant={'contained'} color={'secondary'} onClick={customerDelete}>削除</Button>
            </CenteringGridItem>
        </div>
    )
};

export const DeleteCustomer = (Data : CustomerInfo,deleteOpenEvent : () => void,failedOpenEvent : () => void) => {
    return <DeleteConfirmCustomer cus={Data} successOpen={deleteOpenEvent} failedOpen={failedOpenEvent}/>
};
