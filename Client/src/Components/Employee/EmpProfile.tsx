import React, {FC} from 'react';
import {Grid, Typography} from "@material-ui/core";
import {EmployeeInfo} from "../../Context/DataTypeList";
import {makeStyles} from "@material-ui/core/styles";

type props = {
    data : EmployeeInfo
}

const useStyle = makeStyles((theme) => ({
    center : {
        display : 'flex',
        justifyContent : 'center'
    },
    img : {
        height : '200px',
        width : '200px',
        borderRadius : '50%',
        backgroundColor : 'gray'
    },
    profileItem : {
        margin : theme.spacing(1,0)
    }
}))

const EmpProfile : FC<props> = ({data}) => {

    const classes = useStyle();

    return (
        <Grid container>
            <Grid item xs={12} className={classes.center + ' ' + classes.profileItem}>
                <div className={classes.img}>Img</div>
            </Grid>
            <Grid item xs={12} className={classes.center+ ' ' + classes.profileItem}>
                <Typography variant={'body1'}>登録名：{data.Name}</Typography>
            </Grid>
            <Grid item xs={12} className={classes.center+ ' ' + classes.profileItem}>
                <Typography variant={'body1'}>eMail：{data.eMail}</Typography>
            </Grid>
            <Grid xs={12} className={classes.center+ ' ' + classes.profileItem}>
                <Typography variant={'body2'}>コメント数：19件</Typography>
            </Grid>
            <Grid xs={12} className={classes.center+ ' ' + classes.profileItem}>
                <Typography variant={'body2'}>最終コメント日時：2020年10月16日</Typography>
            </Grid>
        </Grid>
    );
};

export default EmpProfile;