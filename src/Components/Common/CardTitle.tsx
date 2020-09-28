import React, {FC} from 'react';
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


const myStyle = makeStyles((theme) => ({
    title : {
        borderBottomColor : theme.palette.primary.main,
        borderBottom : '1px solid',
        paddingBottom : theme.spacing(1),
        paddingLeft : theme.spacing(2),
        paddingRight : theme.spacing(2),
        marginBottom : theme.spacing(2)
    }
}))

const CardTitle : FC = ({children}) => {
    const classes = myStyle();

    return (
        <Typography variant={'h4'} className={classes.title}>
            {children}
        </Typography>
    );
};

export default CardTitle;