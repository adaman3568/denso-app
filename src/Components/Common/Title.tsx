import React, {FC} from 'react';
import {makeStyles} from "@material-ui/core/styles";

const myStyle = makeStyles((theme) => ({
    title: {
        borderBottom: '1px solid',
        borderColor: theme.palette.primary.main,
        paddingBottom : theme.spacing(1),
        paddingLeft : theme.spacing(2),
        marginBottom : theme.spacing(2)
    }
}))

const Title : FC = ({children}) => {
    const classes = myStyle();
    return (
        <h2 className={classes.title}>{children}</h2>
    );
};

export default Title;