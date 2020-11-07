import React, {FC} from 'react';
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
    msgWrapper : {
        padding : theme.spacing(2)
    }
}))

type props = {
    body : string
}
const CommentBody : FC<props> = ({body}) => {
    const classes = useStyle();

    return (
        <Typography className={classes.msgWrapper}>
            {body}
        </Typography>
    );
};

export default CommentBody;