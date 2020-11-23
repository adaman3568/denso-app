import {CarInfo} from "../../Context/DataTypeList";
import React, {FC} from "react";
import {Button, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

type props = {
    Car : CarInfo,
    deleteConfirmOpen : () => void
}

const useStyle = makeStyles((theme) => ({
    textCenter : {
        textAlign : 'center'
    }
}));

const CarDelete : FC<props> = ({Car,deleteConfirmOpen}) => {
    const classes = useStyle();

    return (
        <div className={classes.textCenter}>
            <div className={classes.textCenter}>
                <Typography display={'inline'} variant={'h3'}>車両名：{Car.carNo}</Typography>
            </div>
            <div className={classes.textCenter}>
                <Typography display={'inline'} variant={'h3'}>詳細：{Car.detail}</Typography>
            </div>
            <div className={classes.textCenter}>
                上記車両を本当に削除しますか？
            </div>
            <div className={classes.textCenter}>
                <Button variant={'contained'} color={'primary'} onClick={deleteConfirmOpen}>削除</Button>
            </div>
        </div>
    )
};

export const DeleteCar = (Data : CarInfo,deleteOpenEvent : () => void) => {
    return <CarDelete Car={Data} deleteConfirmOpen={deleteOpenEvent}/>
};
