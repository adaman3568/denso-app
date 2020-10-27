import React, {FC} from 'react';
import {TextField,Button,Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {CustomerInfo} from "../../Context/DataTypeList";

const useStyle = makeStyles((theme) => ({
    btnCenter : {
        display : 'flex',
        justifyContent : 'center',
        marginTop : theme.spacing(2)
    },
    submitBtn : {
        width : '80%'
    },
    tokuisakiTextField : {
        width : '90%'
    },
    addWindow : {
        width : '500px'
    }
}))

type Props = {
    editCustomer : CustomerInfo
}

const AddCustomer : FC<Props> = ({editCustomer}) => {
    const classes = useStyle();

    return (
        <div>
            <Grid container className={classes.addWindow}>
                <Grid item xs={12} className={classes.btnCenter}>
                    <TextField label={'得意先名'} className={classes.tokuisakiTextField} value={editCustomer.Name}/>
                </Grid>
                <Grid item xs={12} className={classes.btnCenter}>
                    <TextField label={'住所'} className={classes.tokuisakiTextField} value={editCustomer.Address}/>
                </Grid>
                <Grid item xs={12} className={classes.btnCenter}>
                    <Button className={classes.submitBtn} variant={'contained'} color={'primary'}>登録</Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default AddCustomer;