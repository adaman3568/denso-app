import {CustomerInfo} from "../../Context/DataTypeList";
import React, {FC} from "react";
import {Button, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

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
                <Button variant={'contained'} color={'primary'} onClick={deleteConfirmOpen}>削除</Button>
            </div>
        </div>
    )
};

export const DeleteCustomer = (deleteOpenEvent : () => void, Data : CustomerInfo) => {
    return <DeleteConfirmCustomer cus={Data} deleteConfirmOpen={deleteOpenEvent}/>
};
