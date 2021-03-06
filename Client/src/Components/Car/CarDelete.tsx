import {CarInfo, CommentInfo} from "../../Context/DataTypeList";
import React, {FC, useContext, useReducer} from "react";
import {Button, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import {apiEndPointBase} from "../../Firebase";
import Cookies from "js-cookie";
import CenteringGridItem from "../Common/CenteringGridItem";
import {CarDataContext} from "../../Context/CarDataContext";

type props = {
    Car : CarInfo,
    successOpen : () => void
    failedOpen : () => void
}

const useStyle = makeStyles((theme) => ({
    textCenter : {
        textAlign : 'center'
    }
}));

const CarDelete : FC<props> = ({Car,successOpen,failedOpen}) => {
    const classes = useStyle();
    const {Func} = useContext(CarDataContext)

    const deleteCar = () => {
        try {
            Func.DeleteData(Car.id);
            successOpen();
        }catch (e){
            failedOpen();
        }
    }

    return (
        <div className={classes.textCenter}>
            <CenteringGridItem xs={12}>
                <Typography display={'inline'} variant={'h4'}>削除確認</Typography>
            </CenteringGridItem>
            <CenteringGridItem xs={12}>
                <Typography display={'inline'} variant={'body1'}>
                    上記車両を本当に削除しますか？<br/>
                    付随するコメントも全て削除されます。
                </Typography>
            </CenteringGridItem>
            <CenteringGridItem xs={12}>
                <Typography display={'inline'} variant={'body1'}>車両名：{Car.carNo}</Typography>
            </CenteringGridItem>
            <CenteringGridItem xs={12}>
                <Typography display={'inline'} variant={'body1'}>詳細：{Car.detail}</Typography>
            </CenteringGridItem>
            <CenteringGridItem xs={12}>
                <Button variant={'contained'} color={'secondary'} onClick={deleteCar}>削除</Button>
            </CenteringGridItem>
        </div>
    )
};

export const DeleteCar = (Data : CarInfo,deleteOpenEvent : () => void,failedOpenEvent : () => void) => {
    return <CarDelete Car={Data} failedOpen={failedOpenEvent} successOpen={deleteOpenEvent}/>
};
