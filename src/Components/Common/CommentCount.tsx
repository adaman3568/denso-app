import React, {FC} from 'react';
import CommentIcon from '@material-ui/icons/Comment';
import {makeStyles} from "@material-ui/core/styles";

type props = {
    displayCount : number,
    className? : string
}

const myStyle = makeStyles((theme) => ({
    icon : {
        marginRight : theme.spacing(1)
    },
    iconWrapper : {
        display : 'flex',
        alignItems : 'center'
    }
}));

const CommentCount : FC<props> = ({displayCount,className}) => {

    const classes = myStyle();

    return (
        <div className={classes.iconWrapper + ' ' + className}>
            <CommentIcon className={classes.icon}/>
            {displayCount}件
        </div>
    );
};

export default CommentCount;