import React, {FC} from 'react';
import {CarInfo} from "../../Context/DataTypeList";
import {Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

type Props = {
    data : CarInfo
}

const useStyle = makeStyles((theme) => ({
    profileItem :{
        display : 'flex',
        justifyContent : 'center',
        margin : theme.spacing(1,0)
    }
}));


const CarProfile : FC<Props> = ({data}) => {
    const classes = useStyle();

    return (
        <Grid container>
            <Grid item xs={12} className={classes.profileItem}>
                <Typography variant={'h4'}>車両番号：{data.carNo}</Typography>
            </Grid>
            <Grid item xs={12} className={classes.profileItem}>
                <Typography variant={'body1'}>詳細：{data.detail}</Typography>
            </Grid>
        </Grid>
    );
};

export default CarProfile;