import React, {FC, ReactNode, useContext, useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button, Checkbox, Grid, TextField} from "@material-ui/core";
import {CarInfo} from "../../Context/DataTypeList";
import NumberInput from "../Common/Control/NumberInput";
import {CarDataContext} from "../../Context/CarDataContext";
import {useCarUpsert} from "./useCarUpsert";

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
    },
    el : {
        width : '90%',
        display : 'flex'
    }
}));

type props = {
    successOpen : () => void,
    failedOpen : () => void,
    parentCustomerId? : number
    car? : CarInfo
}

type carUpsertProps = {
    carNo : string,
    detail : string,
    releaseYear : number,
    maker : string,
    carType : string
}

const CarCreateEdit : FC<props> = ({successOpen,car,parentCustomerId,failedOpen}) => {
    const classes = useStyle();
    const {props,Data,isEdit} = useCarUpsert(car);
    const {Func} = useContext(CarDataContext);

    const btnEvent = () => {

        if(isEdit){
            PutCar();
        }else{
            PostCar();
        }
    };

    const PostCar = () => {
        try {
            Func.PostData(Data,parentCustomerId ?? 0)
            successOpen()
        }catch (e){
            failedOpen();
        }

    };

    const PutCar = () => {
        try {
            Func.PutData(car?.id ?? 0,Data);
            successOpen();
        }catch (e){
            failedOpen();
        }

    };

    return (
        <Grid container className={classes.carCreateModalWrapper}>
            {!isEdit && <Grid item xs={12} className={classes.addElementWrapper}>
            </Grid>}
            <Grid item xs={12} className={classes.addElementWrapper}>
                <TextField label={'車両番号'} className={classes.addElement} {...props.carName}/>
            </Grid>
            <Grid item xs={12} className={classes.addElementWrapper}>
                <TextField label={'型式'} className={classes.addElement} {...props.carType}/>
            </Grid>
            <Grid item xs={12} className={classes.addElementWrapper}>
                <NumberInput label={'年式'} className={classes.addElement} {...props.carReleaseYear}/>
            </Grid>
            <Grid item xs={12} className={classes.addElementWrapper}>
                <TextField label={'メーカー'} className={classes.addElement} {...props.carMaker}/>
            </Grid>
            <Grid item xs={12} className={classes.addElementWrapper}>
                <TextField multiline rows={3} label={'備考'} className={classes.addElement} {...props.carDetail}/>
            </Grid>
            <Grid item xs={12} className={classes.addElementWrapper}>
                <Button variant={'contained'} color={'primary'} className={classes.addElement} onClick={btnEvent}>登録</Button>
            </Grid>
        </Grid>
    );
};

export const CarCreate = (success : () => void,failed : () => void,parentCustomerId : number | undefined) : ReactNode => {
    return <CarCreateEdit successOpen={success} parentCustomerId={parentCustomerId} failedOpen={failed}/>
};

export const CarEdit = (Data : CarInfo,success : () => void,failed : () => void) : ReactNode => {
    return <CarCreateEdit successOpen={success} car={Data} failedOpen={failed}/>
};

export default CarCreateEdit;