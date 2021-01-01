import React, {FC, ReactNode, useContext, useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button, Checkbox, Grid, TextField} from "@material-ui/core";
import {CarInfo} from "../../Context/DataTypeList";
import NumberInput from "../Common/Control/NumberInput";
import {CarDataContext} from "../../Context/CarDataContext";

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
    const isEdit = car !== undefined;
    const [carData,setCarData] = useState<carUpsertProps>(
                    {carNo : car?.carNo ?? ''
                    ,releaseYear : parseInt(car?.releaseYear.toString() ?? '0')
                    ,carType : car?.carType ?? ''
                    ,maker : car?.maker ?? ''
                    ,detail : car?.detail ?? ''})

    const {Func} = useContext(CarDataContext);

    const btnEvent = () => {

        if(isEdit){
            PutCar();
        }else{
            PostCar();
        }
    };

    const PostCar = () => {
        const newCar : CarInfo = carData as CarInfo;
        try {
            Func.PostData(newCar,parentCustomerId ?? 0)
            successOpen()
        }catch (e){
            failedOpen();
        }

    };

    const PutCar = () => {
        const newCar : CarInfo = {...car,...carData} as CarInfo;
        try {
            Func.PutData(car?.id ?? 0,newCar);
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
                <TextField label={'車両番号'} className={classes.addElement} value={carData.carNo} onChange={e => setCarData({...carData,carNo: e.target.value})}/>
            </Grid>
            <Grid item xs={12} className={classes.addElementWrapper}>
                <TextField label={'型式'} className={classes.addElement} value={carData.carType} onChange={e => setCarData({...carData,carType: e.target.value})}/>
            </Grid>
            <Grid item xs={12} className={classes.addElementWrapper}>
                <NumberInput label={'年式'} className={classes.addElement} value={carData.releaseYear.toString()} handleChange={e => setCarData({...carData,releaseYear: parseInt(e.toString())})}/>
            </Grid>
            <Grid item xs={12} className={classes.addElementWrapper}>
                <TextField label={'メーカー'} className={classes.addElement} value={carData.maker} onChange={e => setCarData({...carData,maker: e.target.value})}/>
            </Grid>
            <Grid item xs={12} className={classes.addElementWrapper}>
                <TextField multiline rows={3} label={'備考'} className={classes.addElement} value={carData.detail} onChange={e => setCarData({...carData, detail: e.target.value})}/>
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