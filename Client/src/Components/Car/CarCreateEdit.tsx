import React, {FC, ReactNode, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button, Grid, TextField} from "@material-ui/core";
import {CarInfo} from "../../Context/DataTypeList";

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
    car? : CarInfo
}

const CarCreateEdit : FC<props> = ({successOpen,car}) => {
    const classes = useStyle();
    const [carName , setCarName] = useState<string>(car?.carNo ?? '');
    const [carDetail , setCarDetail] = useState<string>(car?.detail ?? '');

    return (
        <Grid container className={classes.carCreateModalWrapper}>
            <Grid item xs={12} className={classes.addElementWrapper}>
                <TextField label={'車両番号'} className={classes.addElement} value={carName} onChange={e => setCarName(e.target.value)}/>
            </Grid>
            <Grid item xs={12} className={classes.addElementWrapper}>
                <TextField multiline rows={3} label={'備考'} className={classes.addElement} value={carDetail} onChange={e => setCarDetail(e.target.value)}/>
            </Grid>
            <Grid item xs={12} className={classes.addElementWrapper}>
                <Button variant={'contained'} color={'primary'} className={classes.addElement} onClick={successOpen}>登録</Button>
            </Grid>
        </Grid>
    );
};

export const CarCreate = (success : () => void) : ReactNode => {
    return <CarCreateEdit successOpen={success}/>
};

export const CarEdit = (Data : CarInfo,success : () => void) : ReactNode => {
    return <CarCreateEdit successOpen={success} car={Data}/>
};

export default CarCreateEdit;