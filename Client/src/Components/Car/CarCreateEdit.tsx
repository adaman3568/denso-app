import React, {FC, ReactNode, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button, Checkbox, Grid, TextField} from "@material-ui/core";
import {CarInfo} from "../../Context/DataTypeList";
import Cookies from "js-cookie";
import axios from "axios";
import {apiEndPointBase} from "../../Firebase";
import {Autocomplete} from "@material-ui/lab";

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
    parentCustomerId? : number
    car? : CarInfo
}

const CarCreateEdit : FC<props> = ({successOpen,car,parentCustomerId}) => {
    const classes = useStyle();
    const [carName , setCarName] = useState<string>(car?.carNo ?? '');
    const [carDetail , setCarDetail] = useState<string>(car?.detail ?? '');
    const isEdit = car !== undefined;

    const btnEvent = () => {

        if(isEdit){
            PutCar();
        }else{
            PostCar();
        }

        successOpen();
    };


    const PostCar = () => {
        const token = Cookies.get("denso-app-jwt-token");
        const newCar = {carNo : carName ,detail : carDetail};
        const postPath = `${apiEndPointBase}cars/${parentCustomerId}`
        axios.post(postPath,newCar ,{headers :
                {'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }}).then(res =>
            {
                alert("車両を追加しました。");
                console.log(res)
            }
        ).catch(err =>
        {
            alert("車両を追加できませんでした。");
            console.log(err)
        });
    }

    const PutCar = () => {
        const token = Cookies.get("denso-app-jwt-token");
        const newCar = {...car,carNo : carName ,detail : carDetail};
        axios.put(`${apiEndPointBase}cars/${car?.id}`,newCar,{headers :
                {'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }}).then(res =>
            {
                alert("車両を更新しました。");
                console.log(res)
            }
        ).catch(err =>
        {
            alert("車両を更新できませんでした。");
            console.log(err)
        });
    }

    return (
        <Grid container className={classes.carCreateModalWrapper}>
            {!isEdit && <Grid item xs={12} className={classes.addElementWrapper}>
            </Grid>}

            <Grid item xs={12} className={classes.addElementWrapper}>
                <TextField label={'車両番号'} className={classes.addElement} value={carName} onChange={e => setCarName(e.target.value)}/>
            </Grid>
            <Grid item xs={12} className={classes.addElementWrapper}>
                <TextField multiline rows={3} label={'備考'} className={classes.addElement} value={carDetail} onChange={e => setCarDetail(e.target.value)}/>
            </Grid>
            <Grid item xs={12} className={classes.addElementWrapper}>
                <Button variant={'contained'} color={'primary'} className={classes.addElement} onClick={btnEvent}>登録</Button>
            </Grid>
        </Grid>
    );
};

export const CarCreate = (success : () => void,parentCustomerId : number | undefined) : ReactNode => {
    return <CarCreateEdit successOpen={success} parentCustomerId={parentCustomerId}/>
};

export const CarEdit = (Data : CarInfo,success : () => void) : ReactNode => {
    return <CarCreateEdit successOpen={success} car={Data}/>
};

export default CarCreateEdit;