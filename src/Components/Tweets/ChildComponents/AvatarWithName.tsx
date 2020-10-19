import React, {FC} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Avatar, Typography} from "@material-ui/core";

const useClass = makeStyles((theme) => ({
    avatarImg : {
        width: theme.spacing(7),
        height: theme.spacing(7),
        margin: theme.spacing(0,'auto')
    },
    userName : {
        marginTop : theme.spacing(1),
        fontSize : theme.typography.pxToRem(13),
        textAlign: 'center'
    }
}));

type props = {
    name : string
}

const AvatarWithName : FC<props> = ({name}) => {
    const classes = useClass();
    return (
        <div>
            <Avatar className={classes.avatarImg}>{name.slice(0,1)}</Avatar>
            <Typography className={classes.userName}>{name}</Typography>
        </div>
    );
};

export default AvatarWithName;