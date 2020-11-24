import {CustomerInfo} from "../../Context/DataTypeList";
import React, {FC} from "react";
import {Button, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Cookies from "js-cookie";
import axios from "axios";
import {apiEndPointBase} from "../../Firebase";

type props = {
    cus : CustomerInfo,
    deleteConfirmOpen : () => void
}

const useStyle = makeStyles((theme) => ({
    textCenter : {
        textAlign : 'center'
    }
}));

const DeleteConfirmCustomer : FC<props> = ({cus,deleteConfirmOpen}) => {
    const classes = useStyle();

    const customerDelete = () => {
        const token = Cookies.get("denso-app-jwt-token");
        axios.delete(`${apiEndPointBase}customers/${cus.id}`,{headers :
                {'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }}).then(res => {
                alert("顧客を削除しました。")
                console.log(res)
            }
        ).catch(err => {
            alert("顧客を削除しました。")
            console.log(err)
        });
        deleteConfirmOpen();
    }

    return (
        <div className={classes.textCenter}>
            <div className={classes.textCenter}>
                <Typography display={'inline'} variant={'h3'}>顧客名：{cus.name}</Typography>
            </div>
            <div className={classes.textCenter}>
                <Typography display={'inline'} variant={'h3'}>住所：{cus.address}</Typography>
            </div>
            <div className={classes.textCenter}>
                上記顧客を本当に削除しますか？<br/>
                付随する車輌及びコメントも全て削除されます。
            </div>
            <div className={classes.textCenter}>
                <Button variant={'contained'} color={'primary'} onClick={customerDelete}>削除</Button>
            </div>
        </div>
    )
};

export const DeleteCustomer = (Data : CustomerInfo,deleteOpenEvent : () => void) => {
    return <DeleteConfirmCustomer cus={Data} deleteConfirmOpen={deleteOpenEvent}/>
};
