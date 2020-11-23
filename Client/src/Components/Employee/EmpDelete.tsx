import {EmployeeInfo} from "../../Context/DataTypeList";
import React, {FC} from "react";
import {Button, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

type props = {
    emp : EmployeeInfo,
    deleteConfirmOpen : () => void
}

const useStyle = makeStyles((theme) => ({
    textCenter : {
        textAlign : 'center'
    }
}));

const EmpDelete : FC<props> = ({emp,deleteConfirmOpen}) => {
    const classes = useStyle();

    return (
        <div className={classes.textCenter}>
            <div className={classes.textCenter}>
                <Typography display={'inline'} variant={'h3'}>顧客名：{emp.name}</Typography>
            </div>
            <div className={classes.textCenter}>
                <Typography display={'inline'} variant={'h3'}>メールアドレス：{emp.mail}</Typography>
            </div>
            <div className={classes.textCenter}>
                上記従業員を本当に削除しますか？
            </div>
            <div className={classes.textCenter}>
                <Button variant={'contained'} color={'primary'} onClick={deleteConfirmOpen}>削除</Button>
            </div>
        </div>
    )
};

export const DeleteEmployee = (Data : EmployeeInfo,deleteOpenEvent : () => void) => {
    return <EmpDelete emp={Data} deleteConfirmOpen={deleteOpenEvent}/>
};
